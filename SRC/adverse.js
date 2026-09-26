class Ennemis {
    constructor(
        rang,
        nom,
        niveau,
        bio,
        pv,
        attaque,
        defense,
        vitesse,
        icone = null,
        iconefull = null,
        iconehome = null,
        gainXp = 0
    ) {
        this.rang = rang;
        this.nom = nom;
        this.niveau = niveau;
        this.bio = bio;
        this.pv = pv;
        this.attaque = attaque;
        this.defense = defense;
        this.vitesse = vitesse;
        this.icone = icone;
        this.iconefull = iconefull;
        this.iconehome = iconehome;
        this.gainXp = Math.max(0, gainXp);
        this.equipe = null;
    }
}

const farceur = new Ennemis(
    98,
    "Farceur",
    1,
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at imperdiet neque. In pretium mauris sit amet lacus efficitur sodales. Maecenas a vulputate massa, a lobortis nisl. Morbi ut enim quis elit ullamcorper molestie vitae non sapien.",
    10,
    10,
    10,
    10,
    "IMG/testicone.png",
    "IMG/testiconefull.png",
    "IMG/pix01.png",
    10
);

const pilleur = new Ennemis(
    99,
    "Pilleur",
    1,
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at imperdiet neque. In pretium mauris sit amet lacus efficitur sodales. Maecenas a vulputate massa, a lobortis nisl. Morbi ut enim quis elit ullamcorper molestie vitae non sapien.",
    10,
    10,
    10,
    10,
    "IMG/testicone.png",
    "IMG/testiconefull.png",
    "IMG/pix01.png",
    15
);

const voleur = new Ennemis(
    97,
    "Voleur",
    1,
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at imperdiet neque. In pretium mauris sit amet lacus efficitur sodales. Maecenas a vulputate massa, a lobortis nisl. Morbi ut enim quis elit ullamcorper molestie vitae non sapien.",
    10,
    10,
    10,
    10,
    "IMG/testicone.png",
    "IMG/testiconefull.png",
    "IMG/pix01.png",
    20
);


const adversaire = [
    farceur,
    pilleur,
    voleur
];

const teamfarceur = [
    farceur,
    farceur,
    farceur,
    farceur
];

const teampilleur = [
    pilleur,
    pilleur,
    pilleur,
    pilleur
];

const teamvoleur = [
    voleur,
    voleur,
    voleur,
    voleur
];


farceur.equipe = teamfarceur;
pilleur.equipe = teampilleur;
voleur.equipe = teamvoleur;