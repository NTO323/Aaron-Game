const capacitesPersonnages={
    Aaron:{
        nom:"Coup fatal",
        cooldown:10000
    }
};

function obtenirCapacitePersonnage(personnage){
    return capacitesPersonnages[personnage.nom]||null;
}

function capaciteDisponible(combattant){
    const capacite=obtenirCapacitePersonnage(combattant.personnage);

    if(!capacite)return false;

    return Date.now()-(combattant.capaciteDerniereUtilisation||0)>=capacite.cooldown;
}

function obtenirTempsCooldown(combattant){
    const capacite=obtenirCapacitePersonnage(combattant.personnage);

    if(!capacite)return 0;

    return Math.max(
        0,
        capacite.cooldown-(Date.now()-(combattant.capaciteDerniereUtilisation||0))
    );
}

function utiliserCapacite(combattant,zone){
    const combat=combatsZones[zone];

    if(!combat||!combat.actif||!combattant||combattant.pv<=0)return;

    const capacite=obtenirCapacitePersonnage(combattant.personnage);

    if(!capacite||!capaciteDisponible(combattant))return;

    const ciblesVivantes=combat.ennemis.filter(
        ennemi=>ennemi.pv>0
    );

    if(ciblesVivantes.length===0)return;

    let cible;

    if(
        ennemiCombatCible&&
        ciblesVivantes.includes(ennemiCombatCible)
    ){
        cible=ennemiCombatCible;
    }else{
        cible=ciblesVivantes[
            Math.floor(Math.random()*ciblesVivantes.length)
        ];
    }

    const degats=Math.max(
        1,
        Math.floor(combattant.attaque*1.5)-cible.defense
    );

    cible.pv=Math.max(0,cible.pv-degats);

    combattant.capaciteDerniereUtilisation=Date.now();

    ajouterMessageCombat(
        `${combattant.personnage.nom} utilise ${capacite.nom} sur ${cible.ennemi.nom} et lui inflige ${degats} dégâts.`
    );

    if(cible.pv<=0){
        ajouterMessageCombat(`${cible.ennemi.nom} est vaincu.`);
        donnerXpPourEnnemiVaincu(zone,cible);
    }

    verifierFinCombatZone(zone);
    afficherCombat();
}