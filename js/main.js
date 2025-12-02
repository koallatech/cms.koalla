/* --- Configuração Global e Mock Data --- */

// Dados Mock (Simulando Supabase)
const mockData = {
    clientes: [
        { id: 1, nome: "João Silva", email: "joao@email.com", plano: "Premium", status: "Ativo" },
        { id: 2, nome: "Maria Souza", email: "maria@email.com", plano: "Básico", status: "Pendente" },
        { id: 3, nome: "Carlos Lima", email: "carlos@email.com", plano: "Premium", status: "Inativo" },
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSidebar();
    checkAuth();
});

/* --- Gerenciamento de Tema --- */
function initTheme() {
    const savedTheme = localStorage.getItem('koalla_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeBtn = document.getElementById('theme-toggle-btn');
    if(themeBtn) {
        themeBtn.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        themeBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const newTheme = current === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('koalla_theme', newTheme);
            themeBtn.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            showToast(`Tema ${newTheme === 'dark' ? 'Escuro' : 'Claro'} ativado`);
        });
    }
}

/* --- Sidebar e Responsividade --- */
function initSidebar() {
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (toggleBtn && sidebar && overlay) {
        // Abrir Sidebar
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        });

        // Fechar ao clicar fora (Overlay)
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
}

/* --- Feedback Visual (Toast) --- */
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    
    if(toast && toastMsg) {
        toastMsg.innerText = message;
        toast.style.borderLeftColor = type === 'error' ? '#ff7675' : '#6c5ce7';
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

/* --- Simulação de Auth --- */
function checkAuth() {
    // Verificação simples. No futuro, validar token do Supabase
    const path = window.location.pathname;
    const isLoginPage = path.includes('login.html');
    const user = localStorage.getItem('koalla_user');

    if (!user && !isLoginPage) {
        window.location.href = 'login.html';
    } else if (user && isLoginPage) {
        window.location.href = 'dashboard.html';
    }
    
    if(user && !isLoginPage) {
        const adminNameEl = document.getElementById('admin-name');
        if(adminNameEl) adminNameEl.innerText = JSON.parse(user).name;
    }
}