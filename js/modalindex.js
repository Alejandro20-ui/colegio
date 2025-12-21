document.addEventListener('DOMContentLoaded', function() {
            var modal = document.getElementById('modalAdmision');
            var closeBtn = document.querySelector('.close-button');
            var ctaBtn = document.getElementById('modalCtaButton');

            // 1. Mostrar el modal automáticamente
            modal.style.display = 'flex'; 

            // 2. Cerrar al hacer clic en el botón X
            closeBtn.onclick = function() {
                modal.style.display = 'none';
            }

            // 3. Cerrar al hacer clic fuera del modal
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            }
            
            // 4. Cerrar al hacer clic en el botón CTA
            ctaBtn.onclick = function() {
                modal.style.display = 'none';
            }
            
            // Opcional: Si quieres que el botón CTA también lleve a la sección de Admisión
            // ctaBtn.addEventListener('click', function() {
            //     modal.style.display = 'none';
            //     // Desplazamiento suave a la sección de admisión (si es necesario)
            //     document.getElementById('admision').scrollIntoView({ behavior: 'smooth' });
            // });
        });