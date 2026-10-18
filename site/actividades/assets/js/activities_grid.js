const activityTile = (activity) => {
    
    const tileWrapper = document.createElement("div");
    tileWrapper.className = "activity-tile-wrapper";

    const tile = document.createElement(activity.link != "" ? "a" : "div");

    if (activity.link != "") {
        tile.href = activity.link;
    }
    
    tile.className = "activity-tile";

    const activityName = document.createElement("span");
    activityName.className = "activity-tile-name";
    activityName.innerText = activity.name;
    
    const activityImage = document.createElement("img");
    activityImage.className = "activity-tile-image";
    activityImage.src = activity.image;
    
    const activityDate = document.createElement("span");
    activityDate.className = "activity-tile-date";
    activityDate.innerText = activity.date;

    
    
    tile.append(activityName, activityImage, activityDate);
    tileWrapper.appendChild(tile);
    return tileWrapper;


}

const showActivitiesGrid = async (containerID) => {

    const DATA_URL = "/actividades/data/previous-activities.json";
    let activities;

    try {
        activities = await (await fetch(DATA_URL)).json();
        if (!activities) return null;

    } catch (error) {
        console.error("No se pudo cargar el registro de activiades:", error);
        return null;
    }

    const container = document.getElementById(containerID);
    if (!container) return null;

    activities.forEach(activity => {
        container.appendChild(activityTile(activity));
    });




}