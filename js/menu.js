// menu.js - Control del menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('nav');
    
    // Toggle del menú al hacer click en hamburguesa
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        
        // Cambiar ícono entre ☰ y ✕
        if (nav.classList.contains('active')) {
            menuToggle.innerHTML = '✕';
        } else {
            menuToggle.innerHTML = '☰';
        }
    });
    
    // Cerrar menú al hacer click en un enlace
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                menuToggle.innerHTML = '☰';
            }
        });
    });
    
    // Manejar dropdowns en móvil
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        dropbtn.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdownContent.style.display = 
                    dropdownContent.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
});