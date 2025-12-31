document.addEventListener('DOMContentLoaded', () => {
    const lazyVideos = document.querySelectorAll('.youtube-lazy-load');

    lazyVideos.forEach(videoWrapper => {
        const embedId = videoWrapper.dataset.embed;
        
        // Crear la función para cargar el iframe
        const loadIframe = () => {
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', `https://www.youtube.com/embed/${embedId}?autoplay=1`);
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', 'true');
            iframe.setAttribute('title', 'Video de Presentación del Colegio San Isidro');
            
            // Reemplazar el botón/fondo con el iframe
            videoWrapper.innerHTML = '';
            videoWrapper.appendChild(iframe);
            videoWrapper.classList.add('loaded');
        };

        // Escuchar el click en el wrapper o en el botón de play
        videoWrapper.addEventListener('click', loadIframe, { once: true });
    });
});