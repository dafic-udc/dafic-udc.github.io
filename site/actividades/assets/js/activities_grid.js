const activityTile = (activity) => {
    
    const tileWrapper = document.createElement("div");
    tileWrapper.className = "activity-tile-wrapper";

    const tile = document.createElement("div");
    tile.className = "activity-tile";

    const activityName = document.createElement("span");
    activityName.innerText = activity["name"];
    
    const activityIcon = document.createElement("img");
    activityIcon.src = activity["image"];
    
    const activityDate = document.createElement("span");
    activityDate.innerText = activity["date"];

    tile.append(activityName, activityIcon, activityDate);
    tileWrapper.appendChild(tile);
    return tileWrapper;


}

const showActivitiesGrid = async (containerID) => {

    const DATA_URL = "/actividades/data/activities.json";
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