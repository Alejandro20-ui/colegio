let eventosPage = 0;
const eventosGrid = document.querySelector('.eventos-grid');
const eventosDots = document.querySelectorAll('.eventos-dot');
const prevBtn = document.querySelector('.eventos-nav.prev');
const nextBtn = document.querySelector('.eventos-nav.next');
// Nuevo: Obtenemos todas las tarjetas para calcular el total
const eventosCards = document.querySelectorAll('.evento-card'); 

// Nuevo: Definimos cuántas tarjetas se ven a la vez (por defecto 3)
const cardsPerPage = 3; 
// Calcular el número total de páginas basado en el número de tarjetas
const maxPage = Math.ceil(eventosCards.length / cardsPerPage) - 1;


function updateEventosCarousel() {
    // 1. Calcular el porcentaje de desplazamiento (offset)
    // Cada página es el 100% del contenedor visible.
    let offset = eventosPage * 100;
    
    // 2. Aplicar el desplazamiento al contenedor de la cuadrícula
    eventosGrid.style.transform = `translateX(-${offset}%)`;
    
    // 3. Actualizar los puntos (dots)
    eventosDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === eventosPage);
    });
    
    // 4. Actualizar la visibilidad de las flechas
    prevBtn.style.display = eventosPage === 0 ? 'none' : 'flex';
    nextBtn.style.display = eventosPage === maxPage ? 'none' : 'flex';
}

// NUEVOS MANEJADORES DE EVENTOS
prevBtn.addEventListener('click', () => {
    if (eventosPage > 0) {
        eventosPage--;
        updateEventosCarousel();
    }
});

nextBtn.addEventListener('click', () => {
    if (eventosPage < maxPage) {
        eventosPage++;
        updateEventosCarousel();
    }
});

eventosDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        eventosPage = index;
        updateEventosCarousel();
    });
});

// Inicializar el carrusel al cargar
document.addEventListener('DOMContentLoaded', updateEventosCarousel);