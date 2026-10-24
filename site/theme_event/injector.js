document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");

  const img = document.createElement("img");
  img.src = "/theme_event/borde-halloween-fino.png";
  img.alt = "";
  img.classList.add("header-telarañas");

  header.appendChild(img); // o header.prepend(img) para ponerla al principio
});