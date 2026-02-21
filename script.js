/* ============================================
   INICIALIZAÇÃO E CONFIGURAÇÃO
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initNavbar();
    initClickReveal();
    initCarousels();
    initFooter();
});

/* ============================================
   LOADER
   ============================================ */

function initLoader() {
    const loader = document.getElementById('loader');
    
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);
}

/* ============================================
   NAVBAR
   ============================================ */

function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    const navLinks = navbar.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/* ============================================
   CLICK TO REVEAL
   ============================================ */

function initClickReveal() {
    const revealImages = document.querySelectorAll('.click-reveal .timeline-image');

    revealImages.forEach(image => {
        image.addEventListener('click', () => {
            if (!image.classList.contains('revealed')) {
                const imageSrc = image.dataset.image;
                image.style.backgroundImage = `url('${imageSrc}')`;
                image.classList.add('revealed');
            }
        });
    });
}

/* ============================================
   CAROUSELS 3D
   ============================================ */

function initCarousels() {
    const carousels = document.querySelectorAll('.carousel-3d');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        
        if (track) {
            // A animação é feita via CSS, mas podemos adicionar interatividade aqui
            carousel.addEventListener('mouseenter', () => {
                track.style.animationPlayState = 'running';
            });

            carousel.addEventListener('mouseleave', () => {
                track.style.animationPlayState = 'running';
            });
        }
    });
}

/* ============================================
   FOOTER
   ============================================ */

function initFooter() {
    const yearElement = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
}

/* ============================================
   UTILIDADES
   ============================================ */

function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ============================================
   PERFORMANCE E OTIMIZAÇÕES
   ============================================ */

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

function prefetchResources() {
    const imagesToPrefetch = [
        'V1.jfif', 'V2.jfif', 'V3.jfif', 'V4.jfif', 'V5.jfif',
        'V6.jfif', 'V7.jfif', 'V8.jfif', 'V9.jfif', 'V10.jfif',
        'V11.jfif', 'V12.jfif', 'V13.jfif', 'V14.jfif', 'V15.jfif', 'V16.jfif'
    ];

    imagesToPrefetch.forEach(image => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = image;
        document.head.appendChild(link);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', prefetchResources);
} else {
    prefetchResources();
}

/* ============================================
   DETECÇÃO DE TEMA
   ============================================ */

function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-theme');
    }
}

detectSystemTheme();

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (e.matches) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
});

/* ============================================
   ACESSIBILIDADE
   ============================================ */

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => {
        announcement.remove();
    }, 1000);
}

/* ============================================
   EFEITOS AVANÇADOS - SCROLL ANIMATIONS
   ============================================ */

// Adicionar efeito de "reveal on scroll" mais sofisticado
const revealElements = document.querySelectorAll('.timeline-item');

function revealOnScroll() {
    revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', throttle(revealOnScroll, 100));

/* ============================================
   INICIALIZAÇÃO FINAL
   ============================================ */

console.log('V - Experiência Digital Imersiva carregada com sucesso');
console.log('Interações: Click Reveal, Carousel 3D, Hover Effects');
