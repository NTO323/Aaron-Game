class Larme {
    constructor(nom, description, bonusAttaque, bonusDefense, bonusVitesse, prix) {
        this.nom = nom;
        this.description = description;
        this.bonusAttaque = bonusAttaque;
        this.bonusDefense = bonusDefense;
        this.bonusVitesse = bonusVitesse;
        this.prix = prix;
    }
}

const larme1 = new Larme("Larme de Force", "Augmente l'attaque.", 20, 0, 0, 10);
const larme2 = new Larme("Larme de Garde", "Augmente la défense.", 0, 20, 0, 10);
const larme3 = new Larme("Larme de Vitesse", "Augmente la vitesse.", 0, 0, 20, 10);
const larme4 = new Larme("Larme du Guerrier", "Augmente l'attaque et la défense.", 20, 20, 0, 20);
const larme5 = new Larme("Larme du Chasseur", "Augmente l'attaque et la vitesse.", 20, 0, 20, 20);
const larme6 = new Larme("Larme de l'Agile", "Augmente la défense et la vitesse.", 0, 20, 20, 20);
const larme7 = new Larme("Larme de l'Équilibre", "Augmente l'attaque, la défense et la vitesse.", 20, 20, 20, 30);
const larme8 = new Larme("Larme de Puissance", "Augmente fortement l'attaque, la défense et la vitesse.", 30, 30, 30, 40);
const larme9 = new Larme("Larme Supérieure", "Augmente considérablement l'attaque, la défense et la vitesse.", 50, 50, 50, 60);
const larme10 = new Larme("Larme Ultime", "Une larme extrêmement puissante.", 75, 75, 75, 75);

const larmes = [
    larme1,
    larme2,
    larme3,
    larme4,
    larme5,
    larme6,
    larme7,
    larme8,
    larme9,
    larme10
];

function chargerLarme(personnage) {
    if (!personnage || !personnage.slotlarme) return;

    personnage.hpLarme = Math.min(
        100,
        personnage.hpLarme + personnage.slotlarme.prix
    );

    sauvegarderPartie();
}