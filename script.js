
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. LINHA DE PROGRESSO DE LEITURA
    const progressBar = document.getElementById('progress-bar');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });

    // 2. SISTEMA DE ABAS INTERATIVAS (TABS ACESSÍVEIS)
    const tabs = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove estados ativos de todas as abas
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
                t.setAttribute('tabindex', '-1');
            });

            // Esconde todos os painéis
            panels.forEach(p => p.setAttribute('hidden', 'true'));

            // Ativa a aba clicada
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            tab.removeAttribute('tabindex');

            // Mostra o painel correspondente
            const targetPanelId = tab.getAttribute('aria-controls');
            const targetPanel = document.getElementById(targetPanelId);
            if (targetPanel) {
                targetPanel.removeAttribute('hidden');
            }
        });

        // Suporte para navegação via setas do teclado (Acessibilidade)
        tab.addEventListener('keydown', (e) => {
            const index = Array.from(tabs).indexOf(tab);
            let nextIndex;

            if (e.key === 'ArrowRight') {
                nextIndex = (index + 1) % tabs.length;
                tabs[nextIndex].focus();
                tabs[nextIndex].click();
            } else if (e.key === 'ArrowLeft') {
                nextIndex = (index - 1 + tabs.length) % tabs.length;
                tabs[nextIndex].focus();
                tabs[nextIndex].click();
            }
        });
    });

    // 3. ANIMAÇÃO DE ENTRADA SUAVE AO SCROLLAR (INTERSECT OBSERVER)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Executa apenas uma vez
            }
        });
    }, observerOptions);

    // Seleciona elementos para animar
    const animatedElements = document.querySelectorAll('.context-card, .bio-stat-card, .intro-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        fadeInObserver.observe(el);
    });
});