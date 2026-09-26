
const adversariesContainer = document.getElementById("adversaries-container");
const adversaryInfo = document.getElementById("adversary-info");
const startFightButton = document.getElementById("start-fight");
let adversaireSelectionne = null;

function afficherAdversaires() {
    adversariesContainer.innerHTML = "";
    const adversairesTries = [...adversaire].sort((a, b) => b.rang - a.rang);

    adversairesTries.forEach((personnage, index) => {
        const adversaryElement = document.createElement("div");
        adversaryElement.classList.add("adversary");

        let difficulte;
        if (index === 0) difficulte = "FACILE";
        else if (index === adversairesTries.length - 1) difficulte = "DIFFICILE";
        else difficulte = "MOYEN";

        adversaryElement.innerHTML = `
            <img src="${personnage.icone}" alt="${personnage.nom}">
            <p class="adversary-name">${personnage.nom}</p>
            <p class="adversary-rank">Rang ${personnage.rang}</p>
            <p class="adversary-difficulty">${difficulte}</p>
        `;

        if (personnage === adversaireSelectionne) {
            adversaryElement.classList.add("selected");
        }

        adversaryElement.addEventListener("click", () => {
            adversaireSelectionne = personnage;
            afficherAdversaires();
            afficherInfoAdversaire();
        });

        adversariesContainer.appendChild(adversaryElement);
    });
}

function afficherInfoAdversaire() {
    if (!adversaireSelectionne) {
        adversaryInfo.innerHTML = `
            <h3>Informations adversaire</h3>
            <p>Sélectionne un adversaire pour voir ses informations.</p>
        `;
        return;
    }

    const personnage = adversaireSelectionne;

    adversaryInfo.innerHTML = `
        <h3>${personnage.nom}</h3>
        <p>${personnage.bio}</p>
    `;
}

startFightButton.addEventListener("click", () => {
    console.log("BOUTON COMBATTRE CLIQUÉ");

    if (!adversaireSelectionne) {
        alert("Sélectionne un adversaire.");
        return;
    }

    if (!equipe || equipe.length === 0) {
        alert("Tu dois avoir au moins un personnage dans ton équipe.");
        return;
    }

    console.log("Adversaire sélectionné :", adversaireSelectionne.nom);
    console.log("Équipe ennemie :", adversaireSelectionne.equipe);
    console.log("Équipe joueur :", equipe);

    commencerCombat(adversaireSelectionne.equipe);
});
