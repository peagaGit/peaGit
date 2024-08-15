// Variáveis Globais
let listaDeSorteios = [];
let numMax = 100;
let numeroGerado = gerarNumeroAleatorio();
let tentativas = 1;
let limiteTentativas = 9;

// Inicialização
document.getElementById('inputId').removeAttribute('disabled');
document.getElementById('inputId').focus();
exibirTextoInicial();

// Funções Utilitárias
function exibirTexto(seletor, texto) {
    document.querySelector(seletor).innerHTML = texto;
}

function limparInput() {
    document.querySelector('input').value = '';
	document.getElementById('inputId').focus();
}

// Função para gerar um número aleatório único
function gerarNumeroAleatorio() {
    if (listaDeSorteios.length === numMax) listaDeSorteios = [];

    let numero;
    do {
        numero = Math.floor(Math.random() * numMax) + 1;
    } while (listaDeSorteios.includes(numero));

    listaDeSorteios.push(numero);
    console.log(`Número gerado: ${numero}`); // Para debug
	
    return numero;
}

// Funções de Exibição de Texto
function exibirTextoInicial() {
    exibirTexto('h1', 'O Desafio do Dado Infinito!');
    exibirTexto('p', `Tente a sua sorte! Escolha um número entre 1 e ${numMax}:`);
}

function exibirResultadoAcerto() {
    const plural = tentativas > 1 ? 'tentativas' : 'tentativa';
    exibirTexto('h1', 'Mandou bem! ;D');
    exibirTexto('p', `Você acertou o número secreto com ${tentativas} ${plural}!`);

    Swal.fire({
        icon: 'success',
        iconColor: '#6808e5',
        title: "PARABÉNS! ㄟ(★‿★)ㄏ",
        text: `Você acertou o número com ${tentativas} ${plural}! ;-D`,
        width: 600,
        padding: "3em",
        color: "#6808e5",
        background: "#12022d",
        backdrop: `
            rgba(0,0,123,0.4)
            url('https://sweetalert2.github.io/images/nyan-cat.gif')
            left top
            no-repeat
        `
    });
}

function exibirResultadoErro(chute) {
    exibirTexto('h1', 'Tente novamente!');
    const dica = chute > numeroGerado ? 'MENOR' : 'MAIOR';
    exibirTexto('p', `O número secreto é ${dica} que ${chute}.`);
}

function exibirMensagemErroInput() {
    exibirTexto('h1', 'Opa... X.X');
    exibirTexto('p', 'Para continuar, insira um número válido.');
    Swal.fire({
        icon: "error",
        iconColor: '#6808e5',
        title: "Oops... (x_x)",
        text: "Para continuar, insira um número válido.",
        color: '#6808e5',
        background: '#12022d',
    });
}

function exibirFimDeJogo() {
    exibirTexto('h1', 'Fim de jogo! :(');
    exibirTexto('p', `Você atingiu o limite de ${limiteTentativas} tentativas.`);
}

// Funções de Controle de Jogo
function desabilitarJogo() {
    document.getElementById('inputId').setAttribute('disabled', true);
    document.getElementById('chutar').setAttribute('disabled', true);
    document.getElementById('novoJogo').removeAttribute('disabled');
}

function verificarChute() {
    const chute = parseInt(document.querySelector('input').value);

    if (isNaN(chute) || chute === '') {
        exibirMensagemErroInput();
		return;
    } else if (chute === numeroGerado) {
        exibirResultadoAcerto();
        desabilitarJogo();
    } else {
        exibirResultadoErro(chute);
        tentativas++;

        if (tentativas > limiteTentativas) {
            exibirFimDeJogo();
            desabilitarJogo();
        }
    }
    limparInput();
}


function novoJogo() {
    numeroGerado = gerarNumeroAleatorio();
    tentativas = 1;
    exibirTextoInicial();
    limparInput();

    document.getElementById('inputId').removeAttribute('disabled');
	document.getElementById('inputId').focus();
    document.getElementById('chutar').removeAttribute('disabled');
    document.getElementById('novoJogo').setAttribute('disabled', true);
}

// Função (botão) para exibir as notas de atualização
function notas() {
	// URL do arquivo PDF que você deseja que seja baixado
	const pdfUrl = 'entrevista.pdf';
	
	// Cria um link temporário
	const link = document.createElement('a');
	link.href = pdfUrl;
	link.download = 'Notas_de_Atualizacao.pdf'; // Nome do arquivo PDF que será baixado
	
	// Adiciona o link ao DOM e clica nele para iniciar o download
	document.body.appendChild(link);
	link.click();
	
	// Remove o link do DOM
	document.body.removeChild(link);
}

// Eventos
document.querySelector('input').addEventListener('keyup', function(event) {
    if (event.key == 'Enter') verificarChute();
});

document.addEventListener('keydown', function(event) {
    if ((event.key === 'R' || event.key === 'r') && ! document.getElementById('novoJogo').disabled) {
        event.preventDefault(); //Impede que o navegador digite as letras 'R' || 'r' na caixa de entrada input ao serem pressionadas
		novoJogo();  // Chama a função novoJogo quando a tecla 'R' ou 'r' for pressionada
    }
});

document.getElementById('novoJogo').addEventListener('click', novoJogo);
document.getElementById('chutar').addEventListener('click', verificarChute);
//v1.2.1