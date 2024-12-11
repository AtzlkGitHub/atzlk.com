// Load reusable components
function loadComponent(selector, file) {
    fetch(file)
        .then((response) => response.text())
        .then((data) => {
            document.querySelector(selector).innerHTML = data;
        })
        .catch((error) => console.error('Error loading component:', error));
}

// Toggle mobile menu
function toggleMenu() {
    const menu = document.querySelector('.menu');
    const toggle = document.querySelector('.menu-toggle');
    menu.classList.toggle('collapsed');
    toggle.classList.toggle('active');
}

// Load components on page load
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('#navbar', 'navbar.html');
    loadComponent('#footer', 'footer.html');
});

/*document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    function updateBackgroundPosition(mouseX = 0.5, mouseY = 0.5, scrollY = 0) {
        // Get the viewport dimensions
        const windowHeight = window.innerHeight;

        // Adjust background position
        const xOffset = (mouseX - 0.5) * 10; // Mouse horizontal movement effect
        const yOffsetMouse = (mouseY - 0.5) * 10; // Mouse vertical movement effect
        const yOffsetScroll = (scrollY / windowHeight) * 50; // Adjust for scrolling

        // Set the final background position
        body.style.backgroundPosition = `${50 - xOffset}% ${50 + yOffsetScroll + yOffsetMouse}%`;
    }

    // Handle mouse movement
    document.addEventListener('mousemove', (event) => {
        const mouseX = event.clientX / window.innerWidth; // Horizontal mouse position (0 to 1)
        const mouseY = event.clientY / window.innerHeight; // Vertical mouse position (0 to 1)
        updateBackgroundPosition(mouseX, mouseY, window.scrollY);
    });

    // Handle scrolling
    document.addEventListener('scroll', () => {
        updateBackgroundPosition(undefined, undefined, window.scrollY);
    });

    // Initialize position on load
    updateBackgroundPosition();
});*/

document.addEventListener('touchmove', function(event) {
    event.preventDefault(); // Comment out or remove this line
}, { passive: false });  

const canvas = document.getElementById("interactive-background");
const ctx = canvas.getContext("2d");

let particles = [];
const mouse = { x: null, y: null };
const maxDistance = 175; // Maximum distance for connecting lines

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize canvas on window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(); // Reinitialize particles on resize
});

// Update mouse position
window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.size = 0; // Size of the particle
        this.baseX = this.x;
        this.baseY = this.y;
        this.speedX = (Math.random() - 0.5);
        this.speedY = (Math.random() - 0.5);
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(100, 100, 100, 0.5)";
        ctx.fill();
    }

    update() {
        // Move particles
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        this.draw();
    }
}

// Initialize particles
function initParticles() {
    particles = [];
    const numParticles = 200; // Number of particles
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

// Animate particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        particle.update();

        // Draw connecting lines
        particles.forEach((otherParticle) => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (
                distance < maxDistance &&
                Math.sqrt(
                    (particle.x - mouse.x) ** 2 + (particle.y - mouse.y) ** 2
                ) < maxDistance
            ) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.strokeStyle = "rgba(100, 100, 100, 0.5)";
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animateParticles);
}

document.addEventListener('DOMContentLoaded', () => {
    const allElements = document.querySelectorAll('*');

    const revealOnScroll = () => {
        allElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const viewportHeight = window.innerHeight;

            // If the element is within 90% of the viewport, apply the animation
            if (elementTop < viewportHeight * 0.9) {
                element.classList.add('_show');
            }
        });
    };

    // Trigger animation on load
    revealOnScroll();

    // Trigger animation on scroll
    window.addEventListener('scroll', revealOnScroll);
});

function playVideo() {
    const video = document.getElementById('introVideo');
    video.play();
    document.querySelector('.play-button').style.display = 'none'; // Hide the button after play
}

// Function to toggle the menu on mobile
function toggleMenu() {
    const menu = document.querySelector('.menu');
    const body = document.querySelector('body'); // Get the body element

    menu.classList.toggle('show'); // Toggles visibility of the menu
    body.classList.toggle('menu-open'); // Lock/unlock scrolling on the body
}

document.body.style.overflow = 'auto';
document.documentElement.style.overflow = 'auto';

initParticles();
animateParticles();

document.addEventListener('DOMContentLoaded', () => {
    let isTouching = false; // Flag for touch detection
    let startY = 0; // Start Y position for touch
    let currentScroll = 0; // Track scroll position

    const handleTouchStart = (event) => {
        if (event.touches.length === 1) {
            isTouching = true;
            startY = event.touches[0].clientY;
            currentScroll = window.scrollY;
        }
    };

    const handleTouchMove = (event) => {
        if (isTouching && event.touches.length === 1) {
            const deltaY = event.touches[0].clientY - startY;
            window.scrollTo({
                top: currentScroll - deltaY,
                behavior: 'smooth', // Enables smooth scrolling
            });
        }
    };

    const handleTouchEnd = () => {
        isTouching = false;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
});