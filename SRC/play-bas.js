let combattantCombatSelectionne=null;
function afficherCombatBas(){
    const dialogue={
        zone1:1,
        zone2:2,
        pierres:3
    }[zoneAffichee];

    const contenuBas=zoneAffichee==="pierres"
        ?`
            <div id="combat-bas-pierre1"></div>
            <div id="combat-bas-pierre2"></div>
        `
        :`
            <div id="combat-bas-zone1">
                <div id="personnages-combat-bas">
                    ${combatsZones[zoneAffichee].joueurs.map((joueur,index)=>`
                        <div class="personnage-combat-bas ${combattantCombatSelectionne===joueur?"personnage-combat-selectionne":""} ${joueur.modeCombat==="offensif"?"mode-offensif":""} ${joueur.modeCombat==="defensif"?"mode-defensif":""}" data-index="${index}">
                            <img src="${joueur.personnage.icone||""}">
                            <span>PV : ${Math.max(0,joueur.pv)} / ${joueur.pvMax}</span>
                        </div>
                    `).join("")}
                </div>
            </div>
            <div id="combat-bas-zone2">
                <button class="bouton-combat offensif" id="bouton-offensif">OFFENSIF</button>
                <button class="bouton-combat defensif" id="bouton-defensif">DÉFENSIF</button>
                <button class="bouton-combat objets" id="bouton-objets">OBJETS</button>
            </div>
        `;

    return `
        <div id="dialogue-combat-${dialogue}"></div>
        <div id="combat-bas">
            ${contenuBas}
        </div>
    `;
}

