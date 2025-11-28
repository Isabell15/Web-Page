
// Función para verificar si un elemento está en el viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

// Función para manejar la animación cuando los elementos aparecen en pantalla
function handleScrollAnimations() {
    // Animar secciones
    document.querySelectorAll('.fade-in-section').forEach(section => {
        if (isElementInViewport(section)) {
            section.classList.add('is-visible');
        }
    });
    
    // Animar imágenes
    document.querySelectorAll('.animated-image').forEach(image => {
        if (isElementInViewport(image)) {
            image.classList.add('is-visible');
        }
    });
    
    // Animar listas
    document.querySelectorAll('.reveal-list').forEach(list => {
        if (isElementInViewport(list)) {
            list.classList.add('is-visible');
        }
    });
}

// Ejecutar animaciones cuando la página está lista
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar animaciones
    setTimeout(handleScrollAnimations, 300);
    
    // Detectar scroll
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Efecto de rotación 3D para imágenes al pasar el mouse
    document.querySelectorAll('.animated-image:not(.pulse)').forEach(image => {
        image.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = image.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            image.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${y * -10}deg) scale(1.05)`;
        });
        
        image.addEventListener('mouseleave', () => {
            image.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
        });
    });
    
    // Efecto de ondas para botones
    document.querySelectorAll('.btn-hover').forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
            const x = e.clientX - e.target.offsetLeft;
            const y = e.clientY - e.target.offsetTop;
            
            const ripple = document.createElement('span');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.position = 'absolute';
            ripple.style.background = 'rgba(255,255,255,0.4)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 1s linear';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
    
    // Botón flotante para volver arriba
    const floatingBtn = document.querySelector('.floating-btn');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            floatingBtn.classList.add('show');
        } else {
            floatingBtn.classList.remove('show');
        }
    });
    
    floatingBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});