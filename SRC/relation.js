const relationsDisponibles = {

    Aaron: ["Poly", "Colin"],
    Poly: ["Aaron"],
    Colin: ["Aaron"]

};

const niveauxRelations = {};

const chancesRelation = [100, 30, 20, 10, 0];

let notificationsRelations = [];

const recompensesRelations = {

    "Aaron-Poly": {
        1: Medicinale,
        2: pierreAttaque,
        3: armure,
        4: bottes
    },

    "Aaron-Colin": {
        1: pierreAttaque
    }

};

function obtenirRecompenseRelation(nom1, nom2, niveau) {

    const cle = [nom1, nom2].sort().join("-");

    return recompensesRelations[cle]?.[niveau] || null;

}

function initialiserRelations() {

    if (!Array.isArray(personnages)) return;

    personnages.forEach(personnage => {

        const relations =
            relationsDisponibles[personnage.nom];

        if (!relations) return;

        if (!niveauxRelations[personnage.nom]) {
            niveauxRelations[personnage.nom] = {};
        }

        relations.forEach(nomRelation => {

            if (
                niveauxRelations[personnage.nom][nomRelation] === undefined
            ) {
                niveauxRelations[personnage.nom][nomRelation] = 0;
            }

        });

    });

}