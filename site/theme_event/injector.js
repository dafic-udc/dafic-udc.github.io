document.addEventListener("DOMContentLoaded", () => {
  //spiderweb -> header + welcome section
  const $HEADER = document.querySelector("header");

  const img = document.createElement("img");
  img.src = "/theme_event/spiderwebs.png";
  img.alt = "";
  img.classList.add("header-spiderwebs");

  $HEADER.appendChild(img);

  //spider -> header
  const arana = document.createElement("img");
  arana.src = "/theme_event/white-spider.png";
  arana.alt = "";
  arana.classList.add("header-spider");
  $HEADER.appendChild(arana);

  //speech bubble -> header
  const bubble = document.createElement("div");
  bubble.classList.add("spider-bubble");
  bubble.textContent = "BU!";
  $HEADER.appendChild(bubble);

  let timer;
  arana.addEventListener("click", () => {
    const h = $HEADER.getBoundingClientRect();
    const a = arana.getBoundingClientRect();

    bubble.style.left = `${a.left - h.left - bubble.offsetWidth - 10}px`;
    bubble.style.top = `${
      a.top - h.top + a.height / 2 - bubble.offsetHeight / 2
    }px`;

    bubble.classList.remove("show");
    void bubble.offsetWidth;
    bubble.classList.add("show");

    clearTimeout(timer);
    timer = setTimeout(() => bubble.classList.remove("show"), 1500);
  });

  //background mosaic -> sections; excludes the welcome section
  const ID_WELCOME_SECTION = "welcome";
  const $SECTIONS = document.querySelectorAll(
    `main section:not(#${ID_WELCOME_SECTION})`,
  ); //main -> sections; excludes the welcome section

  for (const section of $SECTIONS) {
    const mosaic = document.createElement("div");
    mosaic.classList.add("background-halloween-mosaic");
    section.prepend(mosaic);
  }
});
