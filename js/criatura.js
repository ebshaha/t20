const btnGerarMonstro = window.document.querySelector("#btnGerarMonstro")
// Função para adicionar um monstro
btnGerarMonstro.addEventListener("click", function addMonster() {
    var name = document.getElementById("monster-name").value;
    var hp = parseInt(document.getElementById("monster-hp").value);
    var mana = parseInt(document.getElementById("monster-mana").value);

    if (!name || isNaN(hp) || isNaN(mana)) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    var monster = {
        name: name,
        hp: hp,
        mana: mana,
    };

    saveMonster(monster); // Salvar o monstro no localStorage

    var monsterList = document.getElementById("monster-list");
    var monsterCard = createMonsterCard(monster, monsterList);
    monsterList.appendChild(monsterCard);

    // Limpar os campos do formulário
    document.getElementById("monster-name").value = "";
    document.getElementById("monster-hp").value = "";
    document.getElementById("monster-mana").value = "";
});

// Função para salvar um monstro no localStorage
function saveMonster(monster) {
    var monsters = JSON.parse(localStorage.getItem("monsters")) || [];
    monsters.push(monster);
    localStorage.setItem("monsters", JSON.stringify(monsters));
}

// Função para carregar os monstros salvos do localStorage
function loadMonsters() {
    var monsterList = document.getElementById("monster-list");
    var monsters = JSON.parse(localStorage.getItem("monsters")) || [];

    for (var i = 0; i < monsters.length; i++) {
        var monster = monsters[i];
        var monsterCard = createMonsterCard(monster, monsterList);
        monsterList.appendChild(monsterCard);
    }
}

// Função para criar um elemento de card de monstro
function createMonsterCard(monster, monsterList) {
    var monsterCard = document.createElement("div");
    monsterCard.className = "monster-card";

    var monsterName = document.createElement("h2");
    monsterName.textContent = monster.name;

    var monsterHp = document.createElement("p");
    monsterHp.textContent = "Pontos de Vida: " + monster.hp;

    var monsterMana = document.createElement("p");
    monsterMana.textContent = "Pontos de Mana: " + monster.mana;

    var monsterIniciativa = document.createElement("p");
    monsterIniciativa.textContent = "Iniciativa: " + monster.iniciativa;

    var subtractHpBtn = document.createElement("button");
    subtractHpBtn.textContent = "Subtrair HP";
    subtractHpBtn.addEventListener("click", function () {
        var decrement = parseInt(prompt("Informe a quantidade a ser subtraída de Pontos de Vida:", "1"));
        if (!isNaN(decrement) && decrement > 0) {
            monster.hp -= decrement;
            monsterHp.textContent = "Pontos de Vida: " + monster.hp;
            updateMonster(monster); // Atualizar o monstro no localStorage
        } else {
            alert("Digite um valor numérico válido.");
        }
    });

    var addHpBtn = document.createElement("button");
    addHpBtn.textContent = "Adicionar HP";
    addHpBtn.addEventListener("click", function () {
        var increment = parseInt(prompt("Informe a quantidade a ser adicionada a Pontos de Vida:", "1"));
        if (!isNaN(increment) && increment > 0) {
            monster.hp += increment;
            monsterHp.textContent = "Pontos de Vida: " + monster.hp;
            updateMonster(monster); // Atualizar o monstro no localStorage
        } else {
            alert("Digite um valor numérico válido.");
        }
    });

    var subtractManaBtn = document.createElement("button");
    subtractManaBtn.textContent = "Subtrair Mana";
    subtractManaBtn.addEventListener("click", function () {
        var decrement = parseInt(prompt("Informe a quantidade a ser subtraída de Pontos de Mana:", "1"));
        if (!isNaN(decrement) && decrement > 0) {
            monster.mana -= decrement;
            monsterMana.textContent = "Pontos de Mana: " + monster.mana;
            updateMonster(monster); // Atualizar o monstro no localStorage
        } else {
            alert("Digite um valor numérico válido.");
        }
    });

    var addManaBtn = document.createElement("button");
    addManaBtn.textContent = "Adicionar Mana";
    addManaBtn.addEventListener("click", function () {
        var increment = parseInt(prompt("Informe a quantidade a ser adicionada a Pontos de Mana:", "1"));
        if (!isNaN(increment) && increment > 0) {
            monster.mana += increment;
            monsterMana.textContent = "Pontos de Mana: " + monster.mana;
            updateMonster(monster); // Atualizar o monstro no localStorage
        } else {
            alert("Digite um valor numérico válido.");
        }
    });

    var removeBtn = document.createElement("button");
    removeBtn.textContent = "Remover Monstro";
    removeBtn.addEventListener("click", function () {
        monsterList.removeChild(monsterCard);
        deleteMonster(monster); // Remover o monstro do localStorage
    });

    monsterCard.appendChild(monsterName);
    monsterCard.appendChild(monsterHp);
    monsterCard.appendChild(monsterMana);
    monsterCard.appendChild(monsterIniciativa);
    monsterCard.appendChild(subtractHpBtn);
    monsterCard.appendChild(addHpBtn);
    monsterCard.appendChild(subtractManaBtn);
    monsterCard.appendChild(addManaBtn);
    monsterCard.appendChild(removeBtn);

    return monsterCard;
}

// Função para atualizar um monstro no localStorage
function updateMonster(monster) {
    var monsters = JSON.parse(localStorage.getItem("monsters")) || [];
    var index = monsters.findIndex(function (m) {
        return m.name === monster.name;
    });
    if (index !== -1) {
        monsters[index] = monster;
        localStorage.setItem("monsters", JSON.stringify(monsters));
    }
}

// Função para remover um monstro do localStorage
function deleteMonster(monster) {
    var monsters = JSON.parse(localStorage.getItem("monsters")) || [];
    var index = monsters.findIndex(function (m) {
        return m.name === monster.name;
    });
    if (index !== -1) {
        monsters.splice(index, 1);
        localStorage.setItem("monsters", JSON.stringify(monsters));
    }
}

// Carregar os monstros salvos ao carregar a página
loadMonsters();