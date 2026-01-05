// modalindex.js - Versión corregida SIN manipular body (previene CLS)

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modalAdmision');
    const closeButton = document.querySelector('.close-button');
    const modalCtaButton = document.getElementById('modalCtaButton');

    // Función para mostrar el modal
    function showModal() {
        modal.classList.add('show');
        modal.style.display = 'flex';
        // NO manipular body.style.overflow - causa CLS
    }

    // Función para cerrar el modal
    function closeModal() {
        modal.classList.remove('show');
        modal.style.display = 'none';
        
        // Guardar en localStorage que ya se mostró
        localStorage.setItem('modalShown', 'true');
    }

    // Verificar si el modal ya se mostró antes
    const modalShown = localStorage.getItem('modalShown');
    
    // Mostrar modal solo si no se ha mostrado antes
    if (!modalShown) {
        // Esperar a que la imagen LCP se cargue primero
        window.addEventListener('load', function() {
            setTimeout(showModal, 1000); // Delay de 1 segundo
        });
    }

    // Cerrar modal al hacer clic en la X
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Cuando se hace clic en el botón del modal
    if (modalCtaButton) {
        modalCtaButton.addEventListener('click', function() {
            closeModal();
        });
    }
});