/**
 * Récupérer les éléments du DOM / Création Variable
 */
// selecteur choix
const option = document.querySelector(".option");
const choixAlcool = document.querySelector(".choixAlcool");
const choixChaud = document.querySelector(".choixChaud");
const choixFroide = document.querySelector(".choixFroide");

const optionAlcool = document.querySelector("#alcool");
const optionChaud = document.querySelector("#chaud");
const optionFroid = document.querySelector("#froid");
//

let formulaire = document.querySelector("#form");
let chooseBoisson = document.querySelector(".typeBoisson");

const addButton = document.querySelector(".addButton");
const modifButton = document.querySelector(".modifButton");
const supprButton = document.querySelector(".supprButton");

const tabChaud = document.querySelector(".tabChaud"); // div tableau B. Chaude
const tabFroid = document.querySelector(".tabFroid"); // div tableau B. Froide
const tabAlcool = document.querySelector(".tabAlcool"); // div tableau B. Alcool

const boissonCommande = document.querySelector(".boissonCommande"); // div à commander
const boissonRupture = document.querySelector(".boissonRupture"); // div rupture
const suppBoisson = document.querySelector(".boutonSupprimerBoisson"); // button sup boisson
const boutonAjouter = document.querySelector(".boutonAjouter"); // button +1 => stock
const boutonSupprimer = document.querySelector(".boutonSupprimer"); // button -1 => stock

// require sur les types de boisson
const selectdegreAlcool = document.querySelector('select[name="degreAlcool"]');
const selectInputChaud = document.querySelector('select[name="inputChaud"]');
const selectInputFroid = document.querySelector('select[name="inputFroid"]');

const selectBoisson = document.querySelector(".test"); //ne pas toucher celui la

let arrayStock;
recupTableauStock();

const conData = document.querySelector("#data");
let test = document.querySelector(".test");

// affichage des tableaux de stock
affichageStockComplet();

// Récupération des données du formulaire avec le boutton "ajouter au stock"
formulaire.addEventListener("submit", function (e) {
  e.preventDefault();

  let formData = new FormData(formulaire);
  let nameGet = formData.get("choixBoisson");
  let quantityGet = formData.get("quantiteProduits");
  let prixAchatHTGet = formData.get("prixAchatHT");
  let prixVenteHTGet = formData.get("prixVenteHT");
  let prixVenteTTCGet = formData.get("PrixVenteTTC");
  let margeHTGet = formData.get("MargeHT");
  let degreeAlcoholGet = formData.get("degreAlcool");
  let choixBoissonChaudeGet = formData.get("inputChaud");
  let choixBoissonFroideGet = formData.get("inputFroid");

  // Création de l'objet stock
  let stockInformations;
  if (selectBoisson.value == "choixAlcool") {
    console.log("1");
    stockInformations = new Stockalcool(
      nameGet,
      quantityGet,
      prixAchatHTGet,
      prixVenteHTGet,
      prixVenteTTCGet,
      margeHTGet,
      degreeAlcoholGet
    );
  } else if (selectBoisson.value == "choixChaud") {
    console.log("2");
    stockInformations = new StockChaud(
      nameGet,
      quantityGet,
      prixAchatHTGet,
      prixVenteHTGet,
      prixVenteTTCGet,
      margeHTGet,
      choixBoissonChaudeGet
    );
  } else if (selectBoisson.value == "choixFroide") {
    console.log("3");
    stockInformations = new StockFroid(
      nameGet,
      quantityGet,
      prixAchatHTGet,
      prixVenteHTGet,
      prixVenteTTCGet,
      margeHTGet,
      choixBoissonFroideGet
    );
  } else {
    console.log("4");
  }

  console.log(stockInformations);

  // Envoi de l'objet stock dans le tableau avec la méthode push
  arrayStock.push(stockInformations);
  console.log(arrayStock);

  // showStocks(formData);
  saveTableauStock();
  // actualisation des tableaux de stock
  affichageStockComplet();

  // réinitialise le formulaire
  document.location.reload();
});

// new QRCode(document.getElementById("qrcode"), "http://jindo.dev.naver.com/collie");
/**
 *
 * Creation des Functions
 *
 */
