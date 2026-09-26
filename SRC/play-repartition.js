
function afficherRepartition(equipeEnnemie){
    document.querySelectorAll("section").forEach(section=>{
        section.style.display="none";
    });
    const combat=document.getElementById("combat");
    combat.style.display="flex";
    repartitionEquipe={
        zone1:[...equipe],
        zone2:[],
        pierres:[]
    };
    combat.innerHTML=`
        <div id="repartition-combat">
            <h2>RÉPARTITION</h2>
            <div id="repartition-personnages"></div>
            <div id="repartition-zones">
                <button class="zone-repartition" data-zone="zone1">
                    <span>ZONE 1</span>
                    <div class="zone-personnages" id="zone1-personnages"></div>
                </button>
                <button class="zone-repartition" data-zone="zone2">
                    <span>ZONE 2</span>
                    <div class="zone-personnages" id="zone2-personnages"></div>
                </button>
                <button class="zone-repartition" data-zone="pierres">
                    <span>PIERRES</span>
                    <div class="zone-personnages" id="pierres-personnages"></div>
                </button>
            </div>
            <p id="repartition-message">Sélectionne un héros puis une zone.</p>
            <button id="combat-start-button" disabled>COMBATTRE</button>
        </div>
    `;
    afficherPersonnagesRepartition();
    document.querySelectorAll(".zone-repartition").forEach(zone=>{
        zone.addEventListener("click",()=>{
            if(!personnageCombatSelectionne)return;
            placerPersonnageDansZone(personnageCombatSelectionne,zone.dataset.zone);
        });
    });
    document.getElementById("combat-start-button").addEventListener("click",()=>{
        lancerCombatApresRepartition(equipeEnnemie);
    });
}

function afficherPersonnagesRepartition(){
    const container=document.getElementById("repartition-personnages");
    container.innerHTML="";
    equipe.forEach(personnage=>{
        const element=document.createElement("div");
        element.className="personnage-repartition";
        if(personnage===personnageCombatSelectionne){
            element.classList.add("personnage-repartition-selectionne");
        }
        element.innerHTML=`
            <img src="${personnage.icone||""}">
            <span>${personnage.nom}</span>
        `;
        element.addEventListener("click",event=>{
            event.stopPropagation();
            personnageCombatSelectionne=personnage;
            afficherPersonnagesRepartition();
            afficherZonesRepartition();
        });
        container.appendChild(element);
    });
    afficherZonesRepartition();
}

function afficherZonesRepartition(){
    ["zone1","zone2","pierres"].forEach(zone=>{
        const container=document.getElementById(`${zone}-personnages`);
        if(!container)return;
        container.innerHTML="";
        repartitionEquipe[zone].forEach(personnage=>{
            const element=document.createElement("div");
            element.className="personnage-zone";
            element.innerHTML=`
                <img src="${personnage.icone||""}">
                <span>${personnage.nom}</span>
            `;
            container.appendChild(element);
        });
    });
    const boutonCombat=document.getElementById("combat-start-button");
    if(boutonCombat){
        boutonCombat.disabled=
            repartitionEquipe.zone1.length===0||
            repartitionEquipe.zone2.length===0;
    }
}

function placerPersonnageDansZone(personnage,zone){
    retirerPersonnageDesZones(personnage);
    repartitionEquipe[zone].push(personnage);
    personnageCombatSelectionne=null;
    afficherPersonnagesRepartition();
    const message=document.getElementById("repartition-message");
    if(message){
        message.textContent=`${personnage.nom} est placé dans ${zone.toUpperCase()}.`;
    }
}

function retirerPersonnageDesZones(personnage){
    ["zone1","zone2","pierres"].forEach(zone=>{
        repartitionEquipe[zone]=
            repartitionEquipe[zone].filter(p=>p!==personnage);
    });
}

function lancerCombatApresRepartition(equipeEnnemie){
    const joueursZone1=repartitionEquipe.zone1.map(creerCombattantCombat);
    const joueursZone2=repartitionEquipe.zone2.map(creerCombattantCombat);
    const ennemisZone1=equipeEnnemie.map(creerEnnemiCombat);
    const ennemisZone2=equipeEnnemie.map(creerEnnemiCombat);
    combatsZones={
        zone1:{
            joueurs:joueursZone1,
            ennemis:ennemisZone1,
            actif:true
        },
        zone2:{
            joueurs:joueursZone2,
            ennemis:ennemisZone2,
            actif:true
        }
    };
    equipeCombatJoueur=joueursZone1;
    equipeCombatEnnemie=ennemisZone1;
    zoneAffichee="zone1";
    journalCombat=[];
    ecranFinCombatAffiche=false;
    const ameliorationsRelations=verifierRelationsCombat(joueursZone1,joueursZone2);
    ameliorationsRelations.forEach(relation=>{
        ajouterMessageCombat(
            `❤️ ${relation.personnage1} et ${relation.personnage2} ont amélioré leur relation !`
        );
    });
    afficherCombat();
    demarrerCombatsAutomatiques();
    lancerDialogueCombat();
}

