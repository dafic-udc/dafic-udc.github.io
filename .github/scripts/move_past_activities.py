#!/usr/bin/env python3
"""
Move completed activities from next-activities.json to previous-activities.json.

An activity is moved when today (Madrid time) >= end_date + GRACE_DAYS.
Dates may be incomplete: XX/mm/yyyy ends on the last day of that month and XX/XX/yyyy on
31 December. dd/mm without a year is completed with the current year (the year of "today").
Any other date without a year, or with a day but no month, is invalid and stays in next.
With GRACE_DAYS = 2: if it ends on the 10th, it is moved on the 12th (allowing for a full day's margin).

-The script allows sending a date in YYYY-MM-DD format

Since both JSON files use different formats, the new activities must be formatted to integrate them into Previous.
"""
import calendar
import json
import re
import sys
from datetime import date, datetime, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo

DATA_DIR = Path("site/actividades/data")
NEXT = DATA_DIR / "next-activities.json"
PREVIOUS = DATA_DIR / "previous-activities.json"
GRACE_DAYS = 2
# day/month/year, where the day and the month may be the UNKNOWN placeholder.
# The year is optional (see parse_dates). The lookarounds stop it from matching part of
# a longer number, e.g. the "10/05" in "10/05/26".
DATE_RE = re.compile(r"(?<![\d/])(\d{2}|XX)/(\d{2}|XX)(?:/(\d{4}))?(?!\d|/\d)", re.IGNORECASE)
UNKNOWN = "XX"  # placeholder for an unknown day or month
INSERT_AT_START = True  # True: moved activities go to the start of previous; False: to the end


class Index:
    """Position of each field in a next activity (a list)."""
    NAME = 0  # where the activity name is stored
    # the description (1) is not used because previous has no descriptions
    DATE = 2  # where the activity date is stored (if it fails, the correct one is searched for; it is an optimization)
    IMAGE = 3  # where the activity image is stored
    LINK = 4  # where the activity link is stored (optional, it may not exist)


class Key:
    """Key of each field in a previous activity (a dict)."""
    NAME = "name"  # where the activity name is stored
    DATE = "date"  # where the activity date is stored
    IMAGE = "image"  # where the activity image is stored
    LINK = "link"  # where the activity link is stored


def period_end(day, month, year):
    """Last day covered by a possibly incomplete date, or None if it is not valid.
        dd/mm/yyyy -> that day
        XX/mm/yyyy -> last day of that month
        XX/XX/yyyy -> 31 December of that year
        dd/XX/yyyy -> invalid (a day without a month makes no sense)
    day and month are text ("05", "XX"); year is a number."""
    try:
        if month == UNKNOWN:
            if day != UNKNOWN:
                return None
            return date(year, 12, 31)

        month_number = int(month)
        if day == UNKNOWN:
            last_day = calendar.monthrange(year, month_number)[1]
            return date(year, month_number, last_day)

        return date(year, month_number, int(day))
    except ValueError:
        return None  # month 13, 31/02, year 0...


def parse_dates(text, current_year):
    """Every valid date in the text, as a list of (end, label) pairs.
    end is the last day it covers (see period_end); label is the date as written
    (XX in upper case, year included), which is what gets stored in previous.

    dd/mm without a year is completed with current_year. Any other date without a year
    (XX/mm, dd/XX...) is ignored, and so is anything that is not a real date."""
    found = []
    for day, month, year_text in DATE_RE.findall(text):
        day = day.upper()
        month = month.upper()

        if year_text == "":
            if day == UNKNOWN or month == UNKNOWN:
                continue  # only a complete day and month can be completed with the year
            year_text = str(current_year)

        end = period_end(day, month, int(year_text))
        if end is not None:
            found.append((end, f"{day}/{month}/{year_text}"))
    return found


def has_date(activity, index, current_year):
    """True if the field at that position exists, is text and contains a valid date."""
    if not isinstance(activity, list):
        return False
    if index >= len(activity):
        return False
    field = activity[index]
    if not isinstance(field, str):
        return False
    return len(parse_dates(field, current_year)) > 0


def find_date_index(activity, current_year):
    """Position of the field that holds this activity's date.
    Tries Index.DATE first and, if there is no date there, checks the remaining
    fields in order. Returns None if none of them has one.
    It works per activity: Index.DATE is never modified, so each one is checked on its own."""
    if not isinstance(activity, list):
        return None

    if has_date(activity, Index.DATE, current_year):
        return Index.DATE

    for i in range(len(activity)):
        if i != Index.DATE and has_date(activity, i, current_year):
            return i
    return None


def last_date(activity, current_year):
    """(end, label) of the latest date in the date field. Supports ranges.
    None if the activity has no valid date."""
    date_index = find_date_index(activity, current_year)
    if date_index is None:
        return None

    latest = None
    for end, label in parse_dates(activity[date_index], current_year):
        if latest is None or end > latest[0]:
            latest = (end, label)
    return latest


def end_date(activity, current_year):
    """Last day the activity covers, or None if it has no valid date."""
    latest = last_date(activity, current_year)
    if latest is None:
        return None
    return latest[0]


