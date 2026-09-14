// 1. Extract Guest Name from URL parameter (?guest=Name)
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('guest');
    if (guestName) {
        document.getElementById('guest-name').innerText = "Dear " + decodeURIComponent(guestName) + ", You are invited!";
    }
};

// 2. Reveal Invitation Button
function revealInvitation() {
    document.getElementById('main-invitation').classList.remove('hidden');
    document.getElementById('main-invitation').scrollIntoView({ behavior: 'smooth' });
}

// 3. Countdown Timer Functionality
const targetDate = new Date("Sep 13, 2026 10:00:00").getTime();
setInterval(function() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    if (difference > 0) {
        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
    }
}, 1000);

// 4. Generate Personalised Link for a new guest
function generateLink() {
    const name = document.getElementById('nameInput').value;
    if(name) {
        const encodedName = encodeURIComponent(name);
        const baseUrl = window.location.href.split('?')[0];
        const finalUrl = `${baseUrl}?guest=${encodedName}`;
        document.getElementById('generatedUrl').innerHTML = `<a href="${finalUrl}" target="_blank">${finalUrl}</a>`;
    }
}

