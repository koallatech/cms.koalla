export function initTopbar() {
    const toggleBtn = document.getElementById('sidebar-toggle');
    const themeBtn = document.getElementById('theme-toggle');

    // Toggle Sidebar
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('sidebar-collapsed');
    });

    // Toggle Tema Claro/Escuro
    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); // Persistir
    });
    
    // Carregar tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
}
