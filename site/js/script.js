// Update academic course
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1; // 1 to 12
const courseRange = (currentMonth >= 9) ? ` ${currentYear}-${currentYear+1}`
                                        : ` ${currentYear-1}-${currentYear}`;
document.getElementById('course').innerText = courseRange;

// Protect email
const emailUsername = 'contacto';
const emailDomain = 'dafic.org';
const openEmail = () => {
    document.getElementById('email').href = `mailto:${emailUsername}@${emailDomain}`;
}
document.getElementById('email').setAttribute('onclick', 'openEmail();');
