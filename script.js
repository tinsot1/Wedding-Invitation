// 1. Extract Guest Name from URL parameter (?guest=Name)
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('guest');
    if (guestName) {
        document.getElementById('guest-name').innerText = "Dear " + decodeURIComponent(guestName) + ", You are invited!";
    }
    
    // Initialize music
    playBackgroundMusic();
};

// 2. Background Music Function
function playBackgroundMusic() {
    const audio = new Audio('wedding-music.mp3');
    audio.loop = true;
    audio.volume = 0.3; // 30% volume
    
    // Try to play, user interaction may be required
    audio.play().catch(function(error) {
        // User hasn't interacted with page yet, will play on first interaction
        document.addEventListener('click', function playOnClick() {
            audio.play();
            document.removeEventListener('click', playOnClick);
        });
    });
}

// 3. Reveal Invitation Button
function revealInvitation() {
    document.getElementById('main-invitation').classList.remove('hidden');
    document.getElementById('main-invitation').scrollIntoView({ behavior: 'smooth' });
}

// 4. Countdown Timer Functionality
const targetDate = new Date("Apr 7, 2027 11:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (difference > 0) {
        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;
    } else {
        document.getElementById("days").innerText = "0";
        document.getElementById("hours").innerText = "0";
        document.getElementById("minutes").innerText = "0";
        document.getElementById("seconds").innerText = "0";
    }
}

// Update countdown every second
updateCountdown(); // Call immediately
setInterval(updateCountdown, 1000);

// 5. Generate Personalised Link for a new guest
function generateLink() {
    const name = document.getElementById('nameInput').value;
    if(name) {
        const encodedName = encodeURIComponent(name);
        const baseUrl = window.location.href.split('?')[0];
        const finalUrl = `${baseUrl}?guest=${encodedName}`;
        document.getElementById('generatedUrl').innerHTML = `<a href="${finalUrl}" target="_blank">${finalUrl}</a>`;
    }
}
