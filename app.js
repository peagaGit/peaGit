//varáveis
let listaDeSorteios = [];
let numMax = 100;
let numS = gerarNum();
let tentativas = 1;

//Função para exibir os textos na tela
function exibirTexto(tag, texto) {
  
  let campo = document.querySelector(tag);
	campo.innerHTML = texto;
}

//Função para gerar o número aleatório com o Math.random()
function gerarNum() {

  let numEscolhido = parseInt(Math.random() * numMax) + 1;
  let qntNumerosNaLista = listaDeSorteios.length;

  if (qntNumerosNaLista == numMax) {
    listaDeSorteios = [];
  }
  if (listaDeSorteios.includes(numEscolhido)) {
    return gerarNum();
  } else {
    listaDeSorteios.push(numEscolhido);
    console.log(listaDeSorteios);
    return numEscolhido;
  }
}

//Função para chamar exibirTextoInicial() ao clicar em "Novo jogo"
function exibirTextoInicial() {
  
  exibirTexto('h1', 'O Dado Infinito (V1.1)');
	exibirTexto('p', `Tente a sua sorte escolha um número entre 1 e ${numMax}:`);
	console.log(numS);
}

//Chamando função
exibirTextoInicial();

//função para exibir texto ao clicar em "Mais"
function exibirTextoMaisJogos(tag, texto) {
  let campo2 = document.querySelector(tag);
  campo2.innerHTML = texto;
}


//Função para limpar o campo input
function limpar() {

	chute = document.querySelector('input');
	chute.value = '';
}

//Botão: Chutar (acerto e erro)
function verificarChute() {

	let chute = document.querySelector('input').value;

	if (chute == numS) {
		let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentatiava';
		let textoTentativas = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}!`;
		exibirTexto('h1', 'Mandou bem! ;D');
		exibirTexto('p', textoTentativas);
		document.getElementById('reiniciar').removeAttribute('disabled');
	} else {
		exibirTexto('h1', 'Você errou. Mas pode tentar novamente!');
		if (chute > numS) {
			exibirTexto('p', `O número secreto é MENOR que ${chute}.`);
		} else {
			exibirTexto('p', `O número secreto é MAIOR que ${chute}.`);
		}
		if (chute == '') {
			exibirTexto('h1', 'Ops! (x_x)');
			exibirTexto('p', 'é necessário inserir um número para começar.');
		}
		tentativas++;
		limpar();
	}
}

//Botão: Novo Jogo
function novoJogo() {

	numS = gerarNum();
	exibirTextoInicial();
	limpar();
	tentativas = 1;
	document.getElementById('reiniciar').setAttribute('disabled',
		true);
}

//botão: Mais jogos
function maisJogos() {
  exibirTextoMaisJogos('h1', 'Quase lá...');
  exibirTextoMaisJogos('p', 'Novos jogos serão adicionados em breve! :))')
}

/* function verificarNumero(numero) {
    if (numero > 0) {
      console.log("O número é positivo.");
    } else if (numero < 0) {
      console.log("O número é negativo.");
    } else {
      console.log("O número é zero.");
    }
  } */