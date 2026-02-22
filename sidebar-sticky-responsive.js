/**
 * Sidebar Sticky Responsivo - Desktop e Mobile
 * 
 * Desktop: Sidebar fica fixa após scrollar do hero
 * Mobile: Sidebar se torna um menu lateral retrátil (hambúrguer)
 */

document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const hero = document.querySelector('.hero');
    const body = document.body;
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    
    if (!sidebar || !hero) {
        console.warn('Sidebar ou Hero não encontrados');
        return;
    }
    
    // Obter a altura do hero
    const heroHeight = hero.offsetHeight;
    let isMobile = window.innerWidth <= 768;
    
    console.log('Hero height:', heroHeight);
    console.log('Is Mobile:', isMobile);
    
    // ============================================
    // FUNÇÃO: Atualizar o estado da sidebar (Desktop)
    // ============================================
    function updateSidebarPosition() {
        // Apenas aplicar sticky no desktop
        if (isMobile) return;
        
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        
        if (scrollPosition >= heroHeight) {
            // Sidebar fica fixa
            if (!sidebar.classList.contains('is-fixed')) {
                sidebar.classList.add('is-fixed');
                body.classList.add('sidebar-fixed');
                body.classList.remove('sidebar-relative');
                console.log('Sidebar ficou FIXA');
            }
        } else {
            // Sidebar volta ao fluxo normal
            if (sidebar.classList.contains('is-fixed')) {
                sidebar.classList.remove('is-fixed');
                body.classList.remove('sidebar-fixed');
                body.classList.add('sidebar-relative');
                console.log('Sidebar voltou ao FLUXO NORMAL');
            }
        }
    }
    
    // ============================================
    // FUNÇÃO: Fechar o menu mobile
    // ============================================
    function closeMobileMenu() {
        if (isMobile) {
            sidebar.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
            if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        }
    }
    
    // ============================================
    // FUNÇÃO: Abrir/Fechar o menu mobile
    // ============================================
    function toggleMobileMenu() {
        if (!isMobile) return;
        
        sidebar.classList.toggle('active');
        if (menuToggle) menuToggle.classList.toggle('active');
        if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
    }
    
    // ============================================
    // FUNÇÃO: Detectar mudança de tamanho da tela
    // ============================================
    function handleResize() {
        const wasMobile = isMobile;
        isMobile = window.innerWidth <= 768;
        
        // Se mudou de mobile para desktop
        if (wasMobile && !isMobile) {
            console.log('Mudou para DESKTOP');
            closeMobileMenu();
            sidebar.classList.remove('active');
            updateSidebarPosition();
        }
        // Se mudou de desktop para mobile
        else if (!wasMobile && isMobile) {
            console.log('Mudou para MOBILE');
            sidebar.classList.remove('is-fixed');
            body.classList.remove('sidebar-fixed');
            body.classList.add('sidebar-relative');
        }
    }
    
    // ============================================
    // EVENT LISTENERS
    // ============================================
    
    // Atualizar na primeira carga
    updateSidebarPosition();
    
    // Scroll event com requestAnimationFrame para melhor performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateSidebarPosition();
                ticking = false;
            });
            ticking = true;
        }
    }, false);
    
    // Resize event
    window.addEventListener('resize', handleResize, false);
    
    // Menu toggle click
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Overlay click para fechar menu
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Fechar menu ao clicar em um link dentro da sidebar
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Fechar menu ao fazer scroll
    window.addEventListener('scroll', function() {
        if (isMobile && sidebar.classList.contains('active')) {
            closeMobileMenu();
        }
    }, false);
});
