function afficherBarrePV(pv, pvMax) {
    pv = Math.max(0, pv);
    pvMax = Math.max(1, pvMax);

    const pourcentage = Math.min(100, (pv / pvMax) * 100);

    let classe = "pv-normal";

    if (pourcentage <= 10) {
        classe = "pv-danger";
    } else if (pourcentage < 100) {
        classe = "pv-baisse";
    }

    return `
        <div class="barre-pv">
            <div
                class="barre-pv-remplissage ${classe}"
                style="width: ${pourcentage}%"
            ></div>
        </div>
    `;
}