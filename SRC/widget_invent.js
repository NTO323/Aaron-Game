function afficherObjets() {
    objectsList.innerHTML = "";

    inventaireObjets.forEach(item => {
        if (item.quantite <= 0) return;

        const objet = item.objet;
        const objetElement = document.createElement("div");
        objetElement.classList.add("object-card");

        objetElement.innerHTML = `
            <div class="box-item ${objetSelectionne === objet ? "box-item-selected" : ""}">
                <img src="${objet.icone}" alt="${objet.nom}">
                <span>x${item.quantite}</span>
            </div>
        `;

        objetElement.addEventListener("click", () => {
            selectionnerObjet(objet);
        });

        objectsList.appendChild(objetElement);
    });

    afficherBioObjet();
}
function afficherBioObjet() {
    if (!objetSelectionne) {
        objectsBio.innerHTML = `
            <h3>Choisis un objet</h3>
            <p>Clique sur un objet pour voir à quoi il sert.</p>
        `;
        return;
    }
    objectsBio.innerHTML = `
        <div class="content-item-bio-title">
            <img src="${objetSelectionne.icone}" alt="${objetSelectionne.nom}">
            <h3>${objetSelectionne.nom}</h3>
        </div>
        <p>${objetSelectionne.bio}</p>
    `;
}

function selectionnerObjet(objet) {
    objetSelectionne = objet;
    afficherObjets();
}

function gererObjetPersonnage(personnage) {
    if (objetSelectionne) {
        const nouvelObjet = objetSelectionne;
        const item = inventaireObjets.find(item => item.objet === nouvelObjet);
        if (!item || item.quantite <= 0) return;

        const ancienPvMax = personnage.getStats().pv;
        if (personnage.slotobjet) ajouterObjetInventaire(personnage.slotobjet);

        retirerObjetInventaire(nouvelObjet);
        personnage.slotobjet = nouvelObjet;

        const nouveauPvMax = personnage.getStats().pv;
        personnage.pv = Math.min(nouveauPvMax, personnage.pv + (nouveauPvMax - ancienPvMax));

        objetSelectionne = null;
        sauvegarderPartie();
        afficherObjets();
        afficherEquipeInventaire();
        afficherDetailsPersonnage();
        return;
    }

    if (personnage.slotobjet) {
        const ancienPvMax = personnage.getStats().pv;
        ajouterObjetInventaire(personnage.slotobjet);
        personnage.slotobjet = null;

        const nouveauPvMax = personnage.getStats().pv;
        personnage.pv = Math.min(nouveauPvMax, Math.max(0, personnage.pv - (ancienPvMax - nouveauPvMax)));

        sauvegarderPartie();
        afficherObjets();
        afficherEquipeInventaire();
        afficherDetailsPersonnage();
    }
}

function afficherEquipeInventaire() {
    inventoryTeam.innerHTML = "";
    equipe.forEach(personnage => {
        const stats = personnage.getStats();
        let classePv = "";

        if (personnage.pv < stats.pv) {
            classePv = "stat-damaged";
        } else if (stats.pv > personnage.pvMax) {
            classePv = "stat-boosted";
        }

        const personnageElement = document.createElement("div");
        personnageElement.classList.add("inventory-character");
        personnageElement.innerHTML = `
            <div class="pre-content-objets">
                <img src="${personnage.icone}" alt="${personnage.nom}">
                <div class="content-objet">
                    <p>${personnage.nom}</p>
                    <p class="${classePv}">PV : ${personnage.pv} / ${stats.pv}</p>
                    ${afficherBarrePV(personnage.pv, stats.pv)}
                </div>
            </div>
            <div class="objet-equipe">
    ${personnage.slotobjet ? `<img src="${personnage.slotobjet.icone}" alt="${personnage.slotobjet.nom}">` : "<p>Aucun objet</p>"}
</div>
            <div class="statzone-right">
                <p class="${stats.attaque > personnage.attaque ? "stat-boosted" : ""}">ATT : ${stats.attaque}</p>
                <p class="${stats.defense > personnage.defense ? "stat-boosted" : ""}">DEF : ${stats.defense}</p>
                <p class="${stats.vitesse > personnage.vitesse ? "stat-boosted" : ""}">VIT : ${stats.vitesse}</p>
            </div>
        `;
        personnageElement.addEventListener("click", () => {
            gererObjetPersonnage(personnage);
        });
        inventoryTeam.appendChild(personnageElement);
    });
}
function retirerObjetInventaire(objet) {
    const item = inventaireObjets.find(item => item.objet === objet);
    if (!item) return;

    item.quantite--;

    if (item.quantite <= 0) {
        inventaireObjets = inventaireObjets.filter(element => element !== item);
    }
}

function ajouterObjetInventaire(objet) {
    const item = inventaireObjets.find(item => item.objet === objet);

    if (item) {
        item.quantite++;
    } else {
        inventaireObjets.push({
            objet: objet,
            quantite: 1
        });
    }
}

