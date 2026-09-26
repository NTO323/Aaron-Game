
function afficherPersonnages() {
    equipe = [...new Set(equipe)].filter(Boolean).slice(0, MAX_EQUIPE);
    afficherEquipePersonnages();
    afficherListePersonnages();
    afficherDetailsPersonnage();
    teamCounter.textContent = `Équipe : ${equipe.length} / ${MAX_EQUIPE}`;
}

function afficherEquipePersonnages() {
    charactersTeam.innerHTML = "";
    for (let i = 0; i < MAX_EQUIPE; i++) {
        const slot = document.createElement("div");
        slot.classList.add("team-slot");
        const personnage = equipe[i];

        if (personnage) {
            slot.innerHTML = `
                <img src="${personnage.icone}" alt="${personnage.nom}">
                <button class="remove-team-character">×</button>
            `;

            if (personnage === personnageSelectionne) {
                slot.classList.add("selected");
            }

            slot.addEventListener("click", event => {
                if (event.target.closest(".remove-team-character")) return;

                if (personnageSelectionne && !equipe.includes(personnageSelectionne)) {
                    placerPersonnage(i);
                    return;
                }

                personnageSelectionne = personnage;
                afficherPersonnages();
            });

            const removeButton = slot.querySelector(".remove-team-character");

            removeButton.addEventListener("click", event => {
                event.stopPropagation();
                retirerPersonnage(i);
            });
        } else {
            slot.innerHTML = `<span class="team-slot-empty">+</span>`;

            slot.addEventListener("click", () => {
                if (!personnageSelectionne || equipe.includes(personnageSelectionne)) return;
                placerPersonnage(i);
            });
        }

        charactersTeam.appendChild(slot);
    }
}

function afficherListePersonnages() {
    charactersList.innerHTML = "";

    personnages.forEach(personnage => {
        if (equipe.includes(personnage)) return;

        const personnageElement = document.createElement("div");
        personnageElement.classList.add("character-card");

        if (personnage === personnageSelectionne) {
            personnageElement.classList.add("selected");
        }

        personnageElement.innerHTML = `
            <img src="${personnage.icone}" alt="${personnage.nom}">
            <div class="info-chara-box">
                <p>${personnage.nom}</p>
                <p class="character-level">Lvl ${personnage.niveau}</p>
            </div>
        `;

        personnageElement.addEventListener("click", () => {
            personnageSelectionne = personnage;
            afficherPersonnages();
        });

        charactersList.appendChild(personnageElement);
    });
}

function placerPersonnage(index) {
    if (!personnageSelectionne || equipe.includes(personnageSelectionne)) return;

    equipe[index] = personnageSelectionne;
    personnageSelectionne = null;

    sauvegarderPartie();
    afficherPersonnages();
    afficherPersonnagesMaison();
}

function retirerPersonnage(index) {
    if (!equipe[index]) return;

    equipe.splice(index, 1);
    personnageSelectionne = null;

    sauvegarderPartie();
    afficherPersonnages();
    afficherPersonnagesMaison();
}

function afficherDetailsPersonnage() {
    if (!personnageSelectionne) {
        characterDetailName.textContent = "Choisis un personnage";
        characterDetailIcon.src = "";
        characterDetailIcon.alt = "";
        characterDetailLevel.textContent = "-";
        characterDetailPv.textContent = "-";
        document.getElementById("character-detail-attack").textContent = "-";
        document.getElementById("character-detail-defense").textContent = "-";
        document.getElementById("character-detail-speed").textContent = "-";
        characterDetailBio.textContent = "Clique sur un personnage pour voir ses informations.";
        return;
    }

    const personnage = personnageSelectionne;
    const stats = personnage.getStats();

    characterDetailName.textContent = personnage.nom;
    characterDetailIcon.src = personnage.iconehome || personnage.icone;
    characterDetailIcon.alt = personnage.nom;
    characterDetailLevel.textContent = personnage.niveau;
    characterDetailPv.textContent = `${personnage.pv} / ${stats.pv}`;

    const attackElement = document.getElementById("character-detail-attack");
    const defenseElement = document.getElementById("character-detail-defense");
    const speedElement = document.getElementById("character-detail-speed");

    attackElement.textContent = stats.attaque;
    defenseElement.textContent = stats.defense;
    speedElement.textContent = stats.vitesse;

    attackElement.classList.toggle("stat-boosted", stats.attaque > personnage.attaque);
    defenseElement.classList.toggle("stat-boosted", stats.defense > personnage.defense);
    speedElement.classList.toggle("stat-boosted", stats.vitesse > personnage.vitesse);
characterDetailPv.classList.remove("stat-boosted", "stat-damaged");

if (personnage.pv < stats.pv) {
    characterDetailPv.classList.add("stat-damaged");
} else if (stats.pv > personnage.pvMax) {
    characterDetailPv.classList.add("stat-boosted");
}

    characterDetailBio.textContent = personnage.bio;
}

function gererEquipe(personnage) {
    const index = equipe.indexOf(personnage);

    if (index !== -1) {
        equipe.splice(index, 1);
    } else {
        if (equipe.length >= MAX_EQUIPE) {
            alert("Ton équipe est déjà complète !");
            return;
        }

        equipe.push(personnage);
    }

    sauvegarderPartie();
    afficherPersonnages();
}

widgets.forEach(widget => {
    const closeButton = widget.querySelector(".close-widget");

    if (closeButton) {
        closeButton.addEventListener("click", closeWidget);
    }
});
