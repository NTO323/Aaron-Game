const relationList = document.getElementById("relation-list");
const relationDetails = document.getElementById("relation-details");

let personnageRelationSelectionne = null;


// ========================================
// AFFICHER LA LISTE DES PERSONNAGES
// ========================================

function afficherRelations() {

    relationList.innerHTML = "";

    equipe.forEach(personnage => {

        const element = document.createElement("div");

        element.classList.add("relation-character");

        if (personnage === personnageRelationSelectionne) {
            element.classList.add("selected");
        }

        element.innerHTML = `
            <img src="${personnage.icone}" alt="${personnage.nom}">
            <p>${personnage.nom}</p>
        `;

        element.addEventListener("click", () => {

            personnageRelationSelectionne = personnage;

            afficherRelations();
            afficherDetailsRelations();

        });

        relationList.appendChild(element);

    });

    afficherDetailsRelations();

}


// ========================================
// AFFICHER LES DETAILS
// ========================================

function afficherDetailsRelations() {

    relationDetails.innerHTML = "";

    if (!personnageRelationSelectionne) {

        relationDetails.innerHTML = `
            <p class="relation-details-empty">
                Sélectionne un personnage.
            </p>
        `;

        return;
    }

    const nomPersonnage = personnageRelationSelectionne.nom;

    const relations =
        relationsDisponibles[nomPersonnage] || [];

    if (relations.length === 0) {

        relationDetails.innerHTML = `
            <p class="relation-details-empty">
                Aucune relation disponible.
            </p>
        `;

        return;
    }

    relations.forEach(nomRelation => {

        const personnage = personnages.find(
            personnage => personnage.nom === nomRelation
        );

        if (!personnage) return;

        const niveau =
            niveauxRelations[nomPersonnage]?.[nomRelation] || 0;

        const element = document.createElement("div");

        element.classList.add("relation-card");

        element.innerHTML = `
            <img src="${personnage.icone}" alt="${personnage.nom}">
            <p>${personnage.nom}</p>

            <div class="relation-hearts">
                ${afficherCoeursRelation(niveau)}
            </div>
        `;

        relationDetails.appendChild(element);

    });

}


// ========================================
// COEURS
// ========================================

function afficherCoeursRelation(niveau) {

    let coeurs = "";

    for (let i = 1; i <= 4; i++) {

        coeurs += `
            <img
                src="IMG/coeur.png"
                class="${i <= niveau ? "heart-full" : "heart-empty"}"
                alt=""
            >
        `;

    }

    return coeurs;
}


// ========================================
// OUVERTURE DU WIDGET
// ========================================

function initialiserWidgetRelation() {

    const boutonRelation =
        document.querySelector('[data-widget="relation"]');

    if (!boutonRelation) return;

    boutonRelation.addEventListener("click", () => {

        personnageRelationSelectionne = null;

        afficherRelations();

    });

}