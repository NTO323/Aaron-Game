const cookingSlots = document.querySelectorAll(".cooking-slot");
const foodList = document.getElementById("food-list");
const cookButton = document.getElementById("cook-button");
const cookingMessage = document.getElementById("cooking-message");
const cookingSelection = document.getElementById("cooking-selection");
const cookingMinigame = document.getElementById("cooking-minigame");

let alimentSelectionne = null;
let alimentsCuisine = [null, null, null, null];
let recetteCuisineActuelle = null;

function afficherAlimentsCuisine() {
    foodList.innerHTML = "";

    inventaireAliments.forEach(item => {
        const alimentElement = document.createElement("div");
        alimentElement.classList.add("food-card");

        if (item.quantite <= 0) {
            alimentElement.classList.add("indisponible");
        }

        if (alimentSelectionne === item.aliment) {
            alimentElement.classList.add("selected");
        }

        alimentElement.innerHTML = `
            <img src="${item.aliment.icone}" alt="${item.aliment.nom}">
            <div>
                <p>${item.aliment.nom}</p>
                <p>x${item.quantite}</p>
                <small>${item.aliment.rarete}</small>
            </div>
        `;

        if (item.quantite > 0) {
            alimentElement.addEventListener("click", () => {
    alimentSelectionne = item.aliment;
    cookingMessage.textContent = item.aliment.bio;
    afficherAlimentsCuisine();
});
        }

        foodList.appendChild(alimentElement);
    });
}

function afficherSlotsCuisine() {
    cookingSlots.forEach((slot, index) => {
        const aliment = alimentsCuisine[index];

        slot.innerHTML = "";

        if (!aliment) {
            slot.innerHTML = `<span>+</span>`;
            return;
        }

        slot.innerHTML = `<img src="${aliment.icone}" alt="${aliment.nom}">`;
    });
}

cookingSlots.forEach(slot => {
    slot.addEventListener("click", () => {
        const index = Number(slot.dataset.slot);

        if (alimentsCuisine[index] && !alimentSelectionne) {
            alimentsCuisine[index] = null;
            cookingMessage.textContent = "";
            afficherSlotsCuisine();
            afficherAlimentsCuisine();
            return;
        }

        if (!alimentSelectionne) return;

        alimentsCuisine[index] = alimentSelectionne;
        alimentSelectionne = null;
        cookingMessage.textContent = "";

        afficherSlotsCuisine();
        afficherAlimentsCuisine();
    });
});

function trouverRecette() {
    const ingredientsCuisine = alimentsCuisine.filter(Boolean);

    if (ingredientsCuisine.length === 0) return null;

    return recettes.find(recette => {
        if (recette.ingredients.length !== ingredientsCuisine.length) {
            return false;
        }

        const recetteIngredients = recette.ingredients
            .map(aliment => aliment.nom)
            .sort();

        const cuisineIngredients = ingredientsCuisine
            .map(aliment => aliment.nom)
            .sort();

        return recetteIngredients.every((nom, index) => {
            return nom === cuisineIngredients[index];
        });
    });
}

function verifierQuantitesCuisine() {
    const quantites = {};

    alimentsCuisine.filter(Boolean).forEach(aliment => {
        if (!quantites[aliment.nom]) {
            quantites[aliment.nom] = 0;
        }

        quantites[aliment.nom]++;
    });

    for (const nom in quantites) {
        const item = inventaireAliments.find(item => {
            return item.aliment.nom === nom;
        });

        if (!item || item.quantite < quantites[nom]) {
            return false;
        }
    }

    return true;
}

function retirerAlimentsCuisine() {
    alimentsCuisine.filter(Boolean).forEach(aliment => {
        const item = inventaireAliments.find(item => {
            return item.aliment === aliment;
        });

        if (item) {
            item.quantite--;
        }
    });
}

function reinitialiserCuisine() {
    alimentsCuisine = [null, null, null, null];
    alimentSelectionne = null;
    recetteCuisineActuelle = null;

    afficherSlotsCuisine();
    afficherAlimentsCuisine();
}

cookButton.addEventListener("click", () => {
    const nombreIngredients = alimentsCuisine.filter(Boolean).length;

    if (nombreIngredients === 0) {
        cookingMessage.textContent = "Tu dois choisir au moins un aliment.";
        return;
    }

    const recette = trouverRecette();

    if (!recette) {
        cookingMessage.textContent = "Tu ne peux rien cuisiner avec ces aliments.";
        return;
    }

    if (!verifierQuantitesCuisine()) {
        cookingMessage.textContent = "Tu n'as pas assez d'aliments.";
        return;
    }

    recetteCuisineActuelle = recette;
    cookingMessage.textContent = "";

    lancerMiniJeuCuisine(recette);
});

afficherSlotsCuisine();
afficherAlimentsCuisine();