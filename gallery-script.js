// Gallery Script
let currentImageIndex = 0;
const images = [
    'WhatsApp%20Image%202026-09-13%20at%2010.57.20%20PM.jpeg',
    'WhatsApp%20Image%202026-09-13%20at%2010.57.20%20PM%20(1).jpeg',
    'WhatsApp%20Image%202026-09-13%20at%2010.57.20%20PM%20(2).jpeg',
    'WhatsApp%20Image%202026-09-13%20at%2010.57.21%20PM.jpeg',
    'WhatsApp%20Image%202026-09-13%20at%2010.57.21%20PM%20(1).jpeg',
    'WhatsApp%20Image%202026-09-13%20at%2010.57.21%20PM%20(2).jpeg',
    'WhatsApp%20Image%202026-09-13%20at%2010.57.22%20PM.jpeg',
    'WhatsApp%20Image%202026-09-13%20at%2010.57.22%20PM%20(1).jpeg',
    'WhatsApp%20Image%202026-09-13%20at%2010.57.23%20PM%20(1).jpeg',
    'WhatsApp%20Image%202026-09-13%20at%2010.57.23%20PM.jpeg'
];

// Add click listeners to all photos
document.querySelectorAll('.photo-item').forEach((item, index) => {
    item.addEventListener('click', () => {
        openLightbox(index);
    });
});

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = images[currentImageIndex];
    lightbox.classList.add('active');
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    // Wrap around
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }
    
    document.getElementById('lightbox-img').src = images[currentImageIndex];
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'ArrowLeft') {
        changeImage(-1);
    } else if (e.key === 'ArrowRight') {
        changeImage(1);
    } else if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Music Player
let audio = new Audio('wedding-music.mp3');
audio.loop = true;
audio.volume = 0.3;
let isPlaying = false;

function toggleMusic() {
    const button = document.getElementById('musicToggle');
    if (isPlaying) {
        audio.pause();
        button.classList.remove('playing');
        isPlaying = false;
    } else {
        audio.play().catch(e => console.log('Audio play failed:', e));
        button.classList.add('playing');
        isPlaying = true;
    }
}
