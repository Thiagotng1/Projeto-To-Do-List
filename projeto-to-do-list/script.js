function adicionarTarefa() {

  // guarda o valor do input que foi digitado
  let inputTarefa = document.getElementById("inputTarefa");
  let tarefa = inputTarefa.value.trim();
  let mensagem = document.getElementById("mensagem");

  // Obtém a lista de tarefas
  let listaTarefas = document.getElementById("listaTarefas");


  if (tarefa == "") {

    // Exibe a menssagem de erro
    let mensagemErro = "Por favor, digite uma tarefa.";
    mensagem.textContent = mensagemErro;
    mensagem.style.color = "#A34743";

    // Limpa o campo do input
    return;

  } else {

    // Mensagem de Adicionada com sucesso
    let mensagemSucesso = "Tarefa adicionada com sucesso!"
    mensagem.textContent = mensagemSucesso;
    mensagem.style.color = "#467546";
    setTimeout(() =>{
      mensagem.textContent = "";
    }, 1000);
  }


  // Limpa o campo do input
  inputTarefa.value = "";


  // Cria um novo elemento de lista
  let novaTarefa = document.createElement("li");

  //novaTarefa.textContent = tarefa;

  let spanTexto = document.createElement("span");

  spanTexto.classList.add("texto-tarefa");
  spanTexto.textContent = tarefa;
  novaTarefa.appendChild(spanTexto);
  
  listaTarefas.appendChild(novaTarefa);

  // Cria um botão de remover
  let botaoRemover = document.createElement("button");
  botaoRemover.textContent = "remover";
  botaoRemover.classList.add("remover");

  // Adiciona o botão denro da tarefa (li)
  novaTarefa.appendChild(botaoRemover);

  // Adiciona o evento para remover a tarefa ao clicar no botão
  botaoRemover.addEventListener("click", function (event) {
    event.stopPropagation(); //impede que o clique afete o <li>
    listaTarefas.removeChild(novaTarefa);
  });



  // Adiciona um risco de tarefa feita
  novaTarefa.addEventListener("click", function () {

    // Adiciona ou remove a classe "feito" ao clicar na tarefa
    novaTarefa.classList.toggle("feito");
  });
  
  //esta guardando o elemento do botao
  let botaoEditar = document.createElement("button");
  
  //adiciona um nome ao botao
  botaoEditar.textContent = "editar";
  
  //puxa o CSS do botao
  botaoEditar.classList.add("editar");

  //adiciona uma div para colocar os dois botoes "editar" e "remover"
  let containerBotoes = document.createElement("div");
  containerBotoes.classList.add("botoes-tarefa");

  containerBotoes.appendChild(botaoRemover);
  containerBotoes.appendChild(botaoEditar);
  
  novaTarefa.appendChild(containerBotoes);
  
  botaoEditar.addEventListener("click", function (event) {
    //impede que o clique afete o <li>
    event.stopPropagation();
    
  
    let spanTexto = novaTarefa.querySelector(".texto-tarefa");
    let textoAtual = spanTexto.textContent;
  
    let novoTexto = prompt("Digite o novo texto da tarefa:", textoAtual);
  
    if (novoTexto !== null) {
  
      novoTexto = novoTexto.trim();
      if (novoTexto !== "") {
        
        spanTexto.textContent = novoTexto;
      } else {
        alert("A tarefa não pode ser vazia.");
      }
    }
      

  });


}
let inputTarefa = document.getElementById('inputTarefa');

inputTarefa.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    adicionarTarefa();
  }
})

const botaoTema = document.getElementById('alternar-tema');

botaoTema.addEventListener('click', () => {
  document.documentElement.classList.toggle('tema-escuro');

  //salva a escolha do usuário no localStorage para manter o tema 
  if(document.documentElement.classList.contains('tema-escuro')) {

    localStorage.setItem('tema', 'escuro');
    botaoTema.textContent = 'Tema Claro';
  } else {
    localStorage.setItem('tema', 'claro');
    botaoTema.textContent = 'Tema Escuro';
  }
});

//ao carregar a pagina, aplica o tema salvo no localStorage
window.addEventListener('load', () => {
  const temaSalvo = localStorage.getItem('tema');

  if(temaSalvo === 'escuro') {
    document.documentElement.classList.add('tema-escuro');
    botaoTema.textContent = 'Tema Claro';
  } else {
    botaoTema.textContent = 'Tema Escuro';
  }
});