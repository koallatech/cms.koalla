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

/* --- Sidebar e Responsividade (ATUALIZADO PARA MINIMIZAÇÃO) --- */
function initSidebar() {
    const mobileToggleBtn = document.getElementById('sidebar-toggle');
    const desktopToggleBtn = document.getElementById('desktop-sidebar-toggle'); // Novo botão
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const topbar = document.querySelector('.topbar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (!sidebar || !mainContent || !topbar) return;

    // 1. CARREGA E APLICA O ESTADO SALVO (DESKTOP)
    const isMinimized = localStorage.getItem('koalla_sidebar_minimized') === 'true';
    if (isMinimized) {
        sidebar.classList.add('minimized');
        mainContent.classList.add('sidebar-minimized');
        topbar.classList.add('sidebar-minimized');
    }

    // 2. FUNÇÃO DE TOGGLE (DESKTOP)
    function toggleMinimization() {
        // Alterna a classe na Sidebar e salva o novo estado
        const isCurrentlyMinimized = sidebar.classList.toggle('minimized');
        
        // Alterna a classe no Main Content e Topbar para ajustar a margem/largura
        mainContent.classList.toggle('sidebar-minimized');
        topbar.classList.toggle('sidebar-minimized');
        
        // Salva o estado no LocalStorage
        localStorage.setItem('koalla_sidebar_minimized', isCurrentlyMinimized);
    }
    
    // Listener do botão de minimização (Desktop)
    if (desktopToggleBtn) {
        desktopToggleBtn.addEventListener('click', toggleMinimization);
    }

    // 3. LÓGICA MOBILE (continua a mesma)
    if (mobileToggleBtn && overlay) {
        // Abrir Sidebar (Mobile)
        mobileToggleBtn.addEventListener('click', () => {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        });

        // Fechar ao clicar fora (Overlay Mobile)
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

/* --- Configuração Global e Mock Data --- */
// ... (código existente) ...

document.addEventListener('DOMContentLoaded', () => {
    // initTheme() e initSidebar() serão chamados DENTRO do include.js agora.
    checkAuth();
    
    // NOVO: Adiciona o listener para ativar o menu quando o DOM estiver pronto
    setActiveMenu(); 
});

// ... (código existente) ...


/* --- NOVO: Função para marcar o item ativo na Sidebar --- */
function setActiveMenu() {
    // 1. Pega o nome do arquivo atual (ex: 'clientes')
    const path = window.location.pathname;
    let pageName = path.substring(path.lastIndexOf('/') + 1).split('.')[0];
    
    // Caso especial para a raiz (index.html)
    if (pageName === '' || pageName === 'index') {
        pageName = 'dashboard';
    }

    // 2. Itera sobre todos os links do menu
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.classList.remove('active'); // Remove a classe de todos primeiro
        
        // 3. Compara o atributo 'data-page' com o nome da página atual
        if (item.getAttribute('data-page') === pageName) {
            item.classList.add('active'); // Adiciona a classe no item correspondente
        }
    });
}