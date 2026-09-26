const dialoguesPersonnages={
    Aaron:[
        "On va leur montrer de quoi on est capables.",
        "Restez concentrés, ça va chauffer.",
        "Je sens que ce combat va être intéressant."
    ],
    Poly:[
        "J'espère qu'on va s'en sortir sans trop de dégâts.",
        "Allez, on peut le faire !",
        "Je vais essayer de vous couvrir."
    ],
    Colin:[
        "Ils ne vont pas faire long feu.",
        "Bon, finissons-en rapidement.",
        "Je suis prêt, qu'ils viennent."
    ],
    "Rose Marie":[
        "Ne baissez pas votre garde.",
        "Nous devons rester soudés.",
        "Tout le monde est prêt ? Alors allons-y."
    ]
};

const dialoguesZones={};
let dialogueAnimationTimer=null;
let dialogueAnimationId=0;
let dialogueTexteEnCours=false;
let dialogueZoneActive=null;

const vitesseDialogue=35;

function obtenirPersonnagesDialogue(){
    if(zoneAffichee==="pierres")return repartitionEquipe.pierres||[];

    const combat=combatsZones[zoneAffichee];
    if(!combat)return [];

    return combat.joueurs.map(joueur=>joueur.personnage);
}

function choisirDialogue(){
    const personnages=obtenirPersonnagesDialogue();
    if(!personnages.length)return null;

    const disponibles=personnages.filter(personnage=>dialoguesPersonnages[personnage.nom]);
    if(!disponibles.length)return null;

    const personnage=disponibles[Math.floor(Math.random()*disponibles.length)];
    const dialogues=dialoguesPersonnages[personnage.nom];

    return{
        personnage,
        texte:dialogues[Math.floor(Math.random()*dialogues.length)]
    };
}

function obtenirConteneurDialogueCombat(){
    const numero={
        zone1:1,
        zone2:2,
        pierres:3
    }[zoneAffichee];

    if(!numero)return null;

    return document.getElementById(`dialogue-combat-${numero}`);
}

function arreterAnimationDialogue(){
    dialogueAnimationId++;

    if(dialogueAnimationTimer!==null){
        clearTimeout(dialogueAnimationTimer);
        dialogueAnimationTimer=null;
    }

    dialogueTexteEnCours=false;
}

function afficherDialogueCombat(){
    const zone=zoneAffichee;
    const container=obtenirConteneurDialogueCombat();

    if(!container)return;

    if(!dialoguesZones[zone]){
        const dialogue=choisirDialogue();
        if(!dialogue)return;

        dialoguesZones[zone]={
            dialogue,
            index:0,
            termine:false
        };
    }

    const sauvegarde=dialoguesZones[zone];

    container.innerHTML=`
        <div class="dialogue-personnage">
            <img src="${sauvegarde.dialogue.personnage.iconefull||""}" alt="${sauvegarde.dialogue.personnage.nom}">
            <div class="dialogue-texte">${sauvegarde.dialogue.texte.substring(0,sauvegarde.index)}</div>
        </div>
    `;

    const texteElement=container.querySelector(".dialogue-texte");

    if(!texteElement)return;

    if(sauvegarde.termine){
        texteElement.textContent=sauvegarde.dialogue.texte;
        return;
    }

    if(dialogueTexteEnCours&&dialogueZoneActive===zone)return;

    dialogueZoneActive=zone;
    dialogueTexteEnCours=true;

    const animationId=++dialogueAnimationId;

    function afficherCaractere(){
        if(animationId!==dialogueAnimationId)return;
        if(zone!==zoneAffichee)return;
        if(dialogueZoneActive!==zone)return;

        const element=document.getElementById(
            `dialogue-combat-${zone==="zone1"?1:zone==="zone2"?2:3}`
        );

        if(!element)return;

        const texte=element.querySelector(".dialogue-texte");

        if(!texte)return;

        if(sauvegarde.index>=sauvegarde.dialogue.texte.length){
            dialogueTexteEnCours=false;
            dialogueAnimationTimer=null;
            sauvegarde.termine=true;
            return;
        }

        texte.textContent+=sauvegarde.dialogue.texte[sauvegarde.index];
        sauvegarde.index++;

        dialogueAnimationTimer=setTimeout(
            afficherCaractere,
            vitesseDialogue
        );
    }

    afficherCaractere();
}

function dialogueCombatSuivant(){
    arreterAnimationDialogue();

    const zone=zoneAffichee;
    const nouveauDialogue=choisirDialogue();

    if(!nouveauDialogue)return;

    dialoguesZones[zone]={
        dialogue:nouveauDialogue,
        index:0,
        termine:false
    };

    afficherDialogueCombat();
}

function clicDialogueCombat(){
    const zone=zoneAffichee;
    const sauvegarde=dialoguesZones[zone];

    if(!sauvegarde)return;

    const container=obtenirConteneurDialogueCombat();
    if(!container)return;

    const texteElement=container.querySelector(".dialogue-texte");
    if(!texteElement)return;

    if(dialogueTexteEnCours){
        arreterAnimationDialogue();

        texteElement.textContent=sauvegarde.dialogue.texte;
        sauvegarde.index=sauvegarde.dialogue.texte.length;
        sauvegarde.termine=true;

        return;
    }

    if(sauvegarde.termine){
        dialogueCombatSuivant();
    }
}

function initialiserDialogueCombat(){
    const container=obtenirConteneurDialogueCombat();
    if(!container)return;

    container.onclick=clicDialogueCombat;
    afficherDialogueCombat();
}

function changerZoneDialogue(nouvelleZone){
    arreterAnimationDialogue();

    dialogueZoneActive=null;
    zoneAffichee=nouvelleZone;
    ennemiCombatCible=null;

    afficherCombat();
}

function arreterDialogueCombat(){
    arreterAnimationDialogue();
    dialogueZoneActive=null;
}