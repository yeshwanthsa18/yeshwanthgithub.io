// Star animation script
function createStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;

    const numberOfStars = 100;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random duration between 3-7 seconds
        const duration = 3 + Math.random() * 4;
        star.style.setProperty('--duration', `${duration}s`);
        
        // Random delay
        star.style.animationDelay = `${Math.random() * duration}s`;
        
        starsContainer.appendChild(star);
    }
}

// Cursor trail effect
function createCursorTrail() {
    const cursorTrail = document.getElementById('cursorTrail');
    const heroSection = document.getElementById('home');
    if (!cursorTrail || !heroSection) return;

    const maxStars = 20;
    const stars = [];
    let mouseX = 0;
    let mouseY = 0;

    // Create initial stars for cursor trail
    for (let i = 0; i < maxStars; i++) {
        const star = document.createElement('div');
        star.className = 'cursor-star';
        star.style.opacity = 0;
        cursorTrail.appendChild(star);
        stars.push({
            element: star,
            x: 0,
            y: 0,
            scale: Math.random() * 0.5 + 0.5
        });
    }

    // Update star positions
    function updateStars() {
        stars.forEach((star, index) => {
            const lag = (index + 1) * 0.1;
            star.x += (mouseX - star.x) * lag;
            star.y += (mouseY - star.y) * lag;
            star.element.style.transform = `translate(${star.x}px, ${star.y}px) scale(${star.scale})`;
            star.element.style.opacity = 1 - (index / maxStars);
        });
        requestAnimationFrame(updateStars);
    }

    // Track mouse movement
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    // Start animation
    updateStars();
}

// Form handling
function setupForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        const button = form.querySelector('.submit-button');
        const buttonText = button.querySelector('.button-text');
        const buttonLoader = button.querySelector('.button-loader');

        // Show loading state
        buttonText.style.display = 'none';
        buttonLoader.style.display = 'block';
        button.disabled = true;
    });
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    createCursorTrail();
    setupForm();
}); 
