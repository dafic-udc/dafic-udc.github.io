document.addEventListener("DOMContentLoaded", () => {
    // Header stuff
    const header = document.querySelector("header");
    if (header) {

        //Spider
        const spider = document.createElement("img");
        spider.src = "/assets/img/events/halloween/white-spider.png";
        spider.alt = "";
        spider.id = "event-halloween-header-spider";
        header.appendChild(spider);

        // Spider speech bubble
        const bubble = document.createElement("div");
        bubble.id = "event-halloween-spider-bubble";
        bubble.textContent = "Bu!";
        header.appendChild(bubble);

        let timer;
        spider.addEventListener("click", () => {
            const h = header.getBoundingClientRect();
            const a = spider.getBoundingClientRect();
            bubble.style.left = `${a.left - h.left - bubble.offsetWidth - 10}px`;
            bubble.style.top = `${a.top - h.top + a.height / 2 - bubble.offsetHeight / 2}px`;
            bubble.classList.toggle("show");
            clearTimeout(timer);
            timer = setTimeout(() => bubble.classList.remove("show"), 1500);
        });
    }

    // Main stuff
    const main = document.querySelector("main");
    if (main) {

        // Background mosaic
        main.style.backgroundImage = 'url("/assets/img/events/halloween/mosaic-halloween.png")';
        main.style.backgroundRepeat = "repeat";
        main.style.backgroundSize = "200px 150px";
        document.querySelectorAll('main section').forEach(section => {
            const color = getComputedStyle(section).backgroundColor;
            const match = color.match(/[\d.]+/g);
            if (match && match.length >= 3) {
                const [r, g, b] = match;
                const alpha = 0.6;
                section.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            }
        });

        const firstSection = document.querySelector("main section");
        if (firstSection) {
            firstSection.style.backgroundImage =
                'url("/assets/img/events/halloween/spiderwebs.png")';

            firstSection.style.backgroundRepeat = "repeat-x";
            firstSection.style.backgroundPosition = "top left";
            firstSection.style.backgroundSize = "auto 150px";
        }
    }
});

