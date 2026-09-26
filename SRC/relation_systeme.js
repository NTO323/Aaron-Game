// ========================================
// CLE D'UNE RELATION
// ========================================

function cleRelation(nom1, nom2) {

    return [nom1, nom2]
        .sort()
        .join("-");

}


// ========================================
// VERIFIER SI UNE NOTIFICATION EXISTE
// ========================================

function notificationRelationExiste(nom1, nom2) {

    const cle = cleRelation(nom1, nom2);

    return notificationsRelations.some(notification =>
        cleRelation(
            notification.personnage1,
            notification.personnage2
        ) === cle
    );

}


// ========================================
// TENTER D'AUGMENTER UNE RELATION
// ========================================

function tenterAugmentationRelation(personnage1, personnage2) {

    const nom1 = personnage1.nom;
    const nom2 = personnage2.nom;

    if (!relationsDisponibles[nom1]?.includes(nom2)) {
        return false;
    }

    const niveau =
        niveauxRelations[nom1]?.[nom2] || 0;

    if (niveau >= 4) {
        return false;
    }

    const chance = chancesRelation[niveau];

    return Math.random() * 100 < chance;

}


// ========================================
// VERIFIER LES RELATIONS D'UNE ZONE
// ========================================

function verifierRelationsZone(joueurs) {

    if (!joueurs || joueurs.length < 2) {
        return [];
    }

    const ameliorations = [];

    for (let i = 0; i < joueurs.length; i++) {

        for (let j = i + 1; j < joueurs.length; j++) {

            const personnage1 =
                joueurs[i].personnage || joueurs[i];

            const personnage2 =
                joueurs[j].personnage || joueurs[j];

            if (
                notificationRelationExiste(
                    personnage1.nom,
                    personnage2.nom
                )
            ) {
                continue;
            }

            if (
                tenterAugmentationRelation(
                    personnage1,
                    personnage2
                )
            ) {

                ameliorations.push({

                    id: Date.now() + Math.random(),

                    personnage1: personnage1.nom,

                    personnage2: personnage2.nom

                });

            }

        }

    }

    return ameliorations;

}


// ========================================
// VERIFIER LES RELATIONS APRES UN COMBAT
// ========================================

function verifierRelationsCombat(zone1, zone2) {

    const ameliorations = [

        ...verifierRelationsZone(zone1),

        ...verifierRelationsZone(zone2)

    ];

    ameliorations.forEach(notification => {

        if (
            !notificationRelationExiste(
                notification.personnage1,
                notification.personnage2
            )
        ) {

            notificationsRelations.push(notification);

        }

    });

    sauvegarderPartie();

    afficherPersonnagesMaison();

    return ameliorations;

}


// ========================================
// APPLIQUER UNE RELATION
// ========================================

function appliquerRelation(notification) {

    const index =
        notificationsRelations.findIndex(
            relation => relation.id === notification.id
        );

    if (index === -1) return;

    const nom1 = notification.personnage1;
    const nom2 = notification.personnage2;

    if (!niveauxRelations[nom1]) {
        niveauxRelations[nom1] = {};
    }

    if (!niveauxRelations[nom2]) {
        niveauxRelations[nom2] = {};
    }

    const niveau =
        niveauxRelations[nom1][nom2] || 0;

    if (niveau >= 4) {

        notificationsRelations.splice(index, 1);

        sauvegarderPartie();

        afficherPersonnagesMaison();

        return;
    }

    const nouveauNiveau = niveau + 1;

    niveauxRelations[nom1][nom2] = nouveauNiveau;
    niveauxRelations[nom2][nom1] = nouveauNiveau;

    const recompense =
        obtenirRecompenseRelation(
            nom1,
            nom2,
            nouveauNiveau
        );

    if (recompense) {
        ajouterObjetInventaire(recompense);
    }

    notificationsRelations.splice(index, 1);

    sauvegarderPartie();

    afficherPersonnagesMaison();

    if (personnageRelationSelectionne) {
        afficherDetailsRelations();
    }

    afficherDialogueRelation(
        notification,
        recompense
    );

}