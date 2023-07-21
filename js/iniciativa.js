var adicaoHabilitada = true;
var rodadas = 0;
var resultados = [];
var contadorIncrementado = 0; // Variável para o contador incrementado

// Função auxiliar para adicionar uma iniciativa à lista
function adicionarIniciativaNaLista(nome, resultado) {
    var lista = document.getElementById("lista");
    var item = document.createElement("li");

    var resultadoTexto = document.createElement("span");
    resultadoTexto.textContent = nome + ": " + resultado;

    var campoValor = document.createElement("input");
    campoValor.type = "number";
    campoValor.value = resultado;
    campoValor.addEventListener("change", function () {
        resultadoTexto.textContent = nome + ": " + campoValor.value;
        reordenarLista();
    });

    var botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.addEventListener("click", function () {
        item.parentNode.removeChild(item);
        removerIniciativa(resultado);
    });

    item.appendChild(resultadoTexto);
    item.appendChild(campoValor);
    item.appendChild(botaoRemover);
    lista.appendChild(item);
}
// Função para salvar as iniciativas no localStorage
function salvarIniciativas() {
    localStorage.setItem("iniciativas", JSON.stringify(resultados));
}

// Função para carregar as iniciativas do localStorage
function carregarIniciativas() {
    var iniciativasSalvas = localStorage.getItem("iniciativas");
    if (iniciativasSalvas) {
        resultados = JSON.parse(iniciativasSalvas);
        for (var i = 0; i < resultados.length; i++) {
            var nome = resultados[i].nome;
            var resultado = resultados[i].resultado;
            adicionarIniciativaNaLista(nome, resultado);
        }
    }
    reordenarLista();
}

function adicionarNumero() {
    if (!adicaoHabilitada) {
        return;
    }

    var nome = document.getElementById("nome").value;
    var numero = parseInt(document.getElementById("numero").value);
    var resultado = Math.floor(Math.random() * 20) + 1 + numero;

    adicionarIniciativaNaLista(nome, resultado);

    resultados.push({ nome: nome, resultado: resultado });
    reordenarLista();
    salvarIniciativas();
}

function removerIniciativa(resultado) {
    var index = resultados.findIndex(function (item) {
        return item.resultado === resultado;
    });

    if (index !== -1) {
        resultados.splice(index, 1);
        salvarIniciativas();
    }
}

function limparResultados() {
    var lista = document.getElementById("lista");
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    resultados = [];
    rodadas = 0;
    contadorIncrementado = 0; // Reiniciar o contador incrementado
    atualizarContador();
    salvarIniciativas();
}

function reordenarLista() {
    var lista = document.getElementById("lista");
    var items = Array.from(lista.getElementsByTagName("li"));
    items.sort(function (a, b) {
        var resultadoA = parseInt(a.getElementsByTagName("input")[0].value);
        var resultadoB = parseInt(b.getElementsByTagName("input")[0].value);
        return resultadoB - resultadoA;
    });

    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    for (var i = 0; i < items.length; i++) {
        lista.appendChild(items[i]);
    }
}

function habilitarAdicao() {
    adicaoHabilitada = true;
}

function desabilitarAdicao() {
    adicaoHabilitada = false;
    if (resultados.length > 0 && !document.getElementById("btnProximoResultado")) {
        var botaoProximo = document.createElement("button");
        botaoProximo.id = "btnProximoResultado"; // Definir um ID para o botão
        botaoProximo.textContent = "Próxima iniciativa";
        botaoProximo.addEventListener("click", function () {
            var lista = document.getElementById("lista");
            var items = lista.getElementsByTagName("li");
            if (rodadas < items.length) {
                if (rodadas > 0) {
                    items[rodadas - 1].classList.remove("marcado");
                }
                items[rodadas].classList.add("marcado");
                rodadas++;
            } else {
                for (var i = 0; i < items.length; i++) {
                    items[i].classList.remove("marcado");
                }
                items[rodadas - 1].classList.remove("marcado");
                rodadas = 0;
                contadorIncrementado++; // Incrementar a variável contadorIncrementado
                atualizarContador();
            }
        });
        document.body.appendChild(botaoProximo);
    }
}

window.addEventListener("load", carregarIniciativas);

function atualizarContador() {
    var contador = document.getElementById("contador");
    contador.textContent = contadorIncrementado; // Usar o valor da variável contadorIncrementado
}