//fonction stocker notre tableau contact dans le localStorage
function saveTableauStock() {
  const JsontabStock = JSON.stringify(arrayStock); //tab => json
  localStorage.setItem("listeStock", JsontabStock); //envoy tab
}
//fonction recup de mon tableau du local storage
function recupTableauStock() {
  // RECUPERATION LOCAL STORAGE DANS VARIABLE

  let JsontabStock = JSON.parse(localStorage.getItem("listeStock")); // recup json => tab
  if (!JsontabStock) {
    // arrayStock est egal au contenu du local
    arrayStock = [];
  } else {
    arrayStock = JsontabStock;
  }
}
// selecteur choix CHAUD FROID
function changementType() {
  let type = document.getElementById("type").value;

  //pour selecteur type boisson
  if (type == "choixAlcool") {
    optionAlcool.style = "display:block";
    selectdegreAlcool.setAttribute("required", true);
    // bien passer le required  en false ARNAUD CA MARCHE PAS CA!
    // selectInputChaud.setAttribute("required", false);
    // selectInputFroid.setAttribute("required", false);
    optionChaud.style.display = "none";
    optionFroid.style.display = "none";
  } else if (type == "choixChaud") {
    optionChaud.style = "display:block";
    selectInputChaud.setAttribute("required", true);
    // selectdegreAlcool.setAttribute("required", false);
    // selectInputFroid.setAttribute("required", false);
    optionAlcool.style.display = "none";
    optionFroid.style.display = "none";
  } else {
    optionFroid.style = "display:block";
    selectInputFroid.setAttribute("required", true);
    // selectdegreAlcool.setAttribute("required", false);
    // selectInputChaud.setAttribute("required", false);
    optionChaud.style.display = "none";
    optionAlcool.style.display = "none";
  }
}

