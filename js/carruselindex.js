// Carrusel automático
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        const totalSlides = slides.length;
        
        function showSlide(index) {
            // Remover clase active de todos
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Agregar clase active al slide e indicador actual
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }
        
        // Cambiar automáticamente cada 3 segundos
        setInterval(nextSlide, 3000);
        
        // Click en indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });