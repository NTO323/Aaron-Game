

function obtenirDelaiAttaque(vitesse) {
    return 60000 / Math.max(1, vitesse);
}
function appliquerModeCombat(combattant,mode){
    if(!combattant)return;

    combattant.modeCombat=mode;

    if(mode==="offensif"){
        combattant.attaque=combattant.attaqueBase+2;
        combattant.defense=combattant.defenseBase-2;
    }else if(mode==="defensif"){
        combattant.attaque=combattant.attaqueBase-2;
        combattant.defense=combattant.defenseBase+2;
    }
}
function demarrerCombatsAutomatiques() {
    lancerExpeditionPierres();
    demarrerCombattantsZone("zone1");
    demarrerCombattantsZone("zone2");
}

function demarrerCombattantsZone(zone) {
    const combat = combatsZones[zone];

    if (!combat) {
        return;
    }

    combat.joueurs.forEach(combattant => {
        programmerAttaque(zone, combattant, "joueur");
    });

    combat.ennemis.forEach(combattant => {
        programmerAttaque(zone, combattant, "ennemi");
    });
}

function programmerAttaque(zone, combattant, camp) {
    const combat = combatsZones[zone];

    if (!combat || !combat.actif || combattant.pv <= 0) {
        return;
    }

    const delai = obtenirDelaiAttaque(combattant.vitesse);

    combattant.timer = setTimeout(() => {
        if (!combat.actif || combattant.pv <= 0) {
            return;
        }

        executerAttaqueAutomatique(zone, combattant, camp);

        if (combat.actif && combattant.pv > 0) {
            programmerAttaque(zone, combattant, camp);
        }
    }, delai);
}

function executerAttaqueAutomatique(zone, attaquant, camp) {
    const combat = combatsZones[zone];

    if (!combat || !combat.actif || attaquant.pv <= 0) {
        return;
    }

    const cibles =
        camp === "joueur"
            ? combat.ennemis
            : combat.joueurs;

    const ciblesVivantes =
        cibles.filter(cible => cible.pv > 0);

    if (ciblesVivantes.length === 0) {
        terminerCombatZone(zone);
        return;
    }

    let cible;

if(camp==="joueur"&&ennemiCombatCible&&ciblesVivantes.includes(ennemiCombatCible)){
    cible=ennemiCombatCible;
}else{
    cible=ciblesVivantes[Math.floor(Math.random()*ciblesVivantes.length)];
}

const degats =
    Math.max(1, attaquant.attaque - cible.defense);

cible.pv = Math.max(0, cible.pv - degats);

if (cible.personnage) {
    cible.personnage.pv = cible.pv;
    sauvegarderPartie();
}

if (camp === "joueur" && attaquant.personnage.slotlarme) {

    const larme = attaquant.personnage.slotlarme;

    attaquant.personnage.hpLarme = Math.min(
        100,
        attaquant.personnage.hpLarme + larme.prix
    );

    sauvegarderPartie();
}

    const nomAttaquant =
        camp === "joueur"
            ? attaquant.personnage.nom
            : attaquant.ennemi.nom;

    const nomCible =
        camp === "joueur"
            ? cible.ennemi.nom
            : cible.personnage.nom;

    ajouterMessageCombat(
        `${nomAttaquant} attaque ${nomCible} et lui inflige ${degats} dégâts.`
    );

    if (cible.pv <= 0) {
    ajouterMessageCombat(
        `${nomCible} est vaincu.`
    );

    if (camp === "joueur") {
        donnerXpPourEnnemiVaincu(zone, cible);
    }
}
    verifierFinCombatZone(zone);

    afficherCombat();
}