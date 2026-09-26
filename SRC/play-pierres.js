let expeditionPierres={
    personnages:[],
    enCours:false,
    enPause:false,
    debut:null,
    dernierGain:null,
    prochainGain:null,
    tempsRestant:null,
    timer:null,
    resultats:[]
};

function lancerExpeditionPierres(){
    if(expeditionPierres.enCours)return;

    const personnages=[...repartitionEquipe.pierres];
    if(personnages.length===0)return;

    expeditionPierres.personnages=personnages;
    expeditionPierres.enCours=true;
    expeditionPierres.enPause=false;
    expeditionPierres.debut=Date.now();
    expeditionPierres.dernierGain=Date.now();
    expeditionPierres.prochainGain=6000;
    expeditionPierres.tempsRestant=6000;
    expeditionPierres.resultats=[];

    programmerProchaineRecolte();
    afficherCombat();
}

function programmerProchaineRecolte(){
    if(!expeditionPierres.enCours||expeditionPierres.enPause)return;

    if(expeditionPierres.timer){
        clearTimeout(expeditionPierres.timer);
        expeditionPierres.timer=null;
    }

    expeditionPierres.dernierGain=Date.now();

    expeditionPierres.timer=setTimeout(()=>{
        recolterAlimentsExpedition();
    },expeditionPierres.tempsRestant);
}

function recolterAlimentsExpedition(){
    if(!expeditionPierres.enCours||expeditionPierres.enPause)return;

    expeditionPierres.timer=null;

const nombreAliments=Math.floor(Math.random()*4)+2;

    for(let i=0;i<nombreAliments;i++){
        const aliment=aliments[
            Math.floor(Math.random()*aliments.length)
        ];

        ajouterAlimentInventaire(aliment);

        const existant=expeditionPierres.resultats.find(
            item=>item.aliment===aliment
        );

        if(existant){
            existant.quantite++;
        }else{
            expeditionPierres.resultats.push({
                aliment:aliment,
                quantite:1
            });
        }
    }

    expeditionPierres.dernierGain=Date.now();

    const augmentation=Math.floor(Math.random()*4000)+3000;

    expeditionPierres.prochainGain+=augmentation;
    expeditionPierres.tempsRestant=expeditionPierres.prochainGain;

    sauvegarderPartie();

    const actionAleatoire=Math.random()<0.70;

    if(actionAleatoire){
        declencherActionExpedition();
    }else{
        programmerProchaineRecolte();
    }

    afficherCombat();
}

function declencherActionExpedition(){
    if(!expeditionPierres.enCours||expeditionPierres.enPause)return;

    expeditionPierres.enPause=true;

    if(expeditionPierres.timer){
        clearTimeout(expeditionPierres.timer);
        expeditionPierres.timer=null;
    }

    const tempsEcoule=Date.now()-expeditionPierres.dernierGain;

    expeditionPierres.tempsRestant=Math.max(
        0,
        expeditionPierres.tempsRestant-tempsEcoule
    );

    afficherCombat();
}

function reprendreExpedition(){
    if(!expeditionPierres.enCours||!expeditionPierres.enPause)return;

    expeditionPierres.enPause=false;

    if(expeditionPierres.tempsRestant<=0){
        recolterAlimentsExpedition();
        return;
    }

    programmerProchaineRecolte();
    sauvegarderPartie();
    afficherCombat();
}

function terminerExpeditionPierres(){
    if(!expeditionPierres.enCours)return;

    expeditionPierres.enCours=false;
    expeditionPierres.enPause=false;

    if(expeditionPierres.timer){
        clearTimeout(expeditionPierres.timer);
        expeditionPierres.timer=null;
    }

    desactiverAlerteExpedition();

    expeditionPierres.personnages=[];
    expeditionPierres.debut=null;
    expeditionPierres.dernierGain=null;
    expeditionPierres.prochainGain=null;
    expeditionPierres.tempsRestant=null;

    sauvegarderPartie();
    afficherCombat();
}

function annulerExpeditionPierres(){
    if(expeditionPierres.timer){
        clearTimeout(expeditionPierres.timer);
    }

    expeditionPierres={
        personnages:[],
        enCours:false,
        enPause:false,
        debut:null,
        dernierGain:null,
        prochainGain:null,
        tempsRestant:null,
        timer:null,
        resultats:[]
    };

    desactiverAlerteExpedition();
}

function ajouterAlimentInventaire(aliment,quantite=1){
    const item=inventaireAliments.find(
        item=>item.aliment===aliment
    );

    if(item){
        item.quantite+=quantite;
    }else{
        inventaireAliments.push({
            aliment:aliment,
            quantite:quantite
        });
    }
}

function afficherPierres(){
    afficherCombat();
}

function mettreAJourTempsExpedition(){
    if(!expeditionPierres.enCours)return;
    if(expeditionPierres.enPause)return;
    if(zoneAffichee!=="pierres")return;

    const element=document.getElementById("expedition-temps");

    if(!element)return;

    const tempsEcoule=
        Date.now()-expeditionPierres.dernierGain;

    const tempsRestant=Math.max(
        0,
        expeditionPierres.tempsRestant-tempsEcoule
    );

    const secondes=Math.ceil(tempsRestant/1000);

    element.textContent=`Prochaine récolte : ${secondes}s`;

    if(tempsRestant<=0)return;

    setTimeout(mettreAJourTempsExpedition,1000);
}

function activerAlerteExpedition(){
    const bouton=document.querySelector(
        '.minimap-zone[data-zone="pierres"]'
    );

    if(bouton){
        bouton.classList.add("expedition-attention");
    }
}

function desactiverAlerteExpedition(){
    const bouton=document.querySelector(
        '.minimap-zone[data-zone="pierres"]'
    );

    if(bouton){
        bouton.classList.remove("expedition-attention");
    }
}