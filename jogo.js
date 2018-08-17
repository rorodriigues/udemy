var timerId = null; //variável que armazena a chamada da função timeout

function iniciaJogo(){

	var url = window.location.search;
	var nivel_jogo = url.replace("?", "");
	
	var tempoSegundos = 0;

	if (nivel_jogo == 1) { //1 fácil - 120 segundos
		tempoSegundos = 120;
	}

	if (nivel_jogo == 2) { //2 normal - 60 segundos
		tempoSegundos = 60;
	}

	if (nivel_jogo == 3) { //3 difícil - 30 segundos
		tempoSegundos = 30;
	}
	
	//inserindo segundos na SPAN cronometro
	document.getElementById('cronometro').innerHTML = tempoSegundos;

	//Quantidade de balões
	var qtd_Baloes = 30;
	cria_baloes(qtd_Baloes);	

	//imprimir balões inteiros
	document.getElementById('baloes_Inteiros').innerHTML = qtd_Baloes;

	//imprimir balões estourados
	document.getElementById('baloes_Estourados').innerHTML = 0;


	//cronometro dinâmico
	contagem_tempo(tempoSegundos + 1);
}

function contagem_tempo(segundos){

	segundos = segundos - 1; //cada vez que a função é chamada, ele tira um segundo
	

	if (segundos == -1) {
		clearTimeout(timerId);//para a execução da função setTimeout
		game_over();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos; // atribuição de valor ao elemento cronômetro
	setTimeout("contagem_tempo("+segundos+")", 1000); //a cada 1 segundo, a função é chamada
}

function cria_baloes(qtd_Baloes){

	for(var i = 1; i <= qtd_Baloes; i++) {

		var balao = document.createElement("img");
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '12px';
		balao.id = 'b'+i;
		balao.onclick = function(){ estourar(this); };

		document.getElementById('cenario').appendChild(balao); //inserir os balões no cenário
	}
	
}

function game_over(){
	remove_eventos_baloes();
	alert('Fim de jogo! Você não estorou os balões no tempo.')
}

function estourar(e){
	var id_balao = e.id;
	
	document.getElementById(id_balao).setAttribute("onclick","");
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
	pontuacao(-1);
}

function pontuacao(acao){
	var contagemInteiro = document.getElementById('baloes_Inteiros').innerHTML;
	var contagemEstourado = document.getElementById('baloes_Estourados').innerHTML;

	contagemInteiro = parseInt(contagemInteiro);
	contagemEstourado = parseInt(contagemEstourado);

	contagemInteiro = contagemInteiro + acao;
	contagemEstourado = contagemEstourado - acao;
	

	document.getElementById('baloes_Inteiros').innerHTML = contagemInteiro;
	document.getElementById('baloes_Estourados').innerHTML = contagemEstourado;

	situacao_jogo(contagemInteiro);
}

function situacao_jogo(contagemInteiro){
	if (contagemInteiro == 0) {
		alert('Parabéns! Você conseguiu estourar os balões a tempo.')
		parar_jogo();
	}
}

function parar_jogo(){
	clearTimeout(timerId);
}


function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}