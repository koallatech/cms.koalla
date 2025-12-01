import { showToast, supabase } from './assets/js/utils.js';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;

    // TODO: Substituir por supabase.auth.signInWithPassword
    if (user === 'admin' && pass === '123') {
        showToast('Login realizado com sucesso!');
        setTimeout(() => window.location.href = 'dashboard.html', 1000);
    } else {
        showToast('Credenciais inválidas', 'error');
    }
});
