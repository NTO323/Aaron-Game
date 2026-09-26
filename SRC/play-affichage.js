function afficherCombat() {
    if (ecranFinCombatAffiche) return;

    const combatContainer = document.getElementById("combat");
    if (!combatContainer) return;

    let contenuPrincipal = "";

    if (zoneAffichee === "zone1" || zoneAffichee === "zone2") {
        const combat = combatsZones[zoneAffichee];

        if (!combat) return;

        equipeCombatJoueur = combat.joueurs;
        equipeCombatEnnemie = combat.ennemis;

        contenuPrincipal = `
            <div id="zone-combat-principale">
            <div id="equipe-ennemie">
                    ${combat.ennemis.map(combattant => `
                        <div class="combattant ${ennemiCombatCible===combattant?"ennemi-cible":""}" data-ennemi-index="${combat.ennemis.indexOf(combattant)}">
                            ${afficherBarrePV(combattant.pv, combattant.pvMax)}
                        <img src="${combattant.ennemi.icone || ""}">
                            </div>
                    `).join("")}
                </div>
                <div id="equipe-joueur">
                    ${combat.joueurs.map(combattant => `
                        <div class="combattant">
                        ${afficherBarrePV(combattant.pv, combattant.pvMax)}
                            <img src="${combattant.personnage.iconehome || ""}">
                            </div>
                    `).join("")}
                </div>

                
            </div>
        `;
     } else if (zoneAffichee === "pierres") {
    const personnagesPierres = repartitionEquipe.pierres || [];

    contenuPrincipal = `
        <div id="pierres-interface">
            <h2>PIERRES</h2>

            <div id="pierres-personnages-liste">
                ${personnagesPierres.length > 0
                    ? personnagesPierres.map(personnage => `
                        <div class="pierres-personnage">
                            <img src="${personnage.icone || ""}">
                            <span>${personnage.nom}</span>
                            <small>VIT : ${personnage.getStats().vitesse}</small>
                        </div>
                    `).join("")
                    : "<p>Aucun personnage.</p>"
                }
            </div>

            <div id="expedition-pierres">
                ${expeditionPierres.enCours
    ? `
        <h3>EXPÉDITION EN COURS</h3>

        <div id="expedition-temps">
            ${expeditionPierres.enPause
                ? "ACTION REQUISE !"
                : "Prochaine récolte..."
            }
        </div>

        ${expeditionPierres.enPause
            ? `
                <div id="expedition-action">
                    <button id="reprendre-expedition">
                        REPRENDRE
                    </button>
                </div>
            `
            : ""
        }
    `
                    : `
                        <h3>EXPÉDITION</h3>
                        <p>Envoie tes personnages chercher des aliments.</p>

                        <button id="expedition-start-button">
                            LANCER L'EXPÉDITION
                        </button>

                        ${expeditionPierres.resultats && expeditionPierres.resultats.length > 0
                            ? `
                                <h3>DERNIER BUTIN</h3>

                                <div id="expedition-resultats">
                                    ${expeditionPierres.resultats.map(item => `
                                        <div class="expedition-aliment">
                                            <img src="${item.aliment.icone}" alt="${item.aliment.nom}">
                                            <span>${item.aliment.nom} x${item.quantite}</span>
                                        </div>
                                    `).join("")}
                                </div>
                            `
                            : ""
                        }
                    `
                }
            </div>
        </div>
    `;
}

    combatContainer.innerHTML = `
        <div id="combat-interface">
            <div id="zones-navigation">
                <button class="minimap-zone ${zoneAffichee === "zone1" ? "zone-active" : ""}" data-zone="zone1">
                    <strong>ZONE 1</strong>
                    <div class="minimap-personnages">${afficherMiniPersonnages("zone1")}</div>
                </button>

                <button class="minimap-zone ${zoneAffichee === "zone2" ? "zone-active" : ""}" data-zone="zone2">
                    <strong>ZONE 2</strong>
                    <div class="minimap-personnages">${afficherMiniPersonnages("zone2")}</div>
                </button>

                <button class="minimap-zone ${zoneAffichee === "pierres" ? "zone-active" : ""} ${expeditionPierres.enPause ? "expedition-attention" : ""}" data-zone="pierres">
    <strong>PIERRES</strong>
    <div class="minimap-personnages">${afficherMiniPersonnages("pierres")}</div>
</button>
            </div>

            ${contenuPrincipal}
            ${afficherCombatBas()}
        </div>
    `;    initialiserDialogueCombat();
if(zoneAffichee==="zone1"||zoneAffichee==="zone2"){
    document.querySelectorAll(".personnage-combat-bas").forEach(casePersonnage=>{
        casePersonnage.addEventListener("click",()=>{
            const index=Number(casePersonnage.dataset.index);
            const combattant=combatsZones[zoneAffichee].joueurs[index];

            if(combattant.modeCombat){
                combattant.attaque=combattant.attaqueBase;
                combattant.defense=combattant.defenseBase;
                combattant.modeCombat=null;
            }

            combattantCombatSelectionne=combattant;
            afficherCombat();
        });
    });

    document.querySelectorAll("[data-ennemi-index]").forEach(caseEnnemi=>{
        caseEnnemi.addEventListener("click",()=>{
            const index=Number(caseEnnemi.dataset.ennemiIndex);
            const ennemi=combatsZones[zoneAffichee].ennemis[index];

            if(ennemiCombatCible===ennemi){
                ennemiCombatCible=null;
            }else{
                ennemiCombatCible=ennemi;
            }

            afficherCombat();
        });
    });

    document.getElementById("bouton-offensif").addEventListener("click",()=>{
        if(!combattantCombatSelectionne)return;
        appliquerModeCombat(combattantCombatSelectionne,"offensif");
        afficherCombat();
    });

    document.getElementById("bouton-defensif").addEventListener("click",()=>{
        if(!combattantCombatSelectionne)return;
        appliquerModeCombat(combattantCombatSelectionne,"defensif");
        afficherCombat();
    });

    document.getElementById("bouton-objets").addEventListener("click",()=>{
        if(!combattantCombatSelectionne)return;

        const alimentsDisponibles=inventaireAliments.filter(item=>item.quantite>0);

        if(alimentsDisponibles.length===0)return;

        const item=alimentsDisponibles[
            Math.floor(Math.random()*alimentsDisponibles.length)
        ];

        item.quantite--;

        combattantCombatSelectionne.pv=Math.min(
            combattantCombatSelectionne.pvMax,
            combattantCombatSelectionne.pv+2
        );

        afficherCombat();
    });
}

document.querySelectorAll(".minimap-zone").forEach(bouton=>{
    bouton.addEventListener("click",()=>{
        changerZoneDialogue(bouton.dataset.zone);
    });
});

    const boutonExpedition = document.getElementById("expedition-start-button");

    if (boutonExpedition) {
        boutonExpedition.addEventListener("click", lancerExpeditionPierres);
    }
    const boutonReprendre = document.getElementById("reprendre-expedition");

if (boutonReprendre) {
    boutonReprendre.addEventListener("click", reprendreExpedition);
}

    if (zoneAffichee === "pierres" && expeditionPierres.enCours) {
        mettreAJourTempsExpedition();
    }
}

function afficherCombattantsJoueurs(joueurs) {
    return joueurs.map(joueur => `
        <div class="combattant ${joueur.pv <= 0 ? "combattant-mort" : ""}">
            <img src="${joueur.personnage.icone || ""}">
            <p>PV : ${joueur.pv} / ${joueur.pvMax}</p>
        </div>
    `).join("");
}

function afficherCombattantsEnnemis(ennemis) {
    return ennemis.map(ennemi => `
        <div class="combattant ${ennemi.pv <= 0 ? "combattant-mort" : ""}">
            <img src="${ennemi.ennemi.icone || ""}">
            <p>PV : ${ennemi.pv} / ${ennemi.pvMax}</p>
        </div>
    `).join("");
}

function afficherMiniPersonnages(zone) {
    let personnages = [];

    if (zone === "pierres") {
        personnages = repartitionEquipe.pierres;
    } else {
        const combat = combatsZones[zone];

        if (combat) {
            personnages = combat.joueurs
                .filter(joueur => joueur.pv > 0)
                .map(joueur => joueur.personnage);
        } else {
            personnages = repartitionEquipe[zone];
        }
    }

    return personnages.map(personnage => `
        <img src="${personnage.icone || ""}">
    `).join("");
}

