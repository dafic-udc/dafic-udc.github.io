// Protect email

// Retrieve email links with class 'email' and set their href attributes
document.querySelectorAll('a.email').forEach(emailLink => {

    // Join inner spans
    const spans = emailLink.querySelectorAll('span');
    email = '';
    spans.forEach(span => {
        email += span.innerText;
    });

    // Set mailto link
    emailLink.href = `mailto:${email}`;
});