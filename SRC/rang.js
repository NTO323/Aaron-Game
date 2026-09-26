let rangJoueur = 99;
let pointsRang = 0;
const POINTS_PAR_RANG = 100;
const RANG_MAX = 99;
const RANG_MIN = 1;

function calculerPointsRang(rangEnnemi) {
    return Math.max(50, (RANG_MAX - rangEnnemi) * 37.5 + 50);
}

function gagnerPointsRang(rangEnnemi) {
    const ancienRang = rangJoueur;
    const ancienPoints = pointsRang;
    const pointsGagnes = Math.round(calculerPointsRang(rangEnnemi));

    pointsRang += pointsGagnes;

    while (pointsRang >= POINTS_PAR_RANG && rangJoueur > RANG_MIN) {
        pointsRang -= POINTS_PAR_RANG;
        rangJoueur--;
    }

    if (rangJoueur === RANG_MIN) pointsRang = 0;

    sauvegarderPartie();

    return {
        pointsGagnes,
        ancienRang,
        nouveauRang: rangJoueur,
        ancienPoints,
        nouveauxPoints: pointsRang
    };
}

function afficherRang() {
    const rankNumbers = document.querySelectorAll(".rank-number, .adversary-rank-number");
    rankNumbers.forEach(element => {
        element.textContent = rangJoueur;
    });
}