def get_text(activity, index):
    """The text at that position, or "" if the field is missing or is not text."""
    if index >= len(activity):
        return ""
    field = activity[index]
    if not isinstance(field, str):
        return ""
    return field


def to_previous(activity, current_year):
    """[name, desc, date, image, link?] -> {Key.NAME, Key.DATE, Key.IMAGE, Key.LINK}
    The date is the only required field: without a valid one it returns None (and prints
    a warning) so the caller keeps the activity. Any other missing field is left empty."""
    latest = last_date(activity, current_year)
    if latest is None:
        print(f"Aviso: actividad sin fecha válida: {activity!r}", file=sys.stderr)
        return None
    _, date_label = latest  # keeps XX if the date was incomplete

    return {
        Key.NAME: get_text(activity, Index.NAME),
        # If it is a range only the last date is stored
        Key.DATE: date_label,
        Key.IMAGE: get_text(activity, Index.IMAGE),
        Key.LINK: get_text(activity, Index.LINK),
    }


def add_to_previous(previous, entries):
    """Adds the entries (already in previous format), without reordering the rest,
    to the start or the end according to INSERT_AT_START.

    previous goes from newest to oldest. next is the opposite (the one that happens
    first comes first), so entries arrive from oldest to newest."""
    if INSERT_AT_START:
        # Each insert(0) puts the entry in front of the previous one: the newest ends up first
        for entry in entries:
            previous.insert(0, entry)
    else:
        # append puts each one after the previous one: iterate in reverse so the newest goes first
        for entry in reversed(entries):
            previous.append(entry)


def serialize(path, data):
    """Converts data to the bytes of a JSON file. Exits with a message if it cannot.
    path is only used for the error message."""
    try:
        text = json.dumps(data, indent=4, ensure_ascii=False)
        return (text + "\n").encode("utf-8")
    except (TypeError, ValueError) as error:  # not serializable, invalid characters (UnicodeEncodeError is a ValueError)
        sys.exit(f"No se pudo convertir a JSON los datos de {path}: {error}")


def write_file(path, content):
    """Writes the bytes to the file. Exits with a message if it cannot."""
    try:
        path.write_bytes(content)
    except OSError as error:  # no permission, disk full, directory missing...
        sys.exit(f"No se pudo escribir {path}: {error}")
    print(f"Actualizado JSON:  ${path}")


def parse_today(argv):
    """Today's date: the YYYY-MM-DD argument if given, otherwise the current date in Madrid."""
    if len(argv) > 2:
        sys.exit(f"Uso: {argv[0]} [YYYY-MM-DD]")
    if len(argv) == 1:
        return datetime.now(ZoneInfo("Europe/Madrid")).date()
    try:
        # strptime requires exactly YYYY-MM-DD, it checks that the argument is a valid date
        return datetime.strptime(argv[1], "%Y-%m-%d").date()
    except ValueError:
        sys.exit(f"Fecha inválida: {argv[1]!r}. Formato esperado: YYYY-MM-DD")


def load_json(path):
    """Reads a JSON file that must contain a list. If it fails, exits with a clear message."""
    try:
        text = path.read_text(encoding="utf-8")
        data = json.loads(text) # the whole file is read into memory
    except FileNotFoundError:
        sys.exit(f"No existe el archivo: {path}")
    except json.JSONDecodeError as error:  # must go before ValueError, which it is a subclass of
        sys.exit(f"JSON inválido en {path} (línea {error.lineno}, columna {error.colno}): {error.msg}")
    except (OSError, ValueError) as error:  # any other failure reading or decoding the file
        sys.exit(f"No se pudo leer {path}: {error}")

    if not isinstance(data, list):
        sys.exit(f"{path} debe contener una lista de actividades.")
    return data


def main():
    today = parse_today(sys.argv)#sys.argv holds the arguments the script was run with
    limit = today - timedelta(days=GRACE_DAYS)  # finished: end date <= today - grace days

    next_acts = load_json(NEXT)
    previous_acts = load_json(PREVIOUS) 

    # split the activities into the ones to keep and the ones to move (already converted).
    # An activity that cannot be read or converted is never dropped: it stays in next.
    keep = []
    moved = []
    for act in next_acts:
        end = end_date(act, today.year)
        if end is None:
            print(f"Aviso: sin fecha válida, se deja en next: {act!r}", file=sys.stderr)
            keep.append(act)
        elif end <= limit:
            entry = to_previous(act, today.year)
            if entry is None:
                keep.append(act)
            else:
                moved.append(entry)
        else:
            keep.append(act)

    if not moved:
        print(f"[{today}] Ninguna actividad terminada, nada que reorganizar.")
        return

    # print which activities are being moved
    for entry in moved:
        print(f"[{today}] Movida: {entry[Key.NAME]} ({entry[Key.DATE]})")

    # move the finished activities to previous
    add_to_previous(previous_acts, moved)

    # Convert BOTH before writing either: opening a file for writing empties it, so a
    # conversion error after writing the first one would lose the moved activities.
    next_content = serialize(NEXT, keep)
    previous_content = serialize(PREVIOUS, previous_acts)

    write_file(NEXT, next_content)
    write_file(PREVIOUS, previous_content)


# safe launcher: main() only runs when the file is executed directly, not when imported
if __name__ == "__main__":
    main()