// Fonction Affichage Stock Boisson Froide
function afficheStock() {
  //Action de affiche Contact dans DIV .infoContact
  let ficheBoissonFroide = "";
  let ficheBoissonChaude = "";
  let ficheBoissonAlcool = "";

  arrayStock.forEach((element, index) => {
    if (element.type == "categorieFroid") {
      // creer ma fiche a partir des elements du tableau
      ficheBoissonFroide += `
      <div class="colonne flex">
        <div class="cellule">${element.quantiteProduit}</div>
        <div class="cellule">
          <a href="#containerProduit" onClick="transfertValue(${index})">${element.nomProduit}</a>
        </div>
        <div class="cellule">${element.categorieFroid}</div>
        <div class="cellule">
          <button class="boutonAjouter" onClick="buttonPlus(${index})">
            <i class="fa-regular fa-circle-plus"></i>
          </button>
        </div>
        <div>
          <button class="boutonSupprimer" onClick="buttonMoins(${index})">
            <i class="fa-regular fa-circle-minus"></i>
          </button>
        </div>
        <div>
          <button class="boutonSupprimerBoisson" onClick="buttonSuppressionBoisson(${index})">
            <i class="fa-regular fa-circle-minus"></i> Supprimer
          </button>
        </div>
      </div>
        `;
      tabFroid.innerHTML = ficheBoissonFroide;
    } else if (element.type == "categorieChaud") {
      // creer ma fiche a partir des elements du tableau
      ficheBoissonChaude += `
      <div class="colonne flex">
        <div class="cellule">${element.quantiteProduit}</div>
        <div class="cellule">
          <a href="#containerProduit" onClick="transfertValue(${index})">${element.nomProduit}</a>
        </div>
        <div class="cellule">${element.categorieChaud}</div>
        <div class="cellule">
          <button class="boutonAjouter" onClick="buttonPlus(${index})">
            <i class="fa-regular fa-circle-plus"></i>
          </button>
        </div>
        <div>
          <button class="boutonSupprimer" onClick="buttonMoins(${index})">
            <i class="fa-regular fa-circle-minus"></i>
          </button>
        </div>
        <div>
          <button class="boutonSupprimerBoisson" onClick="buttonSuppressionBoisson(${index})">
            <i class="fa-regular fa-circle-minus"></i> Supprimer
          </button>
        </div>
      </div>
        `;
      tabChaud.innerHTML = ficheBoissonChaude;
    } else {
      // creer ma fiche a partir des elements du tableau
      ficheBoissonAlcool += `
      <div class="colonne flex">
        <div class="cellule">${element.quantiteProduit}</div>
        <div class="cellule">
          <a href="#containerProduit" onClick="transfertValue(${index})">${element.nomProduit}</a>
        </div>
        <div class="cellule">${element.degreeAlcohol}</div>
        <div class="cellule">
          <button class="boutonAjouter" onClick="buttonPlus(${index})">
            <i class="fa-regular fa-circle-plus"></i>
          </button>
        </div>
        <div>
          <button class="boutonSupprimer" onClick="buttonMoins(${index})">
            <i class="fa-regular fa-circle-minus"></i>
          </button>
        </div>
        <div>
          <button class="boutonSupprimerBoisson" onClick="buttonSuppressionBoisson(${index})">
            <i class="fa-regular fa-circle-minus"></i> Supprimer
          </button>
        </div>
      </div>
        `;
      tabAlcool.innerHTML = ficheBoissonAlcool;
    }
  });
}
// Fonction Affichage Stock Boisson à commander
function afficheStockAlerteCommander() {
  //Action de affiche Contact dans DIV .infoContact
  let ficheBoisson = "";

  arrayStock.forEach((element, index) => {
    if (element.quantiteProduit <= 5 && element.quantiteProduit > 0) {
      // creer ma fiche a partir des elements du tableau
      ficheBoisson += `
      <li>${element.nomProduit} <span class="alerteTexte">(reste ${element.quantiteProduit} en stock)</span></li>
        `;
    } else {
      false;
    }
  });
  boissonCommande.innerHTML = ficheBoisson;
}
// Fonction Affichage Stock Rupture
function afficheStockAlerteRupture() {
  //Action de affiche Contact dans DIV .infoContact
  let ficheBoisson = "";

  arrayStock.forEach((element, index) => {
    if (element.quantiteProduit == 0) {
      // creer ma fiche a partir des elements du tableau
      ficheBoisson += `
        <li>${element.nomProduit}</li>
        `;
    } else {
      false;
    }
  });
  boissonRupture.innerHTML = ficheBoisson;
}
// Fonction Affichage des tableau Stock Complet
function affichageStockComplet() {
  afficheStock();
  afficheStockAlerteCommander();
  afficheStockAlerteRupture();
}
// script dans le form pour calcul marge ht et tva
function CalculerMontantTTC() {
  // rappel only number
  if (isNaN(formulaire.prixVenteHT.value) == true) {
    alert("Merci de saisir un montant correct. Calcul impossible.");
    formulaire.prixVenteHT.value = "";
  } else if (test) {
    // calcul marge HT
    formulaire.MargeHT.value =
      formulaire.prixVenteHT.value / formulaire.prixAchatHT.value;

    // calcul tva
    formulaire.PrixVenteTTC.value = formulaire.prixVenteHT.value * 1.2;
  } else {
    false;
  }
}
function transfertValue(index) {
  let choixBoisson = document.querySelector(".choixBoisson");
  let prixAchatHT = document.querySelector(".prixAchatHT");
  let prixVenteHT = document.querySelector(".prixVenteHT");
  let prixVenteTTC = document.querySelector(".PrixVenteTTC");
  let quantiteProduits = document.querySelector(".quantiteProduits");
  let margeHT = document.querySelector(".MargeHT");
  // // selectBoisson = document.querySelector(".test");
  let selectdegreAlcool = document.querySelector('select[name="degreAlcool"]');
  let selectInputChaud = document.querySelector('select[name="inputChaud"]');
  let selectInputFroid = document.querySelector('select[name="inputFroid"]');

  // Ajout des valeurs au inputs
  // selectBoisson.value = arrayStock[index].type;
  choixBoisson.value = arrayStock[index].nomProduit;
  prixAchatHT.value = arrayStock[index].prixProduitAchat;
  prixVenteHT.value = arrayStock[index].prixProduitVente;
  prixVenteTTC.value = arrayStock[index].prixVenteTTC;
  quantiteProduits.value = arrayStock[index].quantiteProduit;
  margeHT.value = arrayStock[index].margeHT;
  selectdegreAlcool.value = arrayStock[index].degreeAlcohol;
  selectInputChaud.value = arrayStock[index].categorieChaud;
  selectInputFroid.value = arrayStock[index].categorieFroid;

  modifButton.addEventListener("click", function () {
    arrayStock[index].nomProduit = choixBoisson.value;
    arrayStock[index].prixProduitAchat = prixAchatHT.value;
    arrayStock[index].prixProduitVente = prixVenteHT.value;
    arrayStock[index].prixVenteTTC = prixVenteTTC.value;
    arrayStock[index].quantiteProduit = quantiteProduits.value;
    arrayStock[index].margeHT = margeHT.value;
    arrayStock[index].degreeAlcohol = selectdegreAlcool.value;
    arrayStock[index].categorieChaud = selectInputChaud.value;
    arrayStock[index].categorieFroid = selectInputFroid.value;

    arrayStock.splice(index, 1);
    //affiche le tableau modifier
    affichageStockComplet();
    //stocker notre tableau modifier dans le localStorage
    saveTableauStock();
  });
}
// Fonction bouton suppression total Boisson
function buttonSuppressionBoisson(index) {
  //Action de supprimer la boisson du stock
  let suppBoissonData = document.querySelectorAll(".boutonSupprimerBoisson");

  if (confirm("Voulez vous supprimer la boisson du stock ?")) {
    // Suppression de la li sur la quelle on a cliqué
    arrayStock.splice(index, 1);
    //affiche le tableau modifier
    affichageStockComplet();
    //stocker notre tableau modifier dans le localStorage
    saveTableauStock();
    document.location.reload();
  } else {
    false;
  }
}
// fonction bouton Plus
function buttonPlus(index) {
  //Action de ajouter la boisson du stock
  let quantiteProduits = document.querySelector(".boutonAjouter");
  quantiteProduits.value = arrayStock[index].quantiteProduit;
  quantiteProduits = Number(quantiteProduits.value) + 1;
  arrayStock[index].quantiteProduit = quantiteProduits;
  //stocker notre tableau modifier dans le localStorage
  saveTableauStock();
  document.location.reload();
}
// fonction bouton Moins
function buttonMoins(index) {
  //Action de supprimer la boisson du stock
  let quantiteProduits = document.querySelector(".boutonSupprimer");
  quantiteProduits.value = arrayStock[index].quantiteProduit;
  quantiteProduits = Number(quantiteProduits.value) - 1;
  arrayStock[index].quantiteProduit = quantiteProduits;
  console.log(arrayStock);
  //stocker notre tableau modifier dans le localStorage
  saveTableauStock();
  document.location.reload();
}

