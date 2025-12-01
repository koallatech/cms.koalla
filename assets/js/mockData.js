export const mockData = {
    clientes: [
        {
            id: 1,
            nome: "João Silva",
            whatsapp: "11999999999",
            email: "joao@email.com",
            assinatura: {
                id: 101,
                dataVencimento: "2023-12-01",
                pontosMaximos: 2, // Limite de telas
                renovacoesEmMeses: 3,
                pontosDeAcesso: [
                    { usuario: "joao1", senha: "123", aplicativo: "IPTV Smarters" }
                ]
            }
        }
    ],
    aplicativos: [
        { id: 1, nome: "Xciptv", alias: "XC" },
        { id: 2, nome: "Smarters", alias: "Smart" }
    ],
    servidores: [
        { id: 1, nome: "Servidor Principal", alias: "srv1" }
    ]
};
