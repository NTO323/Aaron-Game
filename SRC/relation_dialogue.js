let dialogueRelationActuel = null;


// ========================================
// OBTENIR LE DIALOGUE
// ========================================

function obtenirDialogueRelation(nom1, nom2) {

    const cle = cleRelation(nom1, nom2);

    return dialoguesRelations[cle] || null;

}


// ========================================
// AFFICHER LE DIALOGUE
// ========================================

function afficherDialogueRelation(
    notification,
    recompense
) {

    const niveau =
        niveauxRelations[
            notification.personnage1
        ]?.[
            notification.personnage2
        ] || 0;

    const dialogues =
        dialoguesRelations[
            cleRelation(
                notification.personnage1,
                notification.personnage2
            )
        ]?.[niveau];

    if (
        !dialogues ||
        dialogues.length === 0
    ) {

        afficherNotificationRelation(
            notification,
            recompense
        );

        return;
    }

    let index = 0;

    const personnage1 =
        personnages.find(
            p => p.nom === notification.personnage1
        );

    const personnage2 =
        personnages.find(
            p => p.nom === notification.personnage2
        );

    if (!personnage1 || !personnage2) {

        afficherNotificationRelation(
            notification,
            recompense
        );

        return;
    }

    const ancienneDiv =
        document.getElementById("relation-dialogue");

    if (ancienneDiv) {
        ancienneDiv.remove();
    }

    const div = document.createElement("div");

    div.id = "relation-dialogue";

    div.innerHTML = `

        <div class="relation-dialogue-box">

            <div class="relation-dialogue-personnages">

                <img
                    id="relation-dialogue-img1"
                    src="${personnage1.iconefull || personnage1.icone}"
                    alt="${personnage1.nom}"
                >

                <img
                    id="relation-dialogue-img2"
                    src="${personnage2.iconefull || personnage2.icone}"
                    alt="${personnage2.nom}"
                >

            </div>

            <div
                class="relation-dialogue-texte"
                id="relation-dialogue-texte"
            ></div>

            <div class="relation-dialogue-indication">
                Cliquer pour continuer
            </div>

        </div>

    `;

    document.body.appendChild(div);

    const img1 =
        document.getElementById(
            "relation-dialogue-img1"
        );

    const img2 =
        document.getElementById(
            "relation-dialogue-img2"
        );

    const texte =
        document.getElementById(
            "relation-dialogue-texte"
        );


    function afficherPhrase() {

        const phrase = dialogues[index];

        texte.textContent = phrase.texte;

        img1.style.opacity =
            phrase.personnage === personnage1.nom
                ? "1"
                : "0.3";

        img2.style.opacity =
            phrase.personnage === personnage2.nom
                ? "1"
                : "0.3";

    }


    afficherPhrase();


    div.addEventListener("click", () => {

        index++;

        if (index >= dialogues.length) {

            div.remove();

            afficherNotificationRelation(
                notification,
                recompense
            );

            return;
        }

        afficherPhrase();

    });

}