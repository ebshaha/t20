import { dinheiro, riquezas, tabelaItens, tabelaItensResultados } from './dinheiroArray.js';

let btnGerar = window.document.querySelector('.bntGerar')
let resultadotxt = document.querySelector("#result")
let btnMPD
let nd

let dcemDin

btnGerar.addEventListener("click", function padraoOuDobro() {
    btnMPD = window.document.querySelector("#tesouroMPD").value
    resultadotxt.innerHTML = "<p></p>"

    let myI
    if (btnMPD === "dobro") {
        myI = 2
    } else {
        myI = 1
    }

    for (let i = 0; i < myI; i++) {
        rolarDinheiro()
        rolarItem()
    }
});
function rolarDinheiro() {
    /* Var para dinheiro */
    nd = parseInt(document.getElementById("nivelDesafio").value);
    dcemDin = Math.floor(Math.random() * 100) + 1;
    let resultado = 0;
    let dadoDaVezTxtBase = "";
    let dadoDaVezTxtIncremento = "";
    let dadoDaVez = 0;
    /* Var para dinheiro FIM */

    for (const { min, max, parametros } of dinheiro[nd]) {
        if (dcemDin >= min && dcemDin <= max) {
            if (parametros.riqueza === false) {
                if (parametros.quantDados == 0) {
                    resultadotxt.innerHTML += `<p>D% ${dcemDin}, nenhum Tibar encontrado`
                } else {
                    dadoDaVezTxtBase = `<p>D% ${dcemDin}, ${parametros.quantDados}d${parametros.ladoDados} + ${parametros.modificador} * ${parametros.multiplicador} [`;

                    for (let i = 0; i < parametros.quantDados; i++) {
                        dadoDaVez = Math.floor(Math.random() * parametros.ladoDados) + 1;
                        dadoDaVezTxtIncremento += ` ${dadoDaVez};`;
                        resultado += dadoDaVez;
                    }
                    if (btnMPD === "metade") {
                        resultado = ((resultado + parametros.modificador) * parametros.multiplicador) / 2;
                    } else {
                        resultado = (resultado + parametros.modificador) * parametros.multiplicador;
                    }
                    dadoDaVezTxtBase += `${dadoDaVezTxtIncremento}] ${parametros.moeda} ${resultado}</p>`;
                    resultadotxt.innerHTML += dadoDaVezTxtBase;

                }
            } else if (parametros.riqueza === true) {
                riquezasRodar(parametros.quantDados, parametros.ladoDados, parametros.modificador, parametros.modificadorJog, parametros.tamanho);
                return;
            }

        }
    }
}

function riquezasRodar(quantDados, ladoDados, modificador, modificadorJog, tamRiqueza1) {
    const tamRiqueza = tamRiqueza1
    let dcemRiq = (Math.floor(Math.random() * 100) + 1) + modificadorJog;
    let resultadoCada = []
    let dadoDaVezTxtBase = "";

    let numRiquezasAdquiridas = 0;
    for (let i = 0; i < quantDados; i++) {
        numRiquezasAdquiridas += (Math.floor(Math.random() * ladoDados) + 1) + modificador;
    }

    dadoDaVezTxtBase += `<p>D% ${dcemDin}, ${numRiquezasAdquiridas} riqueza(s) ${tamRiqueza}<br></p>`

    for (let i = 0; i < numRiquezasAdquiridas; i++) {
        let resultado = 0
        let dadoDaVezTxtIncremento = "";
        let dadoDaVez = 0;
        let dadoGeradorDaRiqueza = ""
        dadoDaVezTxtBase += `<p>(`

        for (const { min, max, parametros } of riquezas[tamRiqueza]) {


            if (dcemRiq >= min && dcemRiq <= max) {
                resultadoCada[i] = 0
                dadoDaVezTxtBase += ` D% ${dcemRiq};`
                for (let j = 0; j < parametros.quantDados; j++) {
                    dadoDaVez = Math.floor(Math.random() * parametros.ladoDados) + 1;
                    dadoDaVezTxtIncremento += ` ${dadoDaVez};`;
                    resultadoCada[i] += dadoDaVez;
                }
                dadoGeradorDaRiqueza += ` ${parametros.quantDados}d${parametros.ladoDados} * ${parametros.multiplicador};`
                resultadoCada[i] = resultadoCada[i] * parametros.multiplicador
                resultado += parseInt(resultadoCada[i])
            }
        }
        if (btnMPD === "metade") {
            resultado = resultado / 2;
        }

        dcemRiq = (Math.floor(Math.random() * 100) + 1) + modificadorJog;
        dadoDaVezTxtBase += `) (+${modificadorJog}%), (${dadoGeradorDaRiqueza})[`;
        dadoDaVezTxtBase += `${dadoDaVezTxtIncremento}] T$ ${resultado} (valor em Tibares)</p>`;

    }

    resultadotxt.innerHTML += dadoDaVezTxtBase;
}

