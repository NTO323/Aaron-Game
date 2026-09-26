class Objet {
    constructor(nom, pv = 0, attaque = 0, defense = 0, vitesse = 0, icone = null, bio) {
        this.nom = nom;
        this.pv = pv;
        this.attaque = attaque;
        this.defense = defense;
        this.vitesse = vitesse;
        this.icone = icone;
        this.bio = bio;
    }
}

const Medicinale = new Objet("Médicinale", 10, 0, 0, 0, "IMG/01.png", "Ceci est un objet améliorant la statistique.");
const pierreAttaque = new Objet("Pierre d'attaque", 0, 5, 0, 0, "IMG/02.png", "Ceci est un objet améliorant la statistique.");
const armure = new Objet("Armure", 0, 0, 10, 0, "IMG/03.png", "Ceci est un objet améliorant la statistique.");
const bottes = new Objet("Bottes rapides", 0, 0, 0, 5, "IMG/04.png", "Ceci est un objet améliorant la statistique.");

const objets = [Medicinale, pierreAttaque, armure, bottes];

let inventaireObjets = [
    { objet: Medicinale, quantite: 1 }
];