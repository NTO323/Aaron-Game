

function verifierFinCombatZone(zone) {
    const combat = combatsZones[zone];

    if (!combat || !combat.actif) {
        return;
    }

    const joueursVivants =
        combat.joueurs.some(joueur => joueur.pv > 0);

    const ennemisVivants =
        combat.ennemis.some(ennemi => ennemi.pv > 0);

    if (!joueursVivants || !ennemisVivants) {
        terminerCombatZone(zone);
    }
}

function terminerCombatZone(zone) {
    const combat = combatsZones[zone];

    if (!combat || !combat.actif) {
        return;
    }

    console.log("FIN DE LA ZONE :", zone);

    combat.actif = false;

    // Arrêter tous les timers de cette zone
    [...combat.joueurs, ...combat.ennemis].forEach(combattant => {
        if (combattant.timer) {
            clearTimeout(combattant.timer);
            combattant.timer = null;
        }
    });

    const joueursVivants =
        combat.joueurs.some(joueur => joueur.pv > 0);

    const ennemisVivants =
        combat.ennemis.some(ennemi => ennemi.pv > 0);

    if (joueursVivants && !ennemisVivants) {
        ajouterMessageCombat(
            `${zone.toUpperCase()} : victoire !`
        );
    } else if (!joueursVivants && ennemisVivants) {
        ajouterMessageCombat(
            `${zone.toUpperCase()} : défaite !`
        );
    } else {
        ajouterMessageCombat(
            `${zone.toUpperCase()} : combat terminé !`
        );
    }

    console.log(
        "ZONE 1 active :",
        combatsZones.zone1?.actif
    );

    console.log(
        "ZONE 2 active :",
        combatsZones.zone2?.actif
    );

    // Les deux combats sont terminés
if(toutesLesZonesSontTerminees()){
    console.log("LES DEUX ZONES SONT TERMINÉES");

    if(typeof terminerExpeditionPierres==="function"){
        terminerExpeditionPierres();
    }

    afficherFinCombat();
    return;
}

    // Une seule zone est terminée,
    // l'autre continue
    afficherCombat();
}

function donnerXpPourEnnemiVaincu(zone, ennemi) {
    const combat = combatsZones[zone];

    if (!combat || !ennemi || ennemi.xpDistribuee) {
        return;
    }

    ennemi.xpDistribuee = true;

    const gainXp = ennemi.ennemi.gainXp || 0;

    if (gainXp <= 0) {
        return;
    }

    combat.joueurs.forEach(joueur => {

        joueur.personnage.xp = Math.min(
            100,
            joueur.personnage.xp + gainXp
        );

        joueur.xpGagnee =
            (joueur.xpGagnee || 0) + gainXp;
    });

    ajouterMessageCombat(
        `Chaque héros de ${zone.toUpperCase()} gagne ${gainXp} XP.`
    );
}

function ajouterMessageCombat(message) {
    journalCombat.unshift(message);

    if (journalCombat.length > 5) {
        journalCombat.pop();
    }
}

function toutesLesZonesSontTerminees() {

    if (!combatsZones.zone1) {
        return false;
    }

    if (!combatsZones.zone2) {
        return false;
    }

    return (
        combatsZones.zone1.actif === false &&
        combatsZones.zone2.actif === false
    );
}
function afficherFinCombat() {
    if (ecranFinCombatAffiche) return;

    ecranFinCombatAffiche = true;

    const resultatRang = gagnerPointsRang(adversaireSelectionne.rang);
    afficherRang();

    const combatContainer = document.getElementById("combat");

    if (!combatContainer) {
        console.error("ERREUR : #combat introuvable");
        return;
    }

    const zone1 = combatsZones.zone1;
    const zone2 = combatsZones.zone2;

    combatContainer.style.display = "flex";

    combatContainer.innerHTML = `
        <div id="fin-combat">
            <h2>COMBAT TERMINÉ</h2>

            <div class="fin-combat-rang">
                <p>POINTS DE RANG</p>
                <strong>+${resultatRang.pointsGagnes}</strong>
                <p>RANG ${resultatRang.ancienRang} → ${resultatRang.nouveauRang}</p>
            </div>

            <div class="fin-combat-zone">
                <h3>ZONE 1</h3>
                ${afficherResumeXP(zone1.joueurs)}
            </div>

            <div class="fin-combat-zone">
                <h3>ZONE 2</h3>
                ${afficherResumeXP(zone2.joueurs)}
            </div>

            <button id="retour-principal">RETOURNER</button>
        </div>
    `;

    const boutonRetour = document.getElementById("retour-principal");

    if (!boutonRetour) {
        console.error("ERREUR : bouton retour introuvable");
        return;
    }

    boutonRetour.addEventListener("click", () => {
        retournerPagePrincipale();
    });
}
function afficherResumeXP(joueurs) {

    if (!joueurs || joueurs.length === 0) {
        return `<p>Aucun héros dans cette zone.</p>`;
    }

    return joueurs.map(joueur => {

        const xp = joueur.xpGagnee || 0;

        return `
            <p>
                <strong>${joueur.personnage.nom}</strong>
                : +${xp} XP
            </p>
        `;

    }).join("");
}
function retournerPagePrincipale(){


    Object.values(combatsZones).forEach(combat=>{
        if(!combat)return;

        combat.joueurs.forEach(joueur=>{
            joueur.personnage.pv=joueur.pv;
        });
    });

    sauvegarderPartie();

    const combatContainer=document.getElementById("combat");

    if(combatContainer){
        combatContainer.style.display="none";
        combatContainer.innerHTML="";
    }

    mainPage.style.display="flex";

    widgets.forEach(widget=>{
        widget.style.display="none";
    });

    combatsZones={
        zone1:null,
        zone2:null
    };

    repartitionEquipe={
        zone1:[],
        zone2:[],
        pierres:[]
    };

    personnageCombatSelectionne=null;
    journalCombat=[];
    ecranFinCombatAffiche=false;

    if(typeof afficherPersonnagesMaison==="function"){
        afficherPersonnagesMaison();
    }

    if(typeof afficherPersonnages==="function"){
        afficherPersonnages();
    }
}