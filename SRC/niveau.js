function appliquerNiveauPersonnage(personnage) {

    if (personnage.xp < 100) return;

    personnage.niveau++;

    personnage.xp = 0;

    personnage.pvMax += 2;
    personnage.pv += 2;

    personnage.attaque += 2;
    personnage.defense += 2;
    personnage.vitesse += 2;

    personnage.niveauUpDisponible = false;

    sauvegarderPartie();

    afficherPersonnagesMaison();

}