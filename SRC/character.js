class Personnage {
    constructor(nom, niveau, bio, pv, attaque, defense, vitesse, icone = null, iconefull = null, iconehome = null, slotobjet = null, xp = 0, slotlarme = null, hpLarme = 0) {
        this.nom = nom;
        this.niveau = niveau;
        this.bio = bio;
        this.pvMax = pv;
        this.pv = pv;
        this.attaque = attaque;
        this.defense = defense;
        this.vitesse = vitesse;
        this.icone = icone;
        this.iconefull = iconefull;
        this.iconehome = iconehome;
        this.slotobjet = slotobjet;
        this.slotlarme = slotlarme;
        this.hpLarme = Math.max(0, Math.min(100, hpLarme));
        this.xp = Math.max(0, Math.min(100, xp));
        this.niveauUpDisponible = this.xp >= 100;
    }

    getStats() {
        let attaque = this.attaque + (this.slotobjet?.attaque || 0);
        let defense = this.defense + (this.slotobjet?.defense || 0);
        let vitesse = this.vitesse + (this.slotobjet?.vitesse || 0);

        if (this.slotlarme) {
            attaque *= 1 + this.slotlarme.bonusAttaque / 100;
            defense *= 1 + this.slotlarme.bonusDefense / 100;
            vitesse *= 1 + this.slotlarme.bonusVitesse / 100;
        }

        return {
            pv: this.pvMax + (this.slotobjet?.pv || 0),
            attaque: Math.floor(attaque),
            defense: Math.floor(defense),
            vitesse: Math.floor(vitesse)
        };
    }
}

const aaron = new Personnage("Aaron", 1, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at imperdiet neque. In pretium mauris sit amet lacus efficitur sodales. Maecenas a vulputate massa, a lobortis nisl. Morbi ut enim quis elit ullamcorper molestie vitae non sapien.", 20, 15, 15, 14, "IMG/icone01.png", "IMG/testiconefull.png", "IMG/pix01.png", null, 0, null, 0);
const colin = new Personnage("Colin", 1, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at imperdiet neque. In pretium mauris sit amet lacus efficitur sodales. Maecenas a vulputate massa, a lobortis nisl. Morbi ut enim quis elit ullamcorper molestie vitae non sapien.", 15, 13, 14, 12, "IMG/icone03.png", "IMG/testiconefull.png", "IMG/pix02.png", null, 0, null, 0);
const poly = new Personnage("Poly", 1, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at imperdiet neque. In pretium mauris sit amet lacus efficitur sodales. Maecenas a vulputate massa, a lobortis nisl. Morbi ut enim quis elit ullamcorper molestie vitae non sapien.", 17, 14, 13, 15, "IMG/icone02.png", "IMG/testiconefull.png", "IMG/pix03.png", null, 0, null, 0);
const cactusman = new Personnage("CactusMan", 1, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at imperdiet neque. In pretium mauris sit amet lacus efficitur sodales. Maecenas a vulputate massa, a lobortis nisl. Morbi ut enim quis elit ullamcorper molestie vitae non sapien.", 19, 12, 17, 12, "IMG/icone05.png", "IMG/testiconefull.png", "IMG/pix05.png", null, 0, null, 0);
const rosemarie = new Personnage("RoseMarie", 1, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at imperdiet neque. In pretium mauris sit amet lacus efficitur sodales. Maecenas a vulputate massa, a lobortis nisl. Morbi ut enim quis elit ullamcorper molestie vitae non sapien.", 18, 14, 14, 13, "IMG/icone04.png", "IMG/testiconefull.png", "IMG/pix04.png", null, 0, null, 0);
const raptor = new Personnage("Raptor", 1, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at imperdiet neque. In pretium mauris sit amet lacus efficitur sodales. Maecenas a vulputate massa, a lobortis nisl. Morbi ut enim quis elit ullamcorper molestie vitae non sapien.", 20, 17, 18, 19, "IMG/testicone.png", "IMG/testiconefull.png", "IMG/pix01.png", null, 0, null, 0);
const jusa = new Personnage("Jusa", 1, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at imperdiet neque. In pretium mauris sit amet lacus efficitur sodales. Maecenas a vulputate massa, a lobortis nisl. Morbi ut enim quis elit ullamcorper molestie vitae non sapien.", 19, 15, 14, 15, "IMG/testicone.png", "IMG/testiconefull.png", "IMG/pix01.png", null, 0, null, 0);

const personnages = [aaron, colin, poly, rosemarie, cactusman];
const ranghero = 99;
let equipe = [aaron, poly];
const MAX_EQUIPE = 4;

const partieSauvegardee = localStorage.getItem("partie");

if (partieSauvegardee) {
    const donnees = JSON.parse(partieSauvegardee);

    if (donnees.notificationsRelations) {
        notificationsRelations = donnees.notificationsRelations;
    }

    if (donnees.rangJoueur !== undefined) rangJoueur = donnees.rangJoueur;
    if (donnees.pointsRang !== undefined) pointsRang = donnees.pointsRang;
    if (typeof afficherRang === "function") afficherRang();

    if (donnees.equipe) {
        equipe = donnees.equipe.map(donneesPersonnage => {
            const personnage = personnages.find(personnage => personnage.nom === donneesPersonnage.nom);
            if (!personnage) return undefined;

            personnage.niveau = donneesPersonnage.niveau ?? personnage.niveau;
            personnage.xp = Math.max(0, Math.min(100, donneesPersonnage.xp ?? personnage.xp));
            personnage.niveauUpDisponible = donneesPersonnage.niveauUpDisponible ?? personnage.xp >= 100;
            personnage.pvMax = donneesPersonnage.pvMax ?? personnage.pvMax;
            personnage.pv = donneesPersonnage.pv ?? personnage.pv;
            personnage.attaque = donneesPersonnage.attaque ?? personnage.attaque;
            personnage.defense = donneesPersonnage.defense ?? personnage.defense;
            personnage.vitesse = donneesPersonnage.vitesse ?? personnage.vitesse;

            personnage.slotobjet = donneesPersonnage.objet
                ? objets.find(objet => objet.nom === donneesPersonnage.objet) || null
                : null;

            personnage.slotlarme = donneesPersonnage.larme
                ? larmes.find(larme => larme.nom === donneesPersonnage.larme) || null
                : null;

            personnage.hpLarme = Math.max(0, Math.min(100, donneesPersonnage.hpLarme ?? 0));

            return personnage;
        }).filter(personnage => personnage !== undefined);
    }

    if (donnees.inventaireObjets) {
        inventaireObjets = donnees.inventaireObjets.map(donneesObjet => {
            const objet = objets.find(objet => objet.nom === donneesObjet.nom);
            if (!objet) return null;
            return { objet, quantite: donneesObjet.quantite };
        }).filter(item => item !== null);
    }

    if (donnees.inventaireAliments) {
        inventaireAliments = donnees.inventaireAliments.map(donneesAliment => {
            const aliment = aliments.find(aliment => aliment.nom === donneesAliment.nom);
            if (!aliment) return null;
            return { aliment, quantite: donneesAliment.quantite };
        }).filter(item => item !== null);
    }

    initialiserRelations();

if (donnees.relations) {
    Object.keys(donnees.relations).forEach(nomPersonnage => {

        if (!niveauxRelations[nomPersonnage]) {
            niveauxRelations[nomPersonnage] = {};
        }

        Object.keys(donnees.relations[nomPersonnage]).forEach(nomRelation => {

            niveauxRelations[nomPersonnage][nomRelation] =
                donnees.relations[nomPersonnage][nomRelation];

        });

    });
}
    // Initialisation après le chargement de la sauvegarde
initialiserRelations();
}