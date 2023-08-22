const form = document.getElementById('form-atividade');
//10-adicionando o emoki de reprovado ou aprovado
const imgAprovado ='<img src="images/aprovado.png" alt="Emoji celebrando" />';
const imgReprovado ='<img src="images/reprovado.png" alt="Emoji decepcionado" />';
const atividades = [];
const notas = [];
/*17- atualizando o campo aprovado de acordo com a media final*/
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>'
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>'

/* 18- Parametrizar a nota minima*/
const notaMinima = parseFloat(prompt('Digite a nota miníma:'));

//8-tivemos que deixar let linhas global, pois caso estivesse na função abaixo, o seu escopo seria resetado toda vez que chamássemos o submit
let linhas = ''
//1-criar um eventlistener para barrar o funcionamento do sumit
form.addEventListener('submit', function(e){
e.preventDefault();

//2-capturar os campos de input(atividade e nota)
const inputNomeAtividade = document.getElementById('nome-atividade');
const inputNotaAtividade = document.getElementById('nota-atividade');



//3-Adicionar atividade,nota e se foi aprovado na tabela
let linha = '<tr>';
linha += `<td> ${inputNomeAtividade.value}</td>`;
linha += `<td> ${inputNotaAtividade.value} </td>`;
//4- para a questão de aprovado ou reprovado, usa o operador ternario (if = ?) e (else = :)
linha += `<td>${inputNotaAtividade.value >=7 ? imgAprovado : imgReprovado }</td>`;
linha += `</tr>`;
//7-para adicionarmos novas linhas a tabela, foi criado uma var linhas, e após todo o preenchimento dos campos, ela irá receber linha novamente.
linhas += linha;

//5-Colocar o conteúdo acima, dentro do corpo da tabela
//6-Primeiro recuperar a tabela
const corpoTabela = document.querySelector('tbody');
corpoTabela.innerHTML = linhas;

//9-depois de adicionarmos o conteudo aos campos e dermos submit, temos que limpa-lo
inputNomeAtividade.value = '';
inputNotaAtividade.value = '';

});


/*11- todo código irá ter que ficar limpo, iremos utilizar devidas funções para que isso ocorra
A responsabilidade dessa função será apenas adicionar uma linha nova a nossa váriavel linha
A responsabilidade de atualizar o conteudo da tabela, irá ficar em outra função abaixo
*/
function adicionaLinha(){
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    /*19-Retirando o bug de ser possível colocar atividades duplicadas*/
    if(atividades.includes(inputNomeAtividade.value)){
        alert(`A atividade: ${inputNomeAtividade.value} ja foi inserida`)
    } else{
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));
    
        let linha = '<tr>';
        linha += `<td> ${inputNomeAtividade.value}</td>`;
        linha += `<td> ${inputNotaAtividade.value} </td>`;
        
        linha += `<td>${inputNotaAtividade.value >=7 ? imgAprovado : imgReprovado }</td>`;
        linha += `</tr>`;
        linhas += linha;
    }




    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';

}

function atualizaTabela(){
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

/*12- realizar o calculo da media final, teremos que adicionar em um array, todas as atividades que o usuário digitou e em outro array, todas notas informadas, isso irá acontecer no escopo global
Cada vez que o adicionar linha for chamado, irá ocorrer um push nos arrays.*/

/* 13- criar uma função para atualizar a media*/

function atualizaMediaFinal(){
    //para calcular a media, precisamos criar uma estrutura repetitiva que soma as notas colocadas nos inputs
    //15- ira ser criado uma variavel para que a media final receba a função de calcular media final
    const mediaFinal = calculaMediaFinal();
    let somaDasNotas = 0;
    for(let i=0 ; i < notas.length; i++){
        somaDasNotas += notas[i];
    }

    /*16- iremos passar o resultado da media para o html*/
    document.getElementById('media-final-valor').innerHTML = mediaFinal;
    document.getElementById('resultado-final-valor').innerHTML = mediaFinal >= 7 ? 'Aprovado' : 'Reprovado' ;

    //depois de termos a soma, precisamos tirar a media.
    
    const media = somaDasNotas / notas.length;

    console.log(atividades);
    console.log(notas);
}

/* 14-é melhor separar as responsabilidades, por isso o calculo da média final irá ter sua própria função.
*/

function calculaMediaFinal(){
    let somaDasNotas = 0;
    for(let i=0 ; i < notas.length; i++){
        somaDasNotas += notas[i];

        return somaDasNotas / notas.length;
    }
}

/*16- iremos passar o resultado da media para o html*/

