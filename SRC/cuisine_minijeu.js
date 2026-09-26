let manchesCuisineRestantes = 0;
let totalManchesCuisine = 0;
let scoresCuisine = [];
let animationCuisine = null;
let positionFleche = 0;
let directionFleche = 1;
let vitesseFleche = 0.7;

const cookingMinigameTitle = document.getElementById("cooking-minigame-title");
const cookingMinigameInfo = document.getElementById("cooking-minigame-info");
const cookingTiming = document.getElementById("cooking-timing");
const cookingTarget = document.getElementById("cooking-target");
const cookingPerfect = document.getElementById("cooking-perfect");
const cookingArrow = document.getElementById("cooking-arrow");
const cookingHitButton = document.getElementById("cooking-hit-button");
const cookingScore = document.getElementById("cooking-score");

function obtenirNombreManches(difficulte) {
    if (difficulte === "facile") return 3;
    if (difficulte === "moyen") return 5;
    if (difficulte === "difficile") return 6;
    if (difficulte === "supreme") return 10;
    return 3;
}

function obtenirLargeurZone(difficulte) {
    if (difficulte === "facile") return 24;
    if (difficulte === "moyen") return 20;
    if (difficulte === "difficile") return 16;
    if (difficulte === "supreme") return 12;
    return 24;
}

function obtenirVitesseFleche(difficulte) {
    if (difficulte === "facile") return 0.45;
    if (difficulte === "moyen") return 0.65;
    if (difficulte === "difficile") return 0.85;
    if (difficulte === "supreme") return 1.05;
    return 0.45;
}

function lancerMiniJeuCuisine(recette) {
    if (!recette) {
        console.error("Aucune recette reçue pour le mini-jeu.");
        return;
    }

    if (!cookingSelection || !cookingMinigame) {
        console.error("Éléments HTML du mini-jeu introuvables.");
        return;
    }

    recetteCuisineActuelle = recette;
    totalManchesCuisine = obtenirNombreManches(recette.difficulte);
    manchesCuisineRestantes = totalManchesCuisine;
    scoresCuisine = [];
    vitesseFleche = obtenirVitesseFleche(recette.difficulte);

    cookingSelection.style.display = "none";
cookingMinigame.style.display = "block";

document.querySelector("#cooking .widget-nav").style.display = "none";
document.querySelector("#cooking .close-widget").style.display = "none";

cookingMinigameTitle.textContent = recette.nom.toUpperCase();
    cookingMinigameInfo.textContent = "";
    cookingScore.textContent = "";

    cookingTiming.style.visibility = "hidden";
    cookingHitButton.style.visibility = "hidden";

    let compte = 3;

    cookingMinigameInfo.textContent = compte;

    const intervalle = setInterval(() => {
        compte--;

        if (compte > 0) {
            cookingMinigameInfo.textContent = compte;
            return;
        }

        clearInterval(intervalle);

        cookingMinigameInfo.textContent = "";

        cookingTiming.style.visibility = "visible";
        cookingHitButton.style.visibility = "visible";

        nouvelleMancheCuisine();
    }, 1000);
}
function nouvelleMancheCuisine() {
    if (!recetteCuisineActuelle) {
        return;
    }

    if (manchesCuisineRestantes <= 0) {
        terminerMiniJeuCuisine();
        return;
    }

    const mancheActuelle = scoresCuisine.length + 1;
    const largeurZone = obtenirLargeurZone(recetteCuisineActuelle.difficulte);
    const positionZone = Math.random() * (100 - largeurZone);

    cookingMinigameInfo.textContent = `Manche ${mancheActuelle} / ${totalManchesCuisine}`;

    cookingTarget.style.left = `${positionZone}%`;
    cookingTarget.style.width = `${largeurZone}%`;

    cookingPerfect.style.left = "50%";

    positionFleche = 0;
    directionFleche = 1;

    cookingArrow.style.left = "0%";
    cookingScore.textContent = "";

    demarrerAnimationFleche();
}

