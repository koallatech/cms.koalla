document.addEventListener('DOMContentLoaded', () => {
    loadClientes();
    
    // Configura o formulário
    document.getElementById('cliente-form').addEventListener('submit', (e) => {
        e.preventDefault();
        saveCliente();
    });
});

// Referência aos dados (em produção, viria do Supabase)
let clientesData = mockData.clientes;

function loadClientes() {
    const tbody = document.querySelector('#clientes-table tbody');
    tbody.innerHTML = ''; // Limpa tabela

    clientesData.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td><span style="padding: 5px 10px; background: rgba(108, 92, 231, 0.2); color: var(--primary-color); border-radius: 15px; font-size: 0.8rem;">${cliente.plano}</span></td>
            <td>${cliente.status}</td>
            <td>
                <button class="btn" style="padding: 5px 10px; background: transparent; color: var(--text-secondary);" onclick="editCliente(${cliente.id})"><i class="fas fa-edit"></i></button>
                <button class="btn" style="padding: 5px 10px; background: transparent; color: #ff7675;" onclick="deleteCliente(${cliente.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Modal Logic
const modal = document.getElementById('modal-cliente');

function openModal() {
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
    document.getElementById('cliente-form').reset();
}

// CRUD Simulado
function saveCliente() {
    // Aqui você colocará: await supabase.from('clientes').insert(...)
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const plano = document.getElementById('plano').value;

    const novoCliente = {
        id: Date.now(), // ID temporário
        nome, email, plano, status: 'Ativo'
    };

    clientesData.push(novoCliente); // Mock update
    loadClientes();
    closeModal();
    showToast('Cliente salvo com sucesso!');
}

function deleteCliente(id) {
    if(confirm('Tem certeza que deseja excluir?')) {
        // Aqui você colocará: await supabase.from('clientes').delete().eq('id', id)
        clientesData = clientesData.filter(c => c.id !== id);
        loadClientes();
        showToast('Cliente removido.', 'error');
    }
}

function editCliente(id) {
    showToast('Função de editar pronta para implementação', 'info');
    // Lógica para preencher o modal com os dados do ID recebido
}