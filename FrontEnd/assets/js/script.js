/***
 * Script JavaScript
 */
/***
 * Constantes des routes vers API
 */
const urlWorks = "http://localhost:5678/api/works";
const urlCategories = "http://localhost:5678/api/categories";
/***
 * Constante du token
 */
const controleToken = localStorage.getItem("token");
console.log(controleToken);
/***
 * Function création HTML de la banière "Mode édition"
 */
function createModeEdition(){
  /* Ajout de la class CSS */
  const modeEdition = document.querySelector("#mode-edition");
  modeEdition.classList.add("mode-edition");
  /* Création de la div enfant pour le titre et l'iconne de la banière */
  const divTitreModeEdition = document.createElement("div");
  divTitreModeEdition.classList.add("titre-mode-edition");
  modeEdition.appendChild(divTitreModeEdition);
  /* Création de la balise image pour l'iconne du titre de la banière */
  const imgTitreModeEdition = document.createElement("img");
  imgTitreModeEdition.setAttribute("src", "./assets/icons/mode-edition.png");
  imgTitreModeEdition.setAttribute("alt", "Icon mode édition");
  divTitreModeEdition.appendChild(imgTitreModeEdition);
  /* Création de la balise span pour le texte du titre de la banière */
  const spanTitreModeEdition = document.createElement("div");
  spanTitreModeEdition.innerHTML = "Mode édition";
  divTitreModeEdition.appendChild(spanTitreModeEdition);
  /* Création de la div enfant pour le bouton publier de la banière */
  const divboutonPublier = document.createElement("div");
  divboutonPublier.setAttribute("id", "publier");
  divboutonPublier.classList.add("bouton-publier");
  modeEdition.appendChild(divboutonPublier);
  /* Création de la balise span pour le texte du bouton de la banière */
  const spanboutonPublier = document.createElement("div");
  spanboutonPublier.innerHTML = "publier les changements";
  divboutonPublier.appendChild(spanboutonPublier);
}
/***
 * Function login vers logout
 */
const logOut = document.querySelector("#link-logout");
logOut.addEventListener('click', function () {
  localStorage.removeItem("token");
});
/***
 * Function vérification de la présence du token pour activer le mode edition
 */
function modeEditionActif(){
  if (controleToken) {
    createModeEdition();
    logOut.innerText = "Logout";
  }
}
modeEditionActif();


/**
 *  works in progress ////////////////////////////////////////////////////////////////////////////////
 */

/***récupération des catégories filtre***/

function recuperationCategories() {
  return fetch(urlCategories)
    .then((categories) => categories.json())
    .then((categorieName) => {
      return categorieName;
    });
}
console.log(recuperationCategories());
/***ajouter les boutons filtres ***/

function affichageFiltres() {
  recuperationCategories().then((categories) => {
    for (let indexCategorie in categories) {
      const divFiltreParent = document.querySelector(".filters");
      const filterDiv = document.createElement("div");
      filterDiv.innerHTML = categories[indexCategorie].name;
      filterDiv.classList.add("filter-item");
      filterDiv.setAttribute("data-categorie", categories[indexCategorie].id);
      divFiltreParent.appendChild(filterDiv);
    }
    const filterItem = Array.from(document.querySelectorAll(".filter-item"));

    for (let filter of filterItem) {
      console.log(filter);
      filter.addEventListener("click", (event) => {
        
        const idCategorie = event.target.dataset.categorie;
        affichageProjet(idCategorie);
      });
    }
  });
}
affichageFiltres();

/***ajouter les images ***/

function recuperationProjet() {
  return fetch(urlWorks)
    .then((reponse) => reponse.json())
    .then((worksContent) => {
      return worksContent;
    });
}
recuperationProjet();

function affichageProjet(id = -1) {
  const gallery = document.querySelector(".gallery");
  recuperationProjet().then((worksContent) => {
    gallery.innerHTML = null;
    let filterWorks = [];
    if (id == -1) {
      filterWorks = worksContent;
    } else {
      filterWorks = worksContent.filter((work) => work.categoryId == id);
    }
    for (indexWorks in filterWorks) {
      const cartel = document.createElement("figure");
      const imgCartel = document.createElement("img");
      const titleCartel = document.createElement("figcaption");

      cartel.setAttribute("id", worksContent[indexWorks].category.name);
      imgCartel.src = worksContent[indexWorks].imageUrl;
      titleCartel.innerHTML = worksContent[indexWorks].title;
 
      gallery.appendChild(cartel);
      cartel.appendChild(imgCartel);
      cartel.appendChild(titleCartel);

    }
  });
}
affichageProjet();
