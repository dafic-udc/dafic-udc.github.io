#!/usr/bin/env python3
"""
Move completed activities from next-activities.json to previous-activities.json.

An activity is moved when today (Madrid time) >= end_date + GRACE_DAYS.
With GRACE_DAYS = 2: if it ends on the 10th, it is moved on the 12th (allowing for a full day's margin).

-The script allows sending a date in YYYY-MM-DD format

Since both JSON files use different formats, the new activities must be formatted to integrate them into Previous.
"""
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
DATE_RE = re.compile(r"(\d{2})/(\d{2})/(\d{4})")
INSERT_AT_START = True  # True: moved activities go to the start of previous; False: to the end
INDEX_NAME=0 #(next activities) array index of the entry where the activity name is stored
# the description index is not used because previous has no descriptions
INDEX_DATE=2 #(next activities) array index of the entry where the activity date is stored (if it fails, the correct one is searched for; it is an optimization)
INDEX_IMAGE=3 #(next activities) array index of the entry where the activity image is stored
INDEX_LINK=4 #(next activities) array index of the entry where the activity link is stored (optional, it may not exist)

def has_date(activity, index):
    """True if the field at that position exists, is text and contains a dd/mm/yyyy date."""
    if index >= len(activity):
        return False
    field = activity[index]
    if not isinstance(field, str):
        return False
    return DATE_RE.search(field) is not None


def find_date_index(activity):
    """Position of the field that holds this activity's date.
    Tries INDEX_DATE first and, if there is no date there, checks the remaining
    fields in order. Returns None if none of them has one.
    It works per activity: INDEX_DATE is never modified, so each one is checked on its own."""
    if has_date(activity, INDEX_DATE):
        return INDEX_DATE

    for i in range(len(activity)):
        if i != INDEX_DATE and has_date(activity, i):
            return i
    return None


def end_date(activity):
    """Last dd/mm/yyyy date of the date field. Supports ranges. None if there is none."""
    date_index = find_date_index(activity)
    if date_index is None:
        return None

    found = DATE_RE.findall(activity[date_index])

    latest = None
    for day, month, year in found:
        current = date(int(year), int(month), int(day))
        if latest is None or current > latest:
            latest = current
    return latest


def to_previous(activity):
    """[name, desc, date, image, link?] -> {name, date, image, link}"""
    # If it is a range only the last day is stored; otherwise, the date without the time.
    last_day = end_date(activity)

    if len(activity) > INDEX_LINK:
        link = activity[INDEX_LINK]
    else:
        link = ""

    return {
        "name": activity[INDEX_NAME],
        "date": last_day.strftime("%d/%m/%Y"),
        "image": activity[INDEX_IMAGE],
        "link": link,
    }


def add_to_previous(previous, moved):
    """Converts the activities in moved to the previous format and adds them, without
    reordering the rest, to the start or the end according to INSERT_AT_START.

    previous goes from newest to oldest. next is the opposite (the one that happens
    first comes first), so moved arrives from oldest to newest and has to be reversed."""
    if INSERT_AT_START:
        # Each insert(0) puts the activity in front of the previous one: the newest ends up first
        for act in moved:
            previous.insert(0, to_previous(act))
    else:
        # append puts each one after the previous one: iterate in reverse so the newest goes first
        for act in reversed(moved):
            previous.append(to_previous(act))


def dump(path, data):
    text = json.dumps(data, indent=4, ensure_ascii=False)
    path.write_text(text + "\n", encoding="utf-8")
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
    except json.JSONDecodeError as error:
        sys.exit(f"JSON inválido en {path} (línea {error.lineno}, columna {error.colno}): {error.msg}")

    if not isinstance(data, list):
        sys.exit(f"{path} debe contener una lista de actividades.")
    return data


def main():
    today = parse_today(sys.argv)#sys.argv holds the arguments the script was run with
    limit = today - timedelta(days=GRACE_DAYS)  # finished: end date <= today - grace days

    next_acts = load_json(NEXT)
    previous_acts = load_json(PREVIOUS) 

    # split the activities into the ones to keep and the ones to move
    keep = []
    moved = []
    for act in next_acts:
        end = end_date(act)
        if end is not None and end <= limit:
            moved.append(act)
        else:
            keep.append(act)

    if not moved:
        print(f"[{today}] Ninguna actividad terminada, nada que reorganizar.")
        return
    
    # print which activities are being moved
    for act in moved:
        date_text = act[find_date_index(act)]
        print(f"[{today}] Movida: {act[INDEX_NAME]} ({date_text})")

    # move the finished activities to previous
    add_to_previous(previous_acts, moved)

    dump(NEXT, keep)
    dump(PREVIOUS, previous_acts)


# safe launcher: main() only runs when the file is executed directly, not when imported
if __name__ == "__main__":
    main()