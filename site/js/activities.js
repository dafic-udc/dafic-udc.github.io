ACTIVITIES = [
    [
        "Concurso de fotografía",
        "Participa no noso concurso de fotografía e saca o teu lado máis creativo! Esta actividade conta co apoio das axudas do VEE da UDC.",
        "08/09/2025 - 19/09/2025",
        "./assets/img/activities/actividad_fotofic.png",
        "https://dafic.org/concurso-fotografia-2025/"
    ],

    [
        "Batallas matemáticas",
        "Gústache desafiar a túa mente? Participa nas nosas batallas matemáticas e demostra o teu talento! Esta actividade conta co apoio das axudas do VEE da UDC.",
        "15/09/2025",
        "./assets/img/activities/actividad_batallas_matematicas.png",
        "./assets/img/poster/cartel_batallas_matematicas.png"
    ],

    [
        "Torneo DAFIC e-Sports",
        "Participa no torneo de Super Smash Bros Ultimate para Switch e álzate coa victoria! Esta actividade conta co apoio das axudas do VEE da UDC.",
        "17/09/2025",
        "./assets/img/activities/actividad_e_sports.png",
        "https://forms.office.com/e/3f4kZdvKkt"
    ],

    [
        "Quedada de Streetpass",
        "Desempolva a túa 3DS/2DS para conectar con amigos en Streetpass mentras desfrutas do torneo de SSBU e boa compañía! Esta actividade conta co apoio das axudas do VEE da UDC.",
        "17/09/2025",
        "./assets/img/activities/actividad_streetpass.png",
        "./assets/img/poster/cartel_streetpass.png"
    ],

    [
        "Xornadas de Benvida da UDC",
        "Acércate ao noso stand no estadio de Elviña o día 18 de setembro para coñecer DAFIC e todo o que facemos! Esta actividade conta co apoio das axudas do VEE da UDC.",
        "18/09/2025",
        "./assets/img/activities/actividad_benvida_udc.png"
    ],

    [
        "Charla Egresados GEI",
        "Coñece a experiencia de antigos alumnos do Grao en Enxeñaría Informática da FIC. Esta actividade conta co apoio das axudas do VEE da UDC.",
        "23/09/2025",
        "./assets/img/activities/actividad_egresados_gei.png",
        "./assets/img/poster/cartel_egresados_gei.png"
    ],

    [
        "Charla Egresados GCED",
        "Coñece a experiencia de antigos alumnos do Grao en Ciencia e Enxeñaría de Datos da FIC. Esta actividade conta co apoio das axudas do VEE da UDC.",
        "24/09/2025",
        "./assets/img/activities/actividad_egresados_gced.png",
        "./assets/img/poster/cartel_egresados_gced.png"
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