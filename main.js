// Seleciona os elementos necessários
const produtos = document.querySelectorAll('.produto');
const spanTotal = document.getElementById('valor-total');

// Variável para armazenar o valor total da compra
let valorTotalGeral = 0;

// Função para recalcular o total da compra
function atualizarTotal() {
    valorTotalGeral = 0;

    produtos.forEach(produto => {
        const preco = parseFloat(produto.getAttribute('data-preco'));
        const quantidade = parseInt(produto.querySelector('.quantidade').innerText);
        valorTotalGeral += preco * quantidade;
    });

    // Formata o valor para rei (R$)
    spanTotal.innerText = valorTotalGeral.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Adiciona clique para cada produto
produtos.forEach(produto => {
    const btnMais = produto.querySelector('.btn-mais');
    const btnMenos = produto.querySelector('.btn-menos');
    const spanQuantidade = produto.querySelector('.quantidade');

    // Botão + (mais)
    btnMais.addEventListener('click', () => {
        let qtdAtual = parseInt(spanQuantidade.innerText);
        spanQuantidade.innerText = qtdAtual + 1;
        atualizarTotal(); 
    });

    // Botão - (menos)
    btnMenos.addEventListener('click', () => {
        let qtdAtual = parseInt(spanQuantidade.innerText);
        if (qtdAtual > 0) {
            spanQuantidade.innerText = qtdAtual - 1;
            atualizarTotal(); 
        }
    });
});

// Função para enviar pedido para o WhatsApp
function enviarPedido() {
    if (valorTotalGeral === 0) {
        alert("Por favor, adicione pelo menos um item ao seu pedido.");
        return;
    }

    let mensagem = "Olá! Gostaria de fazer o seguinte pedido:\n\n";

    // Pega o nome e quantidade de tudo que foi escolhido
    produtos.forEach(produto => {
        const quantidade = parseInt(produto.querySelector('.quantidade').innerText);
        if (quantidade > 0) {
            const nomeProduto = produto.querySelector('h3').innerText;
            mensagem += `${quantidade}x ${nomeProduto}\n`;
        }
    });

    mensagem += `\n*Total:* ${spanTotal.innerText}`;

    // Gera o link para enviar o pedido pro whatsapp
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // número do WhatsApp para onde a mensagem será enviada
    const numeroWhatsApp = "5581992971944";
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

    // Abre o WhatsApp em uma nova aba
    window.open(url, '_blank');
}
