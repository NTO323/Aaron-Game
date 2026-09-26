const deleteDataButton = document.getElementById("delete-data");
const mainPage = document.getElementById("main-page");
const widgets = document.querySelectorAll(".widget");
const widgetButtons = document.querySelectorAll("[data-widget]");

const charactersList = document.getElementById("characters-list");
const teamCounter = document.getElementById("team-counter");
const charactersTeam = document.getElementById("characters-team");
const characterDetailName = document.getElementById("character-detail-name");
const characterDetailIcon = document.getElementById("character-detail-icon");
const characterDetailLevel = document.getElementById("character-detail-level");
const characterDetailPv = document.getElementById("character-detail-pv");
const characterDetailBio = document.getElementById("character-detail-bio");
let personnageSelectionne = null;

const objectsBio = document.getElementById("objects-bio");
const objectsList = document.getElementById("objects-list");
const inventoryTeam = document.getElementById("inventory-team");
let objetSelectionne = null;
let characterIndex = 0;


function openWidget(widgetName) {
    mainPage.style.display = "none";

    widgets.forEach(widget => {
        widget.style.display = "none";
    });

    const widget = document.getElementById(widgetName);

    if (!widget) return;

    widget.style.display = widgetName === "characters" ? "flex" : "block";

    mettreAJourNavigationWidget(widgetName);

    if (widgetName === "characters") {
        afficherPersonnages();
    }

    if (widgetName === "inventory") {
        afficherObjets();
        afficherEquipeInventaire();
    }

    if (widgetName === "adversary") {
        afficherAdversaires();
        afficherInfoAdversaire();
    }

    if (widgetName === "cooking") {
        afficherAlimentsCuisine();
        afficherSlotsCuisine();
        cookingMessage.textContent = "";
    }

    if (widgetName === "relation") {
        afficherRelations();
    }
}

function closeWidget() {
    widgets.forEach(widget => {
        widget.style.display = "none";
    });

    mainPage.style.display = "flex";

    document.querySelectorAll(".widget-nav button").forEach(button => {
        button.classList.remove("active");
    });
}

widgetButtons.forEach(button => {
    button.addEventListener("click", () => {
        openWidget(button.dataset.widget);
    });
});

function mettreAJourNavigationWidget(widgetId) {
    document.querySelectorAll(".widget-nav button").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.widget === widgetId
        );
    });
}

function sauvegarderPartie() {
    const donnees = {
        rangJoueur,
        pointsRang,
        relations: niveauxRelations,
        notificationsRelations,
        equipe: equipe.map(personnage => ({
            nom: personnage.nom,
            niveau: personnage.niveau,
            xp: personnage.xp,
            pv: personnage.pv,
            pvMax: personnage.pvMax,
            attaque: personnage.attaque,
            defense: personnage.defense,
            vitesse: personnage.vitesse,
            niveauUpDisponible: personnage.niveauUpDisponible,
            objet: personnage.slotobjet ? personnage.slotobjet.nom : null,
            larme: personnage.slotlarme ? personnage.slotlarme.nom : null,
            hpLarme: personnage.hpLarme
        })),
        inventaireObjets: inventaireObjets.map(item => ({
            nom: item.objet.nom,
            quantite: item.quantite
        })),
        inventaireAliments: inventaireAliments.map(item => ({
            nom: item.aliment.nom,
            quantite: item.quantite
        }))
    };

    localStorage.setItem("partie", JSON.stringify(donnees));
}

deleteDataButton.addEventListener("click", () => {
    const confirmation = confirm("Supprimer toutes les données ?");

    if (!confirmation) {
        return;
    }

    localStorage.removeItem("partie");
    location.reload();
});