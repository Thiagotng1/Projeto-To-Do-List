let tarefas = [];

function adicionarTarefa() {
  const inputTarefa = document.getElementById("inputTarefa");
  const mensagem = document.getElementById("mensagem");

  let tarefa = inputTarefa.value.trim();

  if (tarefa === "") {
    mensagem.textContent = "Por favor, digite uma tarefa.";
    mensagem.style.color = "#A34743";
    return;
  } else {
    mensagem.textContent = "Tarefa adicionada com sucesso!";
    mensagem.style.color = "#467546";

    setTimeout(() => {
      mensagem.textContent = "";
    }, 1000);

    inputTarefa.value = "";
    tarefas.push(tarefa);
    renderizarTarefa();
  }
}

function limparLista() {
  tarefas.length = 0;
  renderizarTarefa();
  const mensagem = document.getElementById("mensagem");
  mensagem.textContent = "Tarefas removidas com sucesso!";
  setTimeout(() => {
    mensagem.textContent = "";
    }, 1000)
}

//task render
function renderizarTarefa() {
  const listaTarefas = document.getElementById("listaTarefas");

  listaTarefas.innerHTML = "";

  for (let i = 0; i < tarefas.length; i++) {

    let novaTarefa = document.createElement("li");
    let spanTexto = document.createElement("span");

    spanTexto.classList.add("texto-tarefa");
    spanTexto.textContent = tarefas[i];
    novaTarefa.appendChild(spanTexto);

    let botaoRemover = document.createElement("button");
    botaoRemover.textContent = "remover";
    botaoRemover.classList.add("remover");

    let indiceAtual = i;
    botaoRemover.addEventListener("click", (event) => {
      event.stopPropagation();
      tarefas.splice(indiceAtual, 1);
      renderizarTarefa();
    });

    let botaoEditar = document.createElement("button");
    botaoEditar.textContent = "editar";
    botaoEditar.classList.add("editar");

    let containerBotoes = document.createElement("div");
    containerBotoes.classList.add("botoes-tarefa");
    containerBotoes.appendChild(botaoRemover);
    containerBotoes.appendChild(botaoEditar);

    novaTarefa.appendChild(containerBotoes);
    listaTarefas.appendChild(novaTarefa);

    novaTarefa.addEventListener("click", () => {
      novaTarefa.classList.toggle("feito");
    });

    botaoEditar.addEventListener("click", (event) => {
      event.stopPropagation();
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
}
const inputTarefa = document.getElementById("inputTarefa");
inputTarefa.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    adicionarTarefa();
  }
});

const botaoTema = document.getElementById("alternar-tema");

botaoTema.addEventListener("click", () => {
  document.documentElement.classList.toggle("tema-escuro");

  if (document.documentElement.classList.contains("tema-escuro")) {
    localStorage.setItem("tema", "escuro");
    botaoTema.textContent = "Tema Claro";
  } else {
    localStorage.setItem("tema", "claro");
    botaoTema.textContent = "Tema Escuro";
  }
});

window.addEventListener("load", () => {
  const temaSalvo = localStorage.getItem("tema");

  if (temaSalvo === "escuro") {
    document.documentElement.classList.add("tema-escuro");
    botaoTema.textContent = "Tema Claro";
  } else {
    botaoTema.textContent = "Tema Escuro";
  }
});