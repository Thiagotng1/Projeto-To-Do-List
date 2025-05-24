let tarefas = [];

function adicionarTarefa() {
  const inputTarefa = document.getElementById("inputTarefa");
  const mensagem = document.getElementById("mensagem");
  let tarefa = inputTarefa.value.trim();

  if (tarefa === "") {
    mensagem.textContent = "Por favor, digite uma tarefa.";
    mensagem.style.color = "#A34743";
    return;
  }

  mensagem.textContent = "Tarefa adicionada com sucesso!";
  mensagem.style.color = "#467546";

  setTimeout(() => mensagem.textContent = "", 1000);

  tarefas.push(tarefa);
  inputTarefa.value = "";
  renderizarTarefa();
}

function limparLista() {
  if (tarefas.length >= 1) {
    tarefas = [];
    renderizarTarefa();
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = "Tarefas removidas com sucesso!";
    setTimeout(() => mensagem.textContent = "", 1000);
  }
  atualizarVisibilidadeBotaoLimpar();
}

function renderizarTarefa() {
  const listaTarefas = document.getElementById("listaTarefas");
  listaTarefas.innerHTML = "";

  tarefas.forEach((tarefa, i) => {
    const novaTarefa = document.createElement("li");
    const spanTexto = document.createElement("span");
    spanTexto.classList.add("texto-tarefa");
    spanTexto.textContent = tarefa;

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "remover";
    botaoRemover.classList.add("remover");
    botaoRemover.addEventListener("click", (event) => {
      event.stopPropagation();
      tarefas.splice(i, 1);
      renderizarTarefa();
    });

    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "editar";
    botaoEditar.classList.add("editar");
    botaoEditar.addEventListener("click", (event) => {
      event.stopPropagation();
      let novoTexto = prompt("Digite o novo texto da tarefa:", tarefa);
      if (novoTexto !== null && novoTexto.trim() !== "") {
        tarefas[i] = novoTexto.trim();
        renderizarTarefa();
      }
    });

    const containerBotoes = document.createElement("div");
    containerBotoes.classList.add("botoes-tarefa");
    containerBotoes.appendChild(botaoRemover);
    containerBotoes.appendChild(botaoEditar);

    novaTarefa.appendChild(spanTexto);
    novaTarefa.appendChild(containerBotoes);
    novaTarefa.addEventListener("click", () => {
      novaTarefa.classList.toggle("feito");
    });

    listaTarefas.appendChild(novaTarefa);
  });
  atualizarVisibilidadeBotaoLimpar()
}

function atualizarVisibilidadeBotaoLimpar() {

  const botaoLimpar = document.getElementById("botaoLimpar");
  if (tarefas.length === 0) { 
    botaoLimpar.style.display = "none";
  } else {
    botaoLimpar.style.display = "block";
  }
}
// Eventos
document.getElementById("inputTarefa").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    adicionarTarefa();
  }
});

const botaoTema = document.getElementById("alternar-tema");
botaoTema.addEventListener("click", () => {
  document.documentElement.classList.toggle("tema-escuro");
  const temaAtual = document.documentElement.classList.contains("tema-escuro") ? "escuro" : "claro";
  localStorage.setItem("tema", temaAtual);
  botaoTema.textContent = temaAtual === "escuro" ? "Tema Claro" : "Tema Escuro";
});

window.addEventListener("load", () => {
  const temaSalvo = localStorage.getItem("tema");
  if (temaSalvo === "escuro") {
    document.documentElement.classList.add("tema-escuro");
    botaoTema.textContent = "Tema Claro";
  } else {
    botaoTema.textContent = "Tema Escuro";
  }
  atualizarVisibilidadeBotaoLimpar();
});