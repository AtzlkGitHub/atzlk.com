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