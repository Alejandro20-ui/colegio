// Este es un ESQUEMA de cómo luciría el archivo app.js
document.addEventListener('DOMContentLoaded', () => {
    const comentarioForm = document.getElementById('comentarioForm');
    const listaComentarios = document.getElementById('listaComentarios');
    const ordenSelect = document.getElementById('orden');
    
    // [OPTIMIZACIÓN] Bandera para asegurar que solo se intente cargar una vez.
    let comentariosCargados = false;
    const comentariosSection = document.getElementById('comentarios');

    // 1. FUNCIÓN PARA CARGAR COMENTARIOS (AHORA SE ACTIVA SOLO BAJO DEMANDA)
    function cargarComentarios(orden) {
        // [OPTIMIZACIÓN] Prevenir la recarga si ya se cargó, a menos que cambiemos el orden.
        if (comentariosCargados && orden === 'nuevo') {
            // Solo salimos si es la primera carga (orden='nuevo') y ya se ejecutó.
            // Si el usuario cambia el orden, debe recargar.
        }

        // Usar la función fetch para llamar al backend
        // NOTA: 'obtener_comentarios.php' debería ser la ruta completa si es necesaria (ej. /php/obtener_comentarios.php)
        fetch(`/php/obtener_comentarios.php?orden=${orden}`)
            .then(response => response.json())
            .then(data => {
                // Limpiar la lista actual
                listaComentarios.innerHTML = '';
                
                // Actualizar el contador
                document.getElementById('totalComentarios').textContent = `${data.length} comentarios`;

                if (data.length > 0) {
                    data.forEach(comentario => {
                        // Crear el HTML para cada comentario (como si fuera un tweet)
                        const comentarioHTML = `
                            <article class="comentario-item">
                                <p class="comentario-mensaje">${comentario.mensaje}</p>
                                <div class="comentario-meta">
                                    <span class="comentario-autor">${comentario.nombre}</span>
                                    <span class="comentario-fecha"> - ${comentario.fecha_formato}</span>
                                </div>
                            </article>
                        `;
                        listaComentarios.innerHTML += comentarioHTML;
                    });
                } else {
                    listaComentarios.innerHTML = '<p class="no-comments">¡Sé el primero en comentar!</p>';
                }
            })
            .catch(error => console.error('Error al cargar comentarios:', error));
        
        // Marcar como cargado después de la primera llamada (que siempre es 'nuevo')
        comentariosCargados = true;
    }

    // 2. MANEJO DEL ENVÍO DEL FORMULARIO
    comentarioForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío tradicional
        const formData = new FormData(this);

        fetch('/php/guardar_comentario.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            if (result.success) {
                comentarioForm.reset(); // Limpiar el formulario
                // NOTA: Los comentarios nuevos no se cargan inmediatamente
                // porque necesitan ser aprobados (aprobado = 0 por defecto).
            }
        })
        .catch(error => console.error('Error al enviar:', error));
    });

    // 3. MANEJO DEL BOTÓN LIMPIAR
    document.getElementById('limpiarBtn').addEventListener('click', function() {
        comentarioForm.reset(); 
    });

    // 4. MANEJO DEL ORDEN
    ordenSelect.addEventListener('change', function() {
        // El cambio de orden siempre dispara una recarga inmediata.
        cargarComentarios(this.value);
    });

    // 5. [OPTIMIZACIÓN CRÍTICA] Cargar comentarios solo cuando la sección es visible
    // Esto reemplaza la línea 'cargarComentarios(ordenSelect.value);'
    
    if (comentariosSection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Si la sección de comentarios está dentro del viewport
                if (entry.isIntersecting) {
                    cargarComentarios(ordenSelect.value);
                    observer.unobserve(comentariosSection); // Deja de observar una vez cargado
                }
            });
        }, { 
            rootMargin: '0px', 
            threshold: 0.1 // Inicia la carga cuando el 10% de la sección es visible
        });

        observer.observe(comentariosSection);
    } else {
        // Fallback para navegadores antiguos sin IntersectionObserver (cargar inmediatamente)
        cargarComentarios(ordenSelect.value);
    }
});