// Este es un ESQUEMA de cómo luciría el archivo app.js
document.addEventListener('DOMContentLoaded', () => {
    const comentarioForm = document.getElementById('comentarioForm');
    const listaComentarios = document.getElementById('listaComentarios');
    const ordenSelect = document.getElementById('orden');

    // 1. FUNCIÓN PARA CARGAR COMENTARIOS
    function cargarComentarios(orden) {
        // Usar la función fetch para llamar al backend
        fetch(`obtener_comentarios.php?orden=${orden}`)
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
        cargarComentarios(this.value);
    });

    // Cargar los comentarios al iniciar la página
    cargarComentarios(ordenSelect.value); 
});