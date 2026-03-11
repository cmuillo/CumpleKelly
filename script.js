// Función para reproducir la música de fondo
function playBirthdayMusic() {
    const audio = document.getElementById('birthdayMusic');
    if (audio) {
        // Intentar reproducir la música
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('No se pudo reproducir la música automáticamente. El navegador requiere interacción del usuario.');
                // Reproducir cuando el usuario haga clic en la página
                document.addEventListener('click', () => {
                    audio.play();
                }, { once: true });
            });
        }
    }
}

// Función para actualizar la cuenta regresiva
function updateCountdown() {
    // Fecha objetivo: 5 de abril de 2026
    const targetDate = new Date('2026-04-05T00:00:00').getTime();
    
    // Actualizar cada segundo
    const countdownInterval = setInterval(() => {
        // Fecha actual
        const now = new Date().getTime();
        
        // Diferencia en milisegundos
        const difference = targetDate - now;
        
        // Calcular días, horas, minutos y segundos
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Actualizar los elementos del DOM
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        
        // Detener cuando se alcance la fecha objetivo
        if (difference <= 0) {
            clearInterval(countdownInterval);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }, 1000);
}

// Efecto Parallax
function updateParallax() {
    const floatingImages = document.querySelectorAll('.floating-image');
    
    window.addEventListener('scroll', () => {
        floatingImages.forEach(image => {
            const parallaxValue = image.getAttribute('data-parallax');
            const scrollPosition = window.scrollY;
            const rect = image.getBoundingClientRect();
            const elementCenter = rect.top + window.scrollY + rect.height / 2;
            
            // Calcular la distancia desde el centro de la ventana
            const distance = scrollPosition - (elementCenter - window.innerHeight / 2);
            
            // Aplicar el parallax
            image.style.transform = `translateY(${distance * parallaxValue}px)`;
        });
    });
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    playBirthdayMusic();
    updateCountdown();
    updateParallax();
});

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
