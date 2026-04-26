const NEXT_ACTIVITIES_DATA_URL = '/actividades/data/next-activities.json';
const PREVIOUS_ACTIVITIES_DATA_URL = '/actividades/data/previous-activities.json';

const showActivities = (activities, activitiesContainerID) => {

    // Retrieve <div> container:
    const activitiesContainer = document.getElementById(activitiesContainerID);
    if (!activitiesContainer) return;

    // Create <ul> element to hold activities:
    const activitiesList = document.createElement('ul');
    activitiesList.className = 'activities-list';

    // Populate the list with activities:
    activities.forEach(activity => {

        const activityItem = document.createElement('li');

        const activityIcon = document.createElement('img');
        activityIcon.className = 'activity-icon';
        activityIcon.src = activity[3];

        const activityName = document.createElement('span');
        activityName.className = 'activity-name';
        activityName.innerText = activity[0];

        const activityDesc = document.createElement('p');
        activityDesc.className = 'activity-description';
        activityDesc.innerText = activity[1];

        const activityDate = document.createElement('span');
        activityDate.className = 'activity-date';
        activityDate.innerText = activity[2];

        if (activity.length > 4) {

            // If there's a link, wrap the icon and name in an <a> tag:
            const activityLink = document.createElement('a');
            activityLink.className = 'activity-link';
            activityLink.href = activity[4];

            activityLink.appendChild(activityIcon);
            activityLink.appendChild(activityName);

            activityItem.appendChild(activityLink);
            activityItem.appendChild(activityDesc);
            activityItem.appendChild(activityDate);
        } else {
            activityItem.appendChild(activityIcon);
            activityItem.appendChild(activityName);
            activityItem.appendChild(activityDesc);
            activityItem.appendChild(activityDate);
        }

        // Append the activity item to the list:
        activitiesList.appendChild(activityItem);
    });

    // Append the populated list to the container:
    activitiesContainer.appendChild(activitiesList);
};

const fetchActivities = async (dataUrl) => {

    const response = await fetch(dataUrl);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
};

const showNextActivities = async (containerID = 'next-activities-list') => {

    const ACTIVITIES = await fetchActivities(NEXT_ACTIVITIES_DATA_URL);

    // Retrieve <div> container:
    const activitiesContainer = document.getElementById(containerID);
    if (!activitiesContainer) return;

    if (ACTIVITIES.length === 0) {

        // If no activities, show a message and a link to propose an activity:
        const noActivitiesMessage = document.createElement('p');
        noActivitiesMessage.className = 'centered';
        noActivitiesMessage.innerText = 'Non hai actividades próximas.';
        noActivitiesMessage.appendChild(document.createElement('br'));
        activitiesContainer.appendChild(noActivitiesMessage);
    } else {
        showActivities(ACTIVITIES, containerID);
    }
};

const showPreviousActivities = async (containerID = 'previous-activities-list') => {
    const ACTIVITIES = await fetchActivities(PREVIOUS_ACTIVITIES_DATA_URL);
    showActivities(ACTIVITIES, containerID);
};
