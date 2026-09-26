class Aliment {
    constructor(nom, bio, rarete = "commun", icone = null) {
        this.nom = nom;
        this.bio = bio;
        this.rarete = rarete;
        this.icone = icone;
    }
}

const pomme = new Aliment("Pomme", "Une pomme bien fraîche et croquante.", "commun", "IMG/pomme.png");
const banane = new Aliment("Banane", "Une banane douce et nourrissante.", "commun", "IMG/banane.png");
const fraise = new Aliment("Fraise", "Une fraise rouge et sucrée.", "commun", "IMG/fraise.png");
const orange = new Aliment("Orange", "Une orange juteuse et pleine de vitamines.", "commun", "IMG/orange.png");
const raisin = new Aliment("Raisin", "Une grappe de raisins sucrés et savoureux.", "commun", "IMG/raisin.png");
const noix = new Aliment("Noix", "Une noix croquante et nourrissante.", "rare", "IMG/noix.png");
const mangue = new Aliment("Mangue", "Une mangue exotique, douce et parfumée.", "rare", "IMG/mangue.png");
const myrtille = new Aliment("Myrtille", "Une petite baie bleue rare et délicieuse.", "rare", "IMG/myrtille.png");
const fruitDragon = new Aliment("Fruit du dragon", "Un fruit exotique aux propriétés mystérieuses.", "rare", "IMG/fruitdragon.png");
const fruitEtoile = new Aliment("Fruit étoilé", "Un fruit extrêmement rare qui brille légèrement.", "tresor", "IMG/fruitétoile.png");
const baieLegendaire = new Aliment("Baie légendaire", "Une baie extrêmement rare dont on raconte qu'elle pousse uniquement dans les endroits oubliés.", "tresor", "IMG/baielegendaire.png");
const cristalSucre = new Aliment("Cristal de sucre", "Un cristal sucré aux reflets étranges et précieux.", "tresor", "IMG/cristalsucre.png");

const aliments = [
    pomme, banane, fraise, orange, raisin, noix,
    mangue, myrtille, fruitDragon, fruitEtoile,
    baieLegendaire, cristalSucre
];

let inventaireAliments = [
    { aliment: pomme, quantite: 3 },
    { aliment: banane, quantite: 3 },
    { aliment: fraise, quantite: 3 },
    { aliment: orange, quantite: 3 },
    { aliment: raisin, quantite: 3 },
    { aliment: noix, quantite: 2 },
    { aliment: mangue, quantite: 2 },
    { aliment: myrtille, quantite: 2 },
    { aliment: fruitDragon, quantite: 1 },
    { aliment: fruitEtoile, quantite: 1 },
    { aliment: baieLegendaire, quantite: 1 },
    { aliment: cristalSucre, quantite: 1 }
];

class Recette {
    constructor(nom, ingredients, bio, soin, difficulte, icone = null) {
        this.nom = nom;
        this.ingredients = ingredients;
        this.bio = bio;
        this.soin = soin;
        this.difficulte = difficulte;
        this.icone = icone;
    }
}

const saladeDeFruits = new Recette("Salade de fruits", [pomme, banane], "Un mélange simple de fruits frais et sucrés.", 10, "facile", "IMG/saladefruit.png");
const saladeDeFraises = new Recette("Salade fruitée", [pomme, fraise], "Une petite salade de fruits pleine de fraîcheur.", 8, "facile", "IMG/saladefruit.png");
const saladeExotique = new Recette("Salade exotique", [mangue, orange, fraise], "Une salade colorée aux saveurs tropicales.", 14, "moyen", "IMG/saladeexotique.png");
const melangeDesBois = new Recette("Mélange des bois", [myrtille, raisin, noix], "Un mélange de fruits sauvages et de noix croquantes.", 16, "moyen", "IMG/melangedesbois.png");
const saladeDuDragon = new Recette("Salade du dragon", [fruitDragon, fraise, mangue], "Une préparation exotique aux couleurs étonnantes.", 22, "difficile", "IMG/saladedudragon.png");
const festinExotique = new Recette("Festin exotique", [fruitDragon, mangue, myrtille, noix], "Un plat complexe réservé aux cuisiniers expérimentés.", 28, "difficile", "IMG/festinexotique.png");
const nectarEtoile = new Recette("Nectar étoilé", [fruitEtoile, mangue, myrtille], "Une préparation exceptionnelle réalisée avec un fruit au pouvoir mystérieux.", 40, "supreme", "IMG/nectaretoile.png");
const festinLegendaire = new Recette("Festin légendaire", [baieLegendaire, fruitEtoile, cristalSucre, fruitDragon], "Un plat presque mythique dont la réussite demande une maîtrise exceptionnelle.", 60, "supreme", "IMG/festinlegendaire.png");

const recettes = [
    saladeDeFruits, saladeDeFraises, saladeExotique, melangeDesBois,
    saladeDuDragon, festinExotique, nectarEtoile, festinLegendaire
];