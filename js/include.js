// js/include.js

/**
 * Função genérica para incluir um componente estático HTML.
 * @param {string} componentId - O ID do elemento DIV onde o componente será injetado.
 * @param {string} filePath - O caminho do arquivo HTML do componente.
 */
function includeComponent(componentId, filePath) {
    const container = document.getElementById(componentId);
    
    if (container) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao carregar componente ${filePath}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                // Injeta o HTML dentro do container
                container.innerHTML = html;
                
                // Opcional: Re-inicializar a lógica da Topbar/Sidebar após a injeção
                // (Geralmente, o initTheme e initSidebar no main.js já fazem isso
                // pois são chamados no DOMContentLoaded, mas podemos garantir)
                if (typeof initTheme === 'function') initTheme();
                if (typeof initSidebar === 'function') initSidebar();
                
            })
            .catch(error => {
                console.error(`Falha ao incluir o componente ${filePath}`, error);
                container.innerHTML = `<p style="color: red;">[Erro ao carregar ${filePath}]</p>`;
            });
    }
}