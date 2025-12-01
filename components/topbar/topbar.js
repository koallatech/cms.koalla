// components/topbar/topbar.js

export function initTopbar() {
    const toggleBtn = document.getElementById('sidebar-toggle');
    const themeBtn = document.getElementById('theme-toggle');

    // **CHECAGEM DE SEGURANÇA CRÍTICA**
    if (!toggleBtn) {
        console.error("ERRO TOPBAR: Botão 'sidebar-toggle' não encontrado.");
        return;
    }
    if (!themeBtn) {
        console.warn("AVISO TOPBAR: Botão 'theme-toggle' não encontrado.");
        // Não é crítico, então o código pode continuar
    }

    // Lógica do Toggle Sidebar (funciona apenas se toggleBtn não for null)
    toggleBtn.addEventListener('click', () => {
        // Usa 'sidebar-collapsed' para desktop e 'sidebar-open' para mobile (veja sidebar.css)
        if (window.innerWidth > 768) {
             document.body.classList.toggle('sidebar-collapsed');
        } else {
             document.body.classList.toggle('sidebar-open');
        }
    });

    // Lógica do Toggle Tema (funciona apenas se themeBtn não for null)
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Atualiza o ícone (exemplo: Sol ☀️ ou Lua 🌙)
            themeBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });
        
        // Carregar tema salvo na inicialização
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }
}