// Variables para el carrusel
let currentIndex = 0;
const totalSlides = document.querySelectorAll('.carousel-card').length;
const carouselCards = document.querySelector('.carousel-cards');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let autoSlideInterval;
let mouseX = 0;
let mouseY = 0;

// Inicializar el carrusel y efectos 3D
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    initializeParallaxEffects();
    initializeScrollAnimations();
    init3DCardEffects();
});

// Inicializar efectos parallax
function initializeParallaxEffects() {
    // Efecto parallax para elementos del header
    const header = document.querySelector('.animated-header');
    const title = document.querySelector('.animated-header h1');
    
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Guardar posición del mouse 
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Efecto parallax suave para el header
        header.style.backgroundPosition = `${50 + x * 5}% ${50 + y * 5}%`;
        title.style.transform = `translateX(${x * 10 - 5}px) translateY(${y * 10 - 5}px) translateZ(10px)`;
    });
    
    // Parallax para el fondo
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        document.body.style.backgroundPosition = `center ${-scrolled * 0.15}px`;
    });
}

// Inicializar animaciones al hacer scroll
function initializeScrollAnimations() {
    // Añadir la clase scroll-animation a todos los elementos que queremos animar
    const sections = document.querySelectorAll('section');
    const motivationalMessage = document.querySelector('.motivational-message');
    
    // Añadir clase para animación
    sections.forEach(section => {
        section.classList.add('scroll-animation');
    });
    
    if (motivationalMessage) {
        motivationalMessage.classList.add('scroll-animation');
    }
    
    // Función para verificar si un elemento está en el viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Función para mostrar elementos cuando están en viewport
    function checkScroll() {
        const scrollElements = document.querySelectorAll('.scroll-animation');
        
        scrollElements.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('visible');
            }
        });
    }
    
    // Ejecutar al cargar y al hacer scroll
    checkScroll();
    window.addEventListener('scroll', checkScroll);
}

