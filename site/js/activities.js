ACTIVITIES = [
    [
        "Concurso de fotografía",
        "Participa no noso concurso de fotografía e gaña fantásticos premios!",
        "08/09/2025",
        "./assets/img/Logo_DAFIC_redondo.svg",
        "https://dafic.org/concurso-fotografia-2025/"
    ],

    [
        "Batallas matemáticas",
        "Gústache desafiar a túa mente? Participa nas nosas batallas matemáticas e demostra o teu talento!",
        "15/09/2025",
        "./assets/img/Logo_DAFIC_redondo.svg"
    ],
    
    [
        "Torneo DAFIC e-Sports",
        "Participa no torneo de Super Smash Bros Ultimate para Switch e álzate coa victoria!",
        "16/09/2025",
        "./assets/img/Logo_DAFIC_redondo.svg"
    ],

    [
        "Quedada de Streetpass",
        "Desempolva a túa 3DS/2DS para conectar con amigos en Streetpass mentras desfrutas do torneo de SSBU e boa compañía!",
        "16/09/2025",
        "./assets/img/Logo_DAFIC_redondo.svg"
    ],

    [
        "Xornadas de Benvida da UDC",
        "Acércate ao noso stand no estadio de Elviña o día 18 de setembro para coñecer DAFIC e todo o que facemos!",
        "18/09/2025",
        "./assets/img/Logo_DAFIC_redondo.svg"
    ]
]

const showActivities = () => {

    const activities = document.getElementById('activities-list');
    if (!activities) return;

    ACTIVITIES.forEach(activity => {
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
            const activityLink = document.createElement('a');
            activityLink.className = 'activity-link';
            activityLink.href = activity[4];

            activityLink.appendChild(activityIcon);
            activityLink.appendChild(activityName);
            activityLink.appendChild(activityDesc);
            activityLink.appendChild(activityDate);

            activityItem.appendChild(activityLink);
        } else {
            activityItem.appendChild(activityIcon);
            activityItem.appendChild(activityName);
            activityItem.appendChild(activityDesc);
            activityItem.appendChild(activityDate);
        }

        activities.appendChild(activityItem);
    });
};

showActivities();