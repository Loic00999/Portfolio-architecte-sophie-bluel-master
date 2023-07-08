/***
 * Script JavaScript projet Portfolio architecte sophie bluel master Loïc M pour OpenClassRoom
 */
/***
 * Constantes des routes vers API
 */
const urlWorks = "http://localhost:5678/api/works";
const urlCategories = "http://localhost:5678/api/categories";
/***
 * Function contrôle du token
 */
function isConnected(){
  const controleToken = localStorage.getItem("token");
  console.log(controleToken);
  return controleToken;
}
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
 * Function transformer login en logout
 */
function logOut(){
  const logOut = document.querySelector("#link-logout"); //mettre dans une fonction
  logOut.addEventListener('click', function () {
    localStorage.removeItem("token");
    location.reload();
  });
}
/***
 * Function vérification de la présence du token pour activer le mode edition
 */
function modeEditionActif(){
  if (isConnected()) {
    createModeEdition();
    logOut.innerText = "Logout";
  }
}
/**
 * Function récupération des catégories filtre
 */
function recuperationCategories() {
  return fetch(urlCategories)
    .then((categories) => categories.json())
    .then((categorieName) => {
      return categorieName;
    });
}
console.log(recuperationCategories());
/**
 * Function ajouter les boutons filtres
 */
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
      filter.addEventListener("click", async (event) => {
        
        const idCategorie = event.target.dataset.categorie;
        await filtrerProjets(idCategorie);
      });
    }
  });
}
/**
 * Function récupération des données de projet 
 */
function recuperationProjet() {
  return fetch(urlWorks)
    .then((reponse) => reponse.json())
    .then((worksContent) => {
      return worksContent;
    });
}
/**
 * Function créer la gallerie de projet
 */
function affichageProjet(id = -1) {
  const gallery = document.querySelector(".gallery");
  recuperationProjet().then((worksContent) => {
    gallery.innerHTML = null;
    creationElementProjet(worksContent);
  });
}
/**
 * Création élément projets
 */
function creationElementProjet(works){
  const gallery = document.querySelector(".gallery");
  for (indexWorks in works) {
    const cartel = document.createElement("figure");
    const imgCartel = document.createElement("img");
    const titleCartel = document.createElement("figcaption");

    cartel.setAttribute("id", works[indexWorks].category.name);
    imgCartel.src = works[indexWorks].imageUrl;
    titleCartel.innerHTML = works[indexWorks].title;

    gallery.appendChild(cartel);
    cartel.appendChild(imgCartel);
    cartel.appendChild(titleCartel);    
  }  
}
/**
 * Filtrer projets
 */
async function filtrerProjets(id=-1){
  let works = await recuperationProjet();
  let filterWorks = works;  
  if (id != -1) {
    filterWorks = works.filter((work) => work.categoryId == id);
  }
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = null;
  creationElementProjet(filterWorks);
}
/***
 * Modales galerie photo
 */
function creationElementProjetModale(works){
  const galleryThumbs = document.querySelector("#projet-modale-galerie-photo");
  for (indexWorks in works) {
    const cartelThumbs = document.createElement("figure");
    const imgCartelThumbs = document.createElement("img");
    const titleCartelThumbs = document.createElement("figcaption");
    const trashThumbs = document.createElement("div");

    cartelThumbs.setAttribute("id", works[indexWorks].category.name);
    cartelThumbs.classList.add("position-icon");
    imgCartelThumbs.src = works[indexWorks].imageUrl;
    imgCartelThumbs.classList.add("thumbs");
    titleCartelThumbs.innerHTML = "éditer";
    trashThumbs.classList.add("icon-trash");
    
    galleryThumbs.appendChild(cartelThumbs);
    cartelThumbs.appendChild(trashThumbs);
    cartelThumbs.appendChild(imgCartelThumbs);
    cartelThumbs.appendChild(titleCartelThumbs);
  }
  const moveThumbs = document.createElement("div");
  moveThumbs.classList.add("icon-move");
  galleryThumbs.appendChild(moveThumbs);
}
/**
 * Function créer la gallerie de projet de la modale
 */
function affichageProjetModale(id = -1) {
  const galleryThumb = document.querySelector("#projet-modale-galerie-photo");
  recuperationProjet().then((worksContent) => {
    galleryThumb.innerHTML = null;
    creationElementProjetModale(worksContent);
  });
}
affichageProjetModale(id = -1);
/**
 * Lien extérieur vers le compte Instagram
 */
const linkInstagram = document.querySelector("#link-instagram"); //mettre dans une fonction
linkInstagram.addEventListener('click', function () {
  window.location.href = "https://www.instagram.com/openclassrooms/";
});
/**
 *  function main (initialise le projet)
 */
(function main(){
  modeEditionActif();
  affichageFiltres();
  affichageProjet();
})()