function afficherNotificationRelation(
    notification,
    recompense
) {

    const ancienneDiv =
        document.getElementById("relation-notification");

    if (ancienneDiv) {
        ancienneDiv.remove();
    }

    const div = document.createElement("div");

    div.id = "relation-notification";

    div.innerHTML = `
        <div class="relation-notification-box">

            <p>
                ❤️ La relation entre
                <strong>${notification.personnage1}</strong>
                et
                <strong>${notification.personnage2}</strong>
                a augmenté !
            </p>

            ${
                recompense
                    ? `
                        <p>
                            🎁 Tu obtiens :
                            <strong>${recompense.nom}</strong>
                        </p>

                        <img
                            src="${recompense.icone}"
                            alt="${recompense.nom}"
                        >
                    `
                    : ""
            }

            <button id="relation-notification-close">
                FERMER
            </button>

        </div>
    `;

    document.body.appendChild(div);

    document
        .getElementById("relation-notification-close")
        .addEventListener("click", () => {

            div.remove();

        });

}