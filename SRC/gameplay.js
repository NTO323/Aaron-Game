let equipeCombatJoueur = [];
let equipeCombatEnnemie = [];
let personnageCombatSelectionne = null;
let ennemiCombatCible=null;
let repartitionEquipe = {
    zone1: [],
    zone2: [],
    pierres: []
};

let combatsZones = {
    zone1: null,
    zone2: null
};

let zoneAffichee = "zone1";
let journalCombat = [];
let ecranFinCombatAffiche = false;


function creerCombattantCombat(personnage){
    const stats = personnage.getStats();

    return {
        personnage,
        pv: Math.min(personnage.pv, stats.pv),
        pvMax: stats.pv,
        attaque: stats.attaque,
        defense: stats.defense,
        vitesse: stats.vitesse,
        attaqueBase: stats.attaque,
        defenseBase: stats.defense,
        modeCombat: null,
        timer: null
    };
}
function creerEnnemiCombat(ennemi) {
    return {
        ennemi: ennemi,
        pvMax: ennemi.pv,
        pv: ennemi.pv,
        attaque: ennemi.attaque,
        defense: ennemi.defense,
        vitesse: ennemi.vitesse,
        timer: null
    };
}

function commencerCombat(equipeEnnemie) {
    if (!equipe || equipe.length === 0) {
        return;
    }

    if (!equipeEnnemie || equipeEnnemie.length === 0) {
        return;
    }

    afficherRepartition(equipeEnnemie);
}




