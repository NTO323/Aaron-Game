const homeCharacterSlots = document.querySelectorAll(".home-character");

function afficherPersonnagesMaison() {

    homeCharacterSlots.forEach((slot, index) => {

        slot.innerHTML = "";

        slot.classList.remove(
            "has-relation-notification"
        );

        const personnage = equipe[index];

        if (!personnage) {

            slot.onclick = null;

            return;
        }

        const stats = personnage.getStats();

        const notifications =
            notificationsRelations.filter(
                relation =>
                    relation.personnage1 === personnage.nom ||
                    relation.personnage2 === personnage.nom
            );


        // ========================================
        // CONTENEUR
        // ========================================

        const personnageContainer =
            document.createElement("div");

        personnageContainer.classList.add(
            "home-character-content"
        );


        // ========================================
        // NIVEAU
        // ========================================

        const niveau =
            document.createElement("div");

        niveau.classList.add(
            "home-character-level"
        );

        niveau.textContent =
            `Niv. ${personnage.niveau}`;


        // ========================================
        // BARRE DE PV
        // ========================================

        const barrePV =
            document.createElement("div");

        barrePV.classList.add(
            "home-character-pv"
        );

        barrePV.innerHTML =
            afficherBarrePV(
                personnage.pv,
                stats.pv
            );


        // ========================================
        // IMAGE
        // ========================================

        const image =
            document.createElement("img");

        image.src =
            personnage.iconehome ||
            personnage.icone;

        image.alt =
            personnage.nom;


        // ========================================
        // NOTIFICATION NIVEAU
        // ========================================

        if (
            personnage.niveauUpDisponible ||
            personnage.xp >= 100
        ) {

            image.classList.add(
                "level-up-notification"
            );

            slot.onclick = () => {

                appliquerNiveauPersonnage(
                    personnage
                );

            };


        // ========================================
        // NOTIFICATION RELATION
        // ========================================

        } else if (notifications.length > 0) {

            const coeur =
                document.createElement("img");

            coeur.src =
                "IMG/coeur.png";

            coeur.classList.add(
                "relation-notification-heart"
            );

            coeur.alt =
                "Relation disponible";

            slot.appendChild(coeur);

            slot.classList.add(
                "has-relation-notification"
            );

            slot.onclick = () => {

                appliquerRelation(
                    notifications[0]
                );

            };


        } else {

            slot.onclick = null;

        }


        // ========================================
        // ORDRE
        // ========================================

        personnageContainer.appendChild(
            niveau
        );

        personnageContainer.appendChild(
            barrePV
        );

        personnageContainer.appendChild(
            image
        );

        slot.appendChild(
            personnageContainer
        );

    });

}

afficherPersonnagesMaison();