// Protect email

// Retrieve email links with class 'email' and set their href attributes
document.querySelectorAll('a.email').forEach(emailLink => {
    emailLink.href = `mailto:${atob(emailLink.getAttribute("data-e"))}`;
});