let dcemItens
function rolarItem() {
    dcemItens = Math.floor(Math.random() * 100) + 1;
    for (const { min, max, parametros } of tabelaItens[nd]) {
        if (dcemItens >= min && dcemItens <= max) {
            if (parametros.tipo === "nada") {
                resultadotxt.innerHTML += `<p>D% ${dcemItens}, Nenhum item encontrado</p>`
            } else if (parametros.tipo === "diverso") {
                decidirResultadoTabelas("diverso", 0)
            } else if (parametros.tipo === "equipamento") {
                decidirResultadoTabelas("equipamento", 1, parametros.doisseis)
            } else if (parametros.tipo === "pocao") {
                decidirResultadoTabelas("pocao", 2)
            } else if (parametros.tipo === "superior") {
                decidirResultadoTabelas("superior", 3, parametros.doisseis)
            }
        }
    }
}

function decidirResultadoTabelas(resultadoNaTabela, resultadoProfundo, doisseis) {
    if (resultadoNaTabela === "diverso") {
        let dcemItensDiversos = Math.floor(Math.random() * 100) + 1
        for (const { min, max, oquee } of tabelaItensResultados[resultadoProfundo]) {

            if (dcemItensDiversos >= min && dcemItensDiversos <= max) {
                resultadotxt.innerHTML += `<p>D% ${dcemItens} (D% ${dcemItensDiversos}), Item: ${oquee}</p>`
            }
        }
    } else if (resultadoNaTabela === "equipamento") {
        let dseis = []
        for (let i = 0; i < doisseis; i++) {
            dseis[i] = Math.floor(Math.random() * 6) + 1;
        }
        if (doisseis === 1 || doisseis === null) {

            for (let { min, max, nome, lista, } of tabelaItensResultados[resultadoProfundo]) {
                if (dseis[0] >= min && dseis[0] <= max) {
                    let dcemItensDiversos = Math.floor(Math.random() * 100) + 1
                    resultadotxt.innerHTML += `<p class="resultEquipamentoSimples">D% ${dcemItens}, ${dseis.length}d6 [${dseis[0]}], D% ${dcemItensDiversos}, ${nome}: </p>`

                    for (const { min, max, nome } of lista) {
                        if (dcemItensDiversos >= min && dcemItensDiversos <= max) {
                            resultadotxt.innerHTML += `<p class="resultEquipamentoSimples">${nome}</p>`
                        }
                    }
                }
            }
        } else {
            let itensEscolhidos = []
            for (let i = 0; i < dseis.length; i++) {

                for (let { min, max, nome, } of tabelaItensResultados[resultadoProfundo]) {
                    if (dseis[i] >= min && dseis[i] <= max) {
                        itensEscolhidos[i] = nome
                    }
                }
            }
            if (itensEscolhidos[0] == itensEscolhidos[1]) {
                for (const { min, max, nome, lista } of tabelaItensResultados[resultadoProfundo]) {
                    if (dseis[0] >= min && dseis[0] <= max) {
                        let dcemItensDiversos = Math.floor(Math.random() * 100) + 1
                        resultadotxt.innerHTML += `<p class="resultEquipamentoSimples">D% ${dcemItens}, ${dseis.length}d6 [${dseis[0]}, ${dseis[1]}], D% ${dcemItensDiversos}, ${nome}: </p>`

                        for (const { min, max, nome } of lista) {
                            if (dcemItensDiversos >= min && dcemItensDiversos <= max) {
                                resultadotxt.innerHTML += `<p class="resultEquipamentoSimples">${nome}</p>`
                            }
                        }
                    }
                }
            } else {
                let itenRealmenteEscolhido
                let opcao1 = document.createElement("button")
                opcao1.textContent = itensEscolhidos[0]
                opcao1.addEventListener("click", function () {
                    itenRealmenteEscolhido = itensEscolhidos[0]
                    resultadotxt.removeChild(opcao1)
                    resultadotxt.removeChild(opcao2)
                    for (const { nome, lista } of tabelaItensResultados[resultadoProfundo]) {
                        if (itenRealmenteEscolhido === nome) {
                            let dcemItensDiversos = Math.floor(Math.random() * 100) + 1
                            resultadotxt.innerHTML += `<p class="resultEquipamentoSimples">D% ${dcemItens}, ${dseis.length}d6 [${dseis[0]}, ${dseis[1]}], D% ${dcemItensDiversos}, ${nome}: </p>`
                            for (const { min, max, nome } of lista) {
                                if (dcemItensDiversos >= min && dcemItensDiversos <= max) {
                                    resultadotxt.innerHTML += `<p class="resultEquipamentoSimples">${nome}</p>`
                                }
                            }
                        }
                    }
                });
                let opcao2 = document.createElement("button")
                opcao2.textContent = itensEscolhidos[1]
                opcao2.addEventListener("click", function () {
                    itenRealmenteEscolhido = itensEscolhidos[1]
                    resultadotxt.removeChild(opcao1)
                    resultadotxt.removeChild(opcao2)
                    for (const { nome, lista } of tabelaItensResultados[resultadoProfundo]) {
                        if (itenRealmenteEscolhido === nome) {
                            let dcemItensDiversos = Math.floor(Math.random() * 100) + 1
                            resultadotxt.innerHTML += `<p class="resultEquipamentoSimples">D% ${dcemItens}, ${dseis.length}d6 [${dseis[0]}, ${dseis[1]}], D% ${dcemItensDiversos}, ${nome}: </p>`
                            for (const { min, max, nome } of lista) {
                                if (dcemItensDiversos >= min && dcemItensDiversos <= max) {
                                    resultadotxt.innerHTML += `<p class="resultEquipamentoSimples">${nome}</p>`
                                }
                            }
                        }
                    }
                });

                resultadotxt.appendChild(opcao1)
                resultadotxt.appendChild(opcao2)

            }
        }
    } else if (resultadoNaTabela === "pocao") {
        let quantDados
        let ladoDados
        let modificador
        let modificadorJog
        for (const { min, max, parametros } of tabelaItens[nd]) {
            if (dcemItens >= min && dcemItens <= max) {
                quantDados = parametros.quantDados
                ladoDados = parametros.ladoDados
                modificador = parametros.modificador
                modificadorJog = parametros.modificadorJog
            }
        }
        let numPocoesAdquiridas = 0;
        for (let i = 0; i < quantDados; i++) {
            numPocoesAdquiridas += (Math.floor(Math.random() * ladoDados) + 1) + modificador;
        }

        resultadotxt.innerHTML += `<p class="resultEquipamentoSimples">D% ${dcemItens}, ${quantDados}d${ladoDados}+${modificador} poções, [${numPocoesAdquiridas}],</p>`
        for (let i = 0; i < numPocoesAdquiridas; i++) {
            let dcemPocoes = (Math.floor(Math.random() * 100) + 1) + modificadorJog
            for (const { min, max, oquee, tipo } of tabelaItensResultados[resultadoProfundo]) {
                if (dcemPocoes >= min && dcemPocoes <= max) {
                    resultadotxt.innerHTML += `<p class="resultEquipamentoSimples"> D% ${dcemPocoes} (+${modificadorJog}), Item: ${oquee} (${tipo});</p>`
                }
            }
        }
    } else if (resultadoNaTabela === "superior") {
        let dseis = []
        for (let i = 0; i < doisseis; i++) {
            dseis[i] = Math.floor(Math.random() * 6) + 1;
        }
        let melhorias = []
        if (doisseis === 1 || doisseis === null) {
            for (const { min, max, parametros } of tabelaItens[nd]) {
                if (dcemItens >= min && dcemItens <= max) {
                    for (let i = 0; i < parametros.quantMelhorias; i++) {
                        for (const { min, max, nome, tam, especial } of tabelaItensResultados[resultadoProfundo]) {
                            dcemMelhoria = Math.floor(Math.random() * 100) + 1;
                            if (dcemMelhoria >= min && dcemMelhoria <= max && tam <= parametros.quantMelhorias && especial === "nao") {
                                
                            }
                        }
                    }
                }
            }

            for (let { min, max, nome, lista, } of tabelaItensResultados[resultadoProfundo]) {
                if (dseis[0] >= min && dseis[0] <= max) {
                    let dcemItensDiversos = Math.floor(Math.random() * 100) + 1
                    resultadotxt.innerHTML += `<p class="resultEquipamentoSimples">D% ${dcemItens}, ${dseis.length}d6 [${dseis[0]}], D% ${dcemItensDiversos}, ${nome}: </p>`

                    for (const { min, max, nome } of lista) {
                        if (dcemItensDiversos >= min && dcemItensDiversos <= max) {
                            resultadotxt.innerHTML += `<p class="resultEquipamentoSimples">${nome}</p>`
                        }
                    }
                }
            }
        } else {
            let itensEscolhidos = []
            for (let i = 0; i < dseis.length; i++) {

                for (let { min, max, nome, } of tabelaItensResultados[1]) {
                    if (dseis[i] >= min && dseis[i] <= max) {
                        itensEscolhidos[i] = nome
                    }
                }
            }
            if (itensEscolhidos[0] == itensEscolhidos[1]) {
                for (const { min, max, nome, lista } of tabelaItensResultados[1]) {
                    if (dseis[0] >= min && dseis[0] <= max) {
                        let dcemItensDiversos = Math.floor(Math.random() * 100) + 1
                        resultadotxt.innerHTML += `<p class="resultEquipamentoSimples">D% ${dcemItens}, ${dseis.length}d6 [${dseis[0]}, ${dseis[1]}], D% ${dcemItensDiversos}, ${nome}: </p>`

                        for (const { min, max, nome } of lista) {
                            if (dcemItensDiversos >= min && dcemItensDiversos <= max) {
                                resultadotxt.innerHTML += `<p class="resultEquipamentoSimples">${nome}</p>`
                            }
                        }
                    }
                }
            } else {
                let itenRealmenteEscolhido
                let opcao1 = document.createElement("button")
                opcao1.textContent = itensEscolhidos[0]
                opcao1.addEventListener("click", function () {
                    itenRealmenteEscolhido = itensEscolhidos[0]
                    resultadotxt.removeChild(opcao1)
                    resultadotxt.removeChild(opcao2)
                    for (const { nome, lista } of tabelaItensResultados[resultadoProfundo]) {
                        if (itenRealmenteEscolhido === nome) {
                            let dcemItensDiversos = Math.floor(Math.random() * 100) + 1
                            resultadotxt.innerHTML += `<p class="resultEquipamentoSimples">D% ${dcemItens}, ${dseis.length}d6 [${dseis[0]}, ${dseis[1]}], D% ${dcemItensDiversos}, ${nome}: </p>`
                            for (const { min, max, nome } of lista) {
                                if (dcemItensDiversos >= min && dcemItensDiversos <= max) {
                                    resultadotxt.innerHTML += `<p class="resultEquipamentoSimples">${nome}</p>`
                                }
                            }
                        }
                    }
                });
                let opcao2 = document.createElement("button")
                opcao2.textContent = itensEscolhidos[1]
                opcao2.addEventListener("click", function () {
                    itenRealmenteEscolhido = itensEscolhidos[1]
                    resultadotxt.removeChild(opcao1)
                    resultadotxt.removeChild(opcao2)
                    for (const { nome, lista } of tabelaItensResultados[resultadoProfundo]) {
                        if (itenRealmenteEscolhido === nome) {
                            let dcemItensDiversos = Math.floor(Math.random() * 100) + 1
                            resultadotxt.innerHTML += `<p class="resultEquipamentoSimples">D% ${dcemItens}, ${dseis.length}d6 [${dseis[0]}, ${dseis[1]}], D% ${dcemItensDiversos}, ${nome}: </p>`
                            for (const { min, max, nome } of lista) {
                                if (dcemItensDiversos >= min && dcemItensDiversos <= max) {
                                    resultadotxt.innerHTML += `<p class="resultEquipamentoSimples">${nome}</p>`
                                }
                            }
                        }
                    }
                });

                resultadotxt.appendChild(opcao1)
                resultadotxt.appendChild(opcao2)

            }
        }

    }

}