const ORG_DATA_URL = "/data/organizacion.json";

const fetchJSON = async (dataUrl) => {

    const response = await fetch(dataUrl);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
};

ORG_DATA = fetchJSON(ORG_DATA_URL);

const showMember = (container, memberData) => {

    DEFAULT_ICON = "/assets/img/web_badge.png";

    // Container
    const memberContainer = document.createElement("div");
    memberContainer.className = "member-tag";

    // Position
    const memberPosition = document.createElement("span");
    memberPosition.innerText = memberData["cargo"]
    memberPosition.className = "member-position";
    memberContainer.appendChild(memberPosition);

    // Name
    const memberName = document.createElement("span");
    memberName.innerText = memberData["nome"];
    memberContainer.appendChild(memberName);

    // Icon and link
    const memberLink = document.createElement("a");
    memberLink.href = memberData["link"] == "" ? "javascript:void(0)" : memberData["link"];
    memberLink.classList = "web-badge-link";
    const memberIcon = document.createElement("img");
    memberIcon.src = memberData["icono"] == "" ? DEFAULT_ICON : memberData["icono"];
    memberIcon.className = "web-badge";
    memberIcon.addEventListener("error", function () {
        this.src = DEFAULT_ICON;
    }, { once: true });
    memberLink.appendChild(memberIcon);
    memberContainer.appendChild(memberLink);

    container.appendChild(memberContainer);
}

const showXD = async () => {

    const data = await ORG_DATA;

    // Retrieve <div> container:
    const containerXD = document.getElementById("organizacion-xd");
    if (!containerXD) return;

    // Iterate each member
    Object.keys(data["xd"]).forEach(key => {
        showMember(containerXD, data["xd"][key]);
    });
}

const showComs = async () => {

    const data = await ORG_DATA;

    // Retrieve <div> container:
    const containerXD = document.getElementById("organizacion-comisions");
    if (!containerXD) return;

    // Iterate each member
    Object.keys(data["coms"]).forEach(key => {
        showMember(containerXD, data["coms"][key]);
    });
} 