function demarrerAnimationFleche() {
    if (animationCuisine) {
        cancelAnimationFrame(animationCuisine);
    }

    let dernierTemps = performance.now();

    function animation(temps) {
        const delta = temps - dernierTemps;
        dernierTemps = temps;

        positionFleche += directionFleche * vitesseFleche * (delta / 16);

        if (positionFleche >= 100) {
            positionFleche = 100;
            directionFleche = -1;
        }

        if (positionFleche <= 0) {
            positionFleche = 0;
            directionFleche = 1;
        }

        cookingArrow.style.left = `${positionFleche}%`;

        animationCuisine = requestAnimationFrame(animation);
    }

    animationCuisine = requestAnimationFrame(animation);
}

function calculerScoreCuisine() {
    const rectBarre = cookingTiming.getBoundingClientRect();
    const rectZone = cookingTarget.getBoundingClientRect();

    const positionFlechePixel =
        rectBarre.left + rectBarre.width * positionFleche / 100;

    const centreZone =
        rectZone.left + rectZone.width / 2;

    const distance =
        Math.abs(positionFlechePixel - centreZone);

    const distanceMax = rectZone.width;

    if (distance >= distanceMax) {
        return 0;
    }

    return Math.max(
        0,
        Math.round(100 - distance / distanceMax * 100)
    );
}

function validerMancheCuisine() {
    if (!recetteCuisineActuelle) return;

    if (animationCuisine) {
        cancelAnimationFrame(animationCuisine);
        animationCuisine = null;
    }

    const score = calculerScoreCuisine();

    scoresCuisine.push(score);
    manchesCuisineRestantes--;

    if (score >= 90) {
        cookingScore.textContent = "PARFAIT !";
    } else if (score >= 60) {
        cookingScore.textContent = "BIEN !";
    } else if (score > 0) {
        cookingScore.textContent = "RATÉ !";
    } else {
        cookingScore.textContent = "COMPLÈTEMENT RATÉ !";
    }

    setTimeout(() => {
        nouvelleMancheCuisine();
    }, 350);
}

function obtenirEtatPlat(scoreMoyen) {
    if (scoreMoyen >= 80) return "reussi";
    if (scoreMoyen >= 40) return "correct";
    return "horrible";
}

function soignerEquipeAvecRecette(recette, etatPlat) {
    let multiplicateur = 1;

    if (etatPlat === "reussi") {
        multiplicateur = 1.10;
    } else if (etatPlat === "horrible") {
        multiplicateur = 0.90;
    }

    const soinFinal = Math.round(recette.soin * multiplicateur);

    equipe.forEach(personnage => {
        const pvMax = personnage.getStats().pv;
        personnage.pv = Math.min(pvMax, personnage.pv + soinFinal);
    });

    return soinFinal;
}

function terminerMiniJeuCuisine() {
    if (!recetteCuisineActuelle) return;

    if (animationCuisine) {
        cancelAnimationFrame(animationCuisine);
        animationCuisine = null;
    }

    const total = scoresCuisine.reduce(
        (somme, score) => somme + score,
        0
    );

    const scoreMoyen = Math.round(
        total / scoresCuisine.length
    );

    const etatPlat = obtenirEtatPlat(scoreMoyen);

    retirerAlimentsCuisine();

    const soinFinal=soignerEquipeAvecRecette(
    recetteCuisineActuelle,
    etatPlat
);

afficherPersonnagesMaison();
sauvegarderPartie();

    if (etatPlat === "reussi") {
        cookingMessage.textContent =
            `EXCELLENT ! ${recetteCuisineActuelle.nom} est parfaitement réussi ! L'équipe récupère ${soinFinal} PV. Score : ${scoreMoyen}%.`;
    } else if (etatPlat === "correct") {
        cookingMessage.textContent =
            `${recetteCuisineActuelle.nom} est correct. L'équipe récupère ${soinFinal} PV. Score : ${scoreMoyen}%.`;
    } else {
        cookingMessage.textContent =
            `HORRIBLE ! ${recetteCuisineActuelle.nom} est complètement raté. L'équipe récupère ${soinFinal} PV. Score : ${scoreMoyen}%.`;
    }

    cookingMinigame.style.display = "none";
cookingSelection.style.display = "block";

document.querySelector("#cooking .widget-nav").style.display = "";
document.querySelector("#cooking .close-widget").style.display = "";

reinitialiserCuisine();

    scoresCuisine = [];
    manchesCuisineRestantes = 0;
    totalManchesCuisine = 0;
}

cookingHitButton.addEventListener("click", validerMancheCuisine);