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

/* --- Simulação de Auth (Corrigido para evitar Loop) --- */
function checkAuth() {
    const path = window.location.pathname;
    const user = localStorage.getItem('koalla_user');

    // CORREÇÃO: Verificamos apenas a palavra 'login'
    // Isso resolve o problema do Cloudflare remover o '.html' da URL
    const isLoginPage = path.includes('login');

    // Cenário 1: Usuário NÃO logado tentando acessar páginas internas
    if (!user && !isLoginPage) {
        // Salva a localização atual para redirecionar de volta no futuro (opcional)
        window.location.href = 'login.html';
    } 
    
    // Cenário 2: Usuário JÁ logado tentando acessar a tela de login
    if (user && isLoginPage) {
        window.location.href = 'dashboard.html';
    }
    
    // Atualiza nome do admin na Topbar se o usuário existir
    if(user && !isLoginPage) {
        const adminNameEl = document.getElementById('admin-name');
        if(adminNameEl) {
            try {
                adminNameEl.innerText = JSON.parse(user).name;
            } catch (e) {
                console.error("Erro ao ler dados do usuário", e);
            }
        }
    }
}
