// comentarios.js (VERSION CORREGIDA)
document.addEventListener('DOMContentLoaded', () => {
    const comentarioForm = document.getElementById('comentarioForm');
    const listaComentarios = document.getElementById('listaComentarios');
    const ordenSelect = document.getElementById('orden');
    
    // [OPTIMIZACIÓN] Bandera para asegurar que solo se intente cargar una vez.
    let comentariosCargados = false;
    const comentariosSection = document.getElementById('comentarios');

    // 1. FUNCIÓN PARA CARGAR COMENTARIOS
    function cargarComentarios(orden) {
        // [OPTIMIZACIÓN] Prevenir la recarga si ya se cargó y la orden es "nuevo".
        if (comentariosCargados && orden === 'nuevo') {
            return;
        }

        // Usar la función fetch para llamar al backend
        // NOTA: Usa la ruta COMPLETA desde la raíz si es necesario (ej. /php/obtener_comentarios.php)
        fetch(`obtener_comentarios.php?orden=${orden}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Limpiar la lista actual
                listaComentarios.innerHTML = '';
                
                // Asegurarse de que 'data' sea un array válido
                const comentarios = Array.isArray(data) ? data : [];

                // Actualizar el contador
                document.getElementById('totalComentarios').textContent = `${comentarios.length} comentarios`;

                if (comentarios.length > 0) {
                    comentarios.forEach(comentario => {
                        // Crear el HTML para cada comentario
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
            .catch(error => {
                console.error('Error al cargar comentarios. Revisa el archivo PHP y la ruta:', error);
                listaComentarios.innerHTML = '<p class="error-comments">Error al cargar. Intenta de nuevo más tarde.</p>';
            });
        
        comentariosCargados = true;
    }

    // 2. MANEJO DEL ENVÍO DEL FORMULARIO
    comentarioForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío tradicional
        const formData = new FormData(this);

        fetch('guardar_comentario.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            if (result.success) {
                comentarioForm.reset(); // Limpiar el formulario
                // NOTA: Si el comentario es aprobado inmediatamente (aprobado=1), puedes recargar aquí:
                // cargarComentarios(ordenSelect.value); 
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

    // 5. [CORRECCIÓN CRÍTICA] Ejecutar la carga de comentarios inmediatamente
    // Solo si el script se ha cargado (lo cual garantiza el script inline del HTML).
    cargarComentarios(ordenSelect.value);
});