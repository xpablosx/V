/**
 * Sidebar Sticky - Aparece após o Hero
 * 
 * Este script faz com que a sidebar fique fixa apenas após o usuário rolar
 * a página para baixo da seção Hero. Enquanto está na seção Hero, a sidebar
 * não aparece (ou aparece como parte do fluxo normal).
 */

document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const hero = document.querySelector('.hero');
    const body = document.body;
    
    if (!sidebar || !hero) {
        console.warn('Sidebar ou Hero não encontrados');
        return;
    }
    
    // Obter a altura do hero (altura total da seção hero)
    const heroHeight = hero.offsetHeight;
    
    console.log('Hero height:', heroHeight);
    console.log('Sidebar encontrada:', sidebar);
    
    // Função para atualizar o estado da sidebar
    function updateSidebarPosition() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        
        // Se o scroll passou da altura do Hero, a sidebar fica fixa
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
    
    // Atualizar na primeira carga
    updateSidebarPosition();
    
    // Atualizar ao fazer scroll (com requestAnimationFrame para melhor performance)
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
    
    // Também atualizar ao redimensionar a janela (em caso de mudanças de layout)
    window.addEventListener('resize', function() {
        updateSidebarPosition();
    }, false);
});