/**
 *
 * Creation des classes Stock
 *
 */
class Stock {
  constructor(
    nomProduit,
    quantiteProduit,
    prixProduitAchat,
    prixProduitVente,
    prixVenteTTC,
    margeHT
  ) {
    this.nomProduit = nomProduit;
    this.quantiteProduit = quantiteProduit;
    this.prixProduitAchat = prixProduitAchat;
    this.prixProduitVente = prixProduitVente;
    this.prixVenteTTC = prixVenteTTC;
    this.margeHT = margeHT;
  }
}
class Stockalcool extends Stock {
  constructor(
    nomProduit,
    quantiteProduit,
    prixProduitAchat,
    prixProduitVente,
    prixVenteTTC,
    margeHT,
    degreeAlcohol
  ) {
    super(
      nomProduit,
      quantiteProduit,
      prixProduitAchat,
      prixProduitVente,
      prixVenteTTC,
      margeHT
    );
    this.degreeAlcohol = degreeAlcohol;
    this.type = "categorieAlcool";
  }
}
class StockChaud extends Stock {
  constructor(
    nomProduit,
    quantiteProduit,
    prixProduitAchat,
    prixProduitVente,
    prixVenteTTC,
    margeHT,
    categorieChaud
  ) {
    super(
      nomProduit,
      quantiteProduit,
      prixProduitAchat,
      prixProduitVente,
      prixVenteTTC,
      margeHT
    );
    this.categorieChaud = categorieChaud;
    this.type = "categorieChaud";
  }
}
class StockFroid extends Stock {
  constructor(
    nomProduit,
    quantiteProduit,
    prixProduitAchat,
    prixProduitVente,
    prixVenteTTC,
    margeHT,
    categorieFroid
  ) {
    super(
      nomProduit,
      quantiteProduit,
      prixProduitAchat,
      prixProduitVente,
      prixVenteTTC,
      margeHT
    );
    this.categorieFroid = categorieFroid;
    this.type = "categorieFroid";
  }
}
