/* ============================================
   INICIALIZAÇÃO E CONFIGURAÇÃO
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initHeroBackground();
    initNavbar();
    initTimeline();
    initFooter();
});

/* ============================================
   LOADER
   ============================================ */

function initLoader() {
    const loader = document.getElementById('loader');
    
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2000);
}

/* ============================================
   HERO BACKGROUND - CUSTOMIZE AQUI
   ============================================ */

function initHeroBackground() {
    const heroBg = document.getElementById('hero-bg');
    
    /* 
    INSTRUÇÕES PARA CUSTOMIZAR:
    
    1. Coloque sua imagem desfocada na pasta do projeto com o nome "hero-bg.jfif"
    2. Você pode ajustar o desfoque e brilho alterando as variáveis CSS:
    
    No arquivo style.css, procure por:
    --hero-bg-image: url('hero-bg.jfif');
    --hero-blur: 15px;
    --hero-brightness: 0.6;
    
    Exemplos de customização:
    - Para menos desfoque: --hero-blur: 8px;
    - Para mais desfoque: --hero-blur: 25px;
    - Para mais brilho: --hero-brightness: 0.8;
    - Para menos brilho: --hero-brightness: 0.4;
    */
    
    // A imagem será carregada automaticamente via CSS
    heroBg.style.backgroundImage = 'url(hero-bg.jfif)';
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
   TIMELINE
   ============================================ */

function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelinePath = document.querySelector('.timeline-path');

    timelineItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
            if (timelinePath) {
                timelinePath.style.filter = 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.3))';
            }
        });

        item.addEventListener('mouseleave', () => {
            if (timelinePath) {
                timelinePath.style.filter = 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.1))';
            }
        });
    });

    // Observar itens para revelar conforme scroll
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Adicionar efeito de parallax suave ao scroll
    window.addEventListener('scroll', () => {
        timelineItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            const elementOffset = item.offsetTop;
            const distance = scrolled - elementOffset;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const parallaxValue = distance * 0.05;
                item.style.transform = `translateY(${parallaxValue}px)`;
            }
        });
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
        'hero-bg.jfif',
        'V1.jfif', 'V2.jfif', 'V3.jfif', 'V4.jfif', 'V5.jfif',
        'V6.jfif', 'V7.jfif', 'V8.jfif', 'V9.jfif', 'V10.jfif',
        'V11.jfif', 'V12.jfif', 'V13.jfif', 'V14.jfif', 'V15.jfif'
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
console.log('Para customizar a imagem de fundo do Hero, veja as instruções em initHeroBackground()');
