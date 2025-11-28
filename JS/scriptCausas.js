
    AOS.init({
        duration: 800,
        once: false
    });

    // Inicializar particles.js
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
            modes: {
                grab: { distance: 400, line_linked: { opacity: 1 } },
                bubble: { distance: 400, size: 40, duration: 2, opacity: 8 },
                repulse: { distance: 200, duration: 0.4 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 }
            }
        },
        retina_detect: true
    });

    // Función para actualizar la barra de progreso
    function updateProgress(increment) {
        const progressBar = document.getElementById('healthProgress');
        const progressText = progressBar.querySelector('.progress-text');
        let currentProgress = parseInt(progressText.textContent);
        currentProgress = Math.min(currentProgress + increment, 100);
        progressBar.style.width = currentProgress + '%';
        progressText.textContent = currentProgress + '%';

        if (currentProgress >= 100) {
            showCongratulations();
        }
    }

    // Función para mostrar congratulaciones
    function showCongratulations() {
        const container = document.querySelector('.progress-container');
        const congratsEl = document.createElement('div');
        congratsEl.className = 'congrats animate__animated animate__bounceIn';
        congratsEl.innerHTML = '<i class="fas fa-trophy"></i> ¡Felicidades! Has alcanzado el 100% en tu progreso saludable.';
        container.appendChild(congratsEl);
    }

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Función para detectar cuando un elemento está visible en el viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Función para animar elementos cuando son visibles
    function animateOnScroll() {
        // Seleccionar todos los elementos con la clase fade-in-section
        const sections = document.querySelectorAll('.fade-in-section');
        sections.forEach(section => {
            if (isElementInViewport(section)) {
                section.classList.add('is-visible');
            }
        });

        // Animar listas cuando son visibles
        const lists = document.querySelectorAll('.list-reveal, .guias-list');
        lists.forEach(list => {
            if (isElementInViewport(list)) {
                list.classList.add('is-visible');
            }
        });

        // Animar imágenes con efectos especiales
        const slideImages = document.querySelectorAll('.slide-in-image');
        slideImages.forEach(img => {
            if (isElementInViewport(img)) {
                img.classList.add('is-visible');
            }
        });

        const rotateImages = document.querySelectorAll('.rotate-image');
        rotateImages.forEach(img => {
            if (isElementInViewport(img)) {
                img.classList.add('is-visible');
            }
        });

        const bounceImages = document.querySelectorAll('.bounce-image');
        bounceImages.forEach(img => {
            if (isElementInViewport(img)) {
                img.classList.add('is-visible');
            }
        });
    }

    // Ejecutar animateOnScroll inicialmente
    animateOnScroll();

    // Adjuntar evento de scroll para continuar animando mientras se desplaza
    window.addEventListener('scroll', animateOnScroll);

    // Efecto hover adicional para los elementos de la lista
    const listItems = document.querySelectorAll('.guias-list .list-item');
    listItems.forEach((item, index) => {
        // Aplicar retraso en la transición basado en el índice del elemento
        item.style.transitionDelay = `${index * 0.1}s`;
        
        // Efecto hover
        item.addEventListener('mouseenter', () => {
            item.style.color = '#3498db';
            item.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.color = '#555';
            item.style.transform = 'translateX(0)';
        });
    });

    // Animación de imágenes al hacer hover
    const images = document.querySelectorAll('.content img');
    images.forEach(img => {
        img.addEventListener('mouseenter', () => {
            // Aplicar un efecto aleatorio al hacer hover
            const effects = ['pulse', 'bounce', 'shake'];
            const randomEffect = effects[Math.floor(Math.random() * effects.length)];
            
            img.style.animation = `${randomEffect} 1s`;
        });
        
        img.addEventListener('animationend', () => {
            img.style.animation = '';
        });
    });

    // Efecto de onda para los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Crear efecto de onda al hacer clic
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            
            const diameter = Math.max(this.clientWidth, this.clientHeight);
            ripple.style.width = ripple.style.height = `${diameter}px`;
            
            const rect = this.getBoundingClientRect();
            ripple.style.left = `${e.clientX - rect.left - diameter / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - diameter / 2}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Función para animar el título del encabezado con efecto de escritura
    function typeWriterEffect(element, text, speed) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Aplicar efecto de escritura al título después de un pequeño retraso
    const headerTitle = document.querySelector('header h1');
    const originalTitle = headerTitle.textContent;
    setTimeout(() => {
        typeWriterEffect(headerTitle, originalTitle, 100);
    }, 500);

    // Cambiar colores del fondo de manera  mientras se hace scroll
    let scrollPosition = 0;
    window.addEventListener('scroll', () => {
        const currentPosition = window.pageYOffset;
        
        // Detectar dirección del scroll
        if (currentPosition > scrollPosition) {
            // Scroll hacia abajo
            document.body.style.backgroundColor = '#f9f7fe';
        } else {
            // Scroll hacia arriba
            document.body.style.backgroundColor = '#f2f0fa';
        }
        
        scrollPosition = currentPosition;
    });

    // Animaacion del botón "Volver al inicio" en el hover
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('mouseenter', () => {
            backButton.classList.add('animate__animated', 'animate__pulse');
        });
        
        backButton.addEventListener('mouseleave', () => {
            backButton.classList.remove('animate__animated', 'animate__pulse');
        });
    }
});

// Función para revelación progresiva del contenido con movimiento
function revealContent() {
    const allElements = document.querySelectorAll('p, h2, img, ol, ul');
    let delay = 0;
    
    allElements.forEach(element => {
        // Solo animar si no es ya visible
        if (!element.classList.contains('is-visible')) {
            setTimeout(() => {
                element.classList.add('is-visible');
            }, delay);
            delay += 150; // Incrementar el retraso para cada elemento
        }
    });
}

// Agregar un poco de movimiento aleatorio a las imágenes flotantes
function addRandomMovement() {
    const floatingImages = document.querySelectorAll('.floating-image');
    
    floatingImages.forEach(img => {
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 10;
            const randomY = (Math.random() - 0.5) * 10;
            
            img.style.transform = `translate(${randomX}px, ${randomY}px)`;
            
            setTimeout(() => {
                img.style.transform = 'translate(0, 0)';
            }, 500);
        }, 3000);
    });
}

// Activar movimiento aleatorio de imágenes
setTimeout(addRandomMovement, 2000);