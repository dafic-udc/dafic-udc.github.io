// Protect email
const emailUsername = 'contacto';
const emailDomain = 'dafic.org';
const openEmail = () => {
    document.getElementById('email').href = `mailto:${emailUsername}@${emailDomain}`;
}
document.getElementById('email').setAttribute('onclick', 'openEmail();');
