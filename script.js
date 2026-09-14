// 1. Extract Guest Name from URL parameter (?guest=Name)
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('guest');
    if (guestName) {
        const decodedName = decodeURIComponent(guestName);
        document.getElementById('guest-name').innerText = "Dear " + decodedName + " ❤️";
    }
    
    // Initialize background music
    initializeMusic();
};

// 2. Initialize Background Music
let audioElement = null;

function initializeMusic() {
    // Create audio element
    audioElement = new Audio('wedding-music.mp3');
    audioElement.loop = true;
    audioElement.volume = 0.3; // 30% volume
    
    // Try to autoplay
    const playPromise = audioElement.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // Autoplay was prevented, will play on user interaction
            document.addEventListener('click', playAudioOnce);
            document.addEventListener('touchstart', playAudioOnce);
        });
    }
}

function playAudioOnce() {
    if (audioElement && audioElement.paused) {
        audioElement.play().catch(e => console.log('Audio play failed:', e));
    }
    // Remove listeners after first interaction
    document.removeEventListener('click', playAudioOnce);
    document.removeEventListener('touchstart', playAudioOnce);
}

// 3. Toggle Music Function
function toggleMusic() {
    if (audioElement) {
        if (audioElement.paused) {
            audioElement.play();
            document.getElementById('musicToggle').classList.add('playing');
        } else {
            audioElement.pause();
            document.getElementById('musicToggle').classList.remove('playing');
        }
    }
}

// 4. Reveal Invitation Button
function revealInvitation() {
    document.getElementById('main-invitation').classList.remove('hidden');
    document.getElementById('main-invitation').scrollIntoView({ behavior: 'smooth' });
    
    // Play music when invitation is revealed
    if (audioElement && audioElement.paused) {
        audioElement.play().catch(e => console.log('Audio play failed:', e));
    }
}

// 5. Open Gallery
function openGallery() {
    window.location.href = 'gallery.html';
}

// 6. Countdown Timer Functionality
const targetDate = new Date("Apr 7, 2027 11:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (difference > 0) {
        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
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

// 7. Generate Personalised Link for a new guest
function generateLink() {
    const name = document.getElementById('nameInput').value;
    if(name) {
        const encodedName = encodeURIComponent(name);
        const baseUrl = window.location.href.split('?')[0];
        const finalUrl = `${baseUrl}?guest=${encodedName}`;
        document.getElementById('generatedUrl').innerHTML = `<strong>Share this link:</strong><br><a href="${finalUrl}" target="_blank">${finalUrl}</a>`;
    } else {
        alert('Please enter a guest name');
    }
}
