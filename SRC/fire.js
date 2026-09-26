
const fireFrames = document.querySelectorAll("#campfire-animation img");

let fireFrame = 0;

function animateCampfire() {
    // Cache toutes les frames
    fireFrames.forEach(frame => {
        frame.style.opacity = "0";
    });

    // Affiche la frame actuelle
    fireFrames[fireFrame].style.opacity = "1";

    // Passe à la suivante
    fireFrame++;

    // Retour à la première après feu06
    if (fireFrame >= fireFrames.length) {
        fireFrame = 0;
    }
}

// Change de frame toutes les 100 ms
setInterval(animateCampfire, 100);


