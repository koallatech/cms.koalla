export function initSidebar() {
    // Mobile Overlay Logic
    const overlay = document.querySelector('.sidebar-overlay'); // Adicionar no HTML
    
    // Navegação
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const route = e.target.getAttribute('data-route');
            
            // Dispara evento para o dashboard.js capturar
            const event = new CustomEvent('navigate', { detail: { route } });
            window.dispatchEvent(event);

            // No mobile, fecha a sidebar ao clicar
            if (window.innerWidth < 768) {
                document.body.classList.remove('sidebar-open');
            }
        });
    });
}
