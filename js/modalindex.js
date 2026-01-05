// modalindex.js - Versión corregida para prevenir CLS

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modalAdmision');
    const closeButton = document.querySelector('.close-button');
    const modalCtaButton = document.getElementById('modalCtaButton');

    // Función para mostrar el modal
    function showModal() {
        modal.classList.add('show');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    }

    // Función para cerrar el modal
    function closeModal() {
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restaurar scroll
        
        // Guardar en localStorage que ya se mostró
        localStorage.setItem('modalShown', 'true');
    }

    // Verificar si el modal ya se mostró antes
    const modalShown = localStorage.getItem('modalShown');
    
    // Mostrar modal solo si no se ha mostrado antes
    // Y después de que la página se haya cargado completamente
    if (!modalShown) {
        // Esperar a que todo esté cargado para prevenir CLS
        window.addEventListener('load', function() {
            // Pequeño delay adicional para asegurar estabilidad
            setTimeout(showModal, 500);
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