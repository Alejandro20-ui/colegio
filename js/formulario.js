document.addEventListener('DOMContentLoaded', function() {

    const modal = document.getElementById('modal-contacto');
    const btnAbrir = document.getElementById('abrir-modal');
    const btnCerrar = document.getElementById('cerrar-modal');
    const formulario = document.querySelector('.formulario-contacto');
    
    btnAbrir.addEventListener('click', function(e) {
        e.preventDefault(); 
        modal.style.display = 'block';
    });
    
    btnCerrar.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });


    formulario.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(formulario);

        fetch('php/procesar_formulario.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
             if (!response.ok) {
                 throw new Error('Error en el servidor o archivo no encontrado. Estado: ' + response.status);
             }
             return response.json();
        })
        .then(data => {
            if (data.success) {
                alert(data.message);
                formulario.reset();
                modal.style.display = 'none'; 
            } else {
                alert("Error de validación: " + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al conectar con el servidor: ' + error.message);
        });

    }); 
});