// Inicializar efectos 3D para tarjetas
function init3DCardEffects() {
    const cards = document.querySelectorAll('.carousel-card');
    
    cards.forEach(card => {
        // Efecto 3D al mover el mouse sobre la tarjeta
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Posición X relativa a la tarjeta
            const y = e.clientY - rect.top; // Posición Y relativa a la tarjeta
            
            // Calcular la rotación basada en la posición del mouse
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Limitar la rotación a 10 grados
            const rotateY = ((x - centerX) / centerX) * 8;
            const rotateX = ((centerY - y) / centerY) * 8;
            
            // Aplicar transformación 3D
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            
            // Efecto de iluminación 3D
            const shine = card.querySelector('.card-overlay');
            if (shine) {
                shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.5) 80%)`;
            }
        });
        
        // Restaurar la posición original al salir del hover
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            const shine = card.querySelector('.card-overlay');
            if (shine) {
                shine.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7))';
            }
        });
    });
}

// Inicializar el carrusel con efectos mejorados
function initCarousel() {
    // Establecer el ancho adecuado para cada tarjeta
    updateCarouselWidth();
    
    // Asignar eventos a los botones
    prevBtn.addEventListener('click', () => {
        navigateSlide(-1);
        resetAutoSlide();
        // Añadir efecto de click
        prevBtn.style.transform = 'scale(0.9) rotateY(-30deg)';
        setTimeout(() => {
            prevBtn.style.transform = '';
        }, 200);
    });
    
    nextBtn.addEventListener('click', () => {
        navigateSlide(1);
        resetAutoSlide();
        // Añadir efecto de click
        nextBtn.style.transform = 'scale(0.9) rotateY(30deg)';
        setTimeout(() => {
            nextBtn.style.transform = '';
        }, 200);
    });
    
    // Asignar eventos a los puntos con efecto 3D
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-index'));
            
            // Efecto de click
            dot.style.transform = 'scale(0.8)';
            setTimeout(() => {
                dot.style.transform = '';
            }, 200);
            
            goToSlide(slideIndex);
            resetAutoSlide();
        });
    });
    
    // Asignar eventos a las tarjetas
    const cards = document.querySelectorAll('.carousel-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const section = card.getAttribute('data-section');
            if (section) {
                // Efecto de zoom antes de navegar
                card.style.transform = 'scale(0.95) translateZ(-20px)';
                setTimeout(() => {
                    window.location.href = section;
                }, 300);
            }
        });
    });
    
    // Iniciar el deslizamiento automático con transición 3D
    startAutoSlide();
    
    // Escuchar eventos de cambio de tamaño de ventana
    window.addEventListener('resize', updateCarouselWidth);
    
    // Añadir efecto de hover a las tarjetas
    addHoverEffects();
    
    // Añadir animación de carga inicial al carrusel
    carouselCards.style.opacity = '0';
    carouselCards.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
        carouselCards.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        carouselCards.style.opacity = '1';
        carouselCards.style.transform = 'translateY(0)';
    }, 300);
}

// Actualizar el ancho del carrusel con efecto 3D
function updateCarouselWidth() {
    const carousel = document.querySelector('.carousel-container');
    const carouselWidth = carousel.offsetWidth;
    const cardWidth = carouselWidth;
    
    // Determinar cuántas tarjetas mostrar según el ancho de la ventana
    let visibleCards = 1;
    if (window.innerWidth > 1200) {
        visibleCards = 3;
    } else if (window.innerWidth > 768) {
        visibleCards = 2;
    }
    
    // Actualizar el ancho de las tarjetas
    const cards = document.querySelectorAll('.carousel-card');
    cards.forEach(card => {
        card.style.width = `${cardWidth / visibleCards}px`;
    });
    
    // Actualizar la posición del carrusel para mantener la tarjeta actual centrada
    goToSlide(currentIndex);
}

// Navegar a la siguiente o anterior diapositiva con efecto 3D
function navigateSlide(direction) {
    // Añadir efecto de transición 3D
    carouselCards.style.transition = `transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
    
    // Añadir efecto de profundidad
    if (direction > 0) {
        carouselCards.style.transform += ' translateZ(-30px)';
    } else {
        carouselCards.style.transform += ' translateZ(-30px)';
    }
    
    setTimeout(() => {
        goToSlide((currentIndex + direction + totalSlides) % totalSlides);
    }, 300);
}

// Ir a una diapositiva específica con transición 3D
function goToSlide(slideIndex) {
    currentIndex = slideIndex;
    
    // Actualizar la posición del carrusel
    const carousel = document.querySelector('.carousel-container');
    const carouselWidth = carousel.offsetWidth;
    
    // Determinar cuántas tarjetas mostrar según el ancho de la ventana
    let visibleCards = 1;
    if (window.innerWidth > 1200) {
        visibleCards = 3;
    } else if (window.innerWidth > 768) {
        visibleCards = 2;
    }
    
    const cardWidth = carouselWidth / visibleCards;
    const offset = -slideIndex * cardWidth;
    
    // Aplicar transformación con perspectiva 3D
    carouselCards.style.transform = `translateX(${offset}px) translateZ(0)`;
    
    // Actualizar los puntos indicadores
    updateDots();
    
    // Añadir efecto de "foco" a la tarjeta activa
    highlightActiveCard(slideIndex);
}

// Resaltar la tarjeta activa con efectos 3D
function highlightActiveCard(index) {
    const cards = document.querySelectorAll('.carousel-card');
    
    cards.forEach((card, i) => {
        if (i === index) {
            card.style.transform = 'scale(1.05) translateZ(20px)';
            card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
        } else {
            card.style.transform = 'scale(1) translateZ(0)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Restaurar efectos normales de hover después de un momento
    setTimeout(() => {
        cards.forEach(card => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    }, 1000);
}

// Actualizar los puntos indicadores con efecto 3D
function updateDots() {
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
            dot.style.transform = 'scale(1.4) translateZ(10px)';
        } else {
            dot.classList.remove('active');
            dot.style.transform = 'scale(1) translateZ(0)';
        }
    });
}

// Iniciar el deslizamiento automático con transición 3D mejorada
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        // Añadir una transición más suave para el auto-slide
        carouselCards.style.transition = 'transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1)';
        navigateSlide(1);
    }, 5000); // Cambiar de diapositiva cada 5 segundos
}

// Resetear el temporizador de deslizamiento automático
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Añadir efectos de hover 3D mejorados a las tarjetas
function addHoverEffects() {
    const cards = document.querySelectorAll('.carousel-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
            // Pausa el deslizamiento automático cuando el cursor está sobre una tarjeta
            clearInterval(autoSlideInterval);
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
            // Reinicia el deslizamiento automático cuando el cursor sale de la tarjeta
            startAutoSlide();
        });
    });
}

// Función para cambiar de sección cuando se hace clic en los enlaces del menú con efectos 3D
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Efecto de click
            this.style.transform = 'scale(0.95) translateZ(0)';
            
            // Obtener el ID de la sección desde el href del enlace
            const targetSectionId = this.getAttribute('href').split('.')[0];
            
            // Ocultar todas las secciones con efecto 3D
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                section.style.transform = 'translateY(30px) rotateX(-5deg)';
                section.style.opacity = '0';
                setTimeout(() => {
                    section.classList.remove('active');
                }, 500);
            });
            
            // Mostrar la sección seleccionada con efecto 3D
            setTimeout(() => {
                const targetSection = document.getElementById(targetSectionId);
                if (targetSection) {
                    targetSection.classList.add('active');
                    
                    // Desplazarse a la sección con efecto suave
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                } else {
                    // Efecto de transición de página
                    document.body.style.opacity = '0';
                    document.body.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        // Si la sección no existe en esta página, navegar a la página
                        window.location.href = this.getAttribute('href');
                    }, 500);
                }
            }, 600);
        });
    });
});