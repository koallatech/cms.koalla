import { createElement, showToast, supabase } from '../../assets/js/utils.js';

export async function loadClientePage() {
    const container = document.getElementById('cliente-list');
    const addBtn = document.getElementById('btn-add-cliente');
    
    // Carregar dados
    const { data: clientes } = await supabase.from('clientes').select('*');
    renderClientes(clientes, container);

    // Evento de adicionar novo (Abre modal - simplificado aqui)
    addBtn.addEventListener('click', () => {
        // Lógica de abrir modal de cadastro
        alert("Abrir Modal de Cadastro (Implementar form)");
        // simulateAddCliente(); 
    });
}

function renderClientes(lista, container) {
    container.innerHTML = ''; // Limpa (mas idealmente faria diff)

    lista.forEach(cliente => {
        const card = createElement('div', ['cliente-card']);
        
        // Cabeçalho do Cliente
        const header = createElement('div', ['card-header']);
        header.appendChild(createElement('h3', [], cliente.nome));
        header.appendChild(createElement('span', ['status-badge'], 'Ativo'));
        
        // Detalhes da Assinatura
        const details = createElement('div', ['card-body']);
        details.appendChild(createElement('p', [], `WhatsApp: ${cliente.whatsapp}`));
        
        // Lógica de Negócio: Exibir Assinatura e Pontos
        const subInfo = cliente.assinatura;
        const subDiv = createElement('div', ['assinatura-info']);
        subDiv.appendChild(createElement('strong', [], 'Assinatura: '));
        subDiv.appendChild(createElement('span', [], `Vence em: ${subInfo.dataVencimento}`));
        
        // Lógica de telas
        const screenCount = subInfo.pontosDeAcesso.length;
        const screenMax = subInfo.pontosMaximos;
        
        const screensDiv = createElement('div', ['screens-container']);
        screensDiv.textContent = `Telas: ${screenCount} / ${screenMax}`;

        // Alerta Visual se tiver espaço sobrando para telas
        if (screenCount < screenMax) {
            screensDiv.style.color = 'var(--warning)';
            const addPointBtn = createElement('button', ['btn-small'], '+ Adicionar Ponto');
            addPointBtn.onclick = () => handleAddPonto(cliente);
            screensDiv.appendChild(addPointBtn);
        } else {
            screensDiv.style.color = 'var(--success)';
        }

        details.appendChild(subDiv);
        details.appendChild(screensDiv);

        card.appendChild(header);
        card.appendChild(details);
        container.appendChild(card);
    });
}

function handleAddPonto(cliente) {
    const currentPoints = cliente.assinatura.pontosDeAcesso.length;
    const maxPoints = cliente.assinatura.pontosMaximos;

    if (currentPoints >= maxPoints) {
        showToast('Limite de telas atingido para esta assinatura!', 'error');
        return;
    }

    // TODO: Supabase Insert
    showToast(`Abrindo formulário para adicionar ponto para ${cliente.nome}`);
    console.log("Cadastrar novo ponto na tabela pontoDeAcesso vinculado a ID:", cliente.assinatura.id);
}
