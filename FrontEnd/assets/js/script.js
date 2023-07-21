// Script JavaScript projet Portfolio architecte sophie bluel master Loïc M pour OpenClassRoom
// Constantes des routes vers API
const urlWorks = "http://localhost:5678/api/works";
const urlCategories = "http://localhost:5678/api/categories";
// Function contrôle du token
function isConnected() {
  const controleToken = localStorage.getItem("token");
  console.log(controleToken);
  return controleToken;
}
// Function création HTML de la banière "Mode édition"
function createModeEdition() {
  const modeEdition = document.querySelector("#mode-edition"); //Ajout de la class CSS
  modeEdition.classList.add("mode-edition");
  const divTitreModeEdition = document.createElement("div"); //Création de la div enfant pour le titre et l'iconne de la banière
  divTitreModeEdition.classList.add("titre-mode-edition");
  modeEdition.appendChild(divTitreModeEdition);
  const imgTitreModeEdition = document.createElement("img"); //Création de la balise image pour l'iconne du titre de la banière
  imgTitreModeEdition.setAttribute("src", "./assets/icons/mode-edition.png");
  imgTitreModeEdition.setAttribute("alt", "Icon mode édition");
  divTitreModeEdition.appendChild(imgTitreModeEdition);
  const spanTitreModeEdition = document.createElement("div"); //Création de la balise span pour le texte du titre de la banière
  spanTitreModeEdition.innerHTML = "Mode édition";
  divTitreModeEdition.appendChild(spanTitreModeEdition);
  const divboutonPublier = document.createElement("div"); //Création de la div enfant pour le bouton publier de la banière
  divboutonPublier.setAttribute("id", "publier");
  divboutonPublier.classList.add("bouton-publier");
  modeEdition.appendChild(divboutonPublier);
  const spanboutonPublier = document.createElement("div"); //Création de la balise span pour le texte du bouton de la banière
  spanboutonPublier.innerHTML = "publier les changements";
  divboutonPublier.appendChild(spanboutonPublier);
}
// Function affichage boutons modifier
function affichageBoutonsModifier() {
  const boutonModificationPhotoProfils = document.getElementById("bouton-modification-photo-profils");
  const boutonModificationTexteProfils = document.getElementById("bouton-modification-texte-profils");
  const boutonModificationProjets = document.getElementById("bouton-modification-projets");
  boutonModificationPhotoProfils.classList.remove("boutons-non-connecte");
  boutonModificationTexteProfils.classList.remove("boutons-non-connecte");
  boutonModificationProjets.classList.remove("boutons-non-connecte");
  boutonModificationPhotoProfils.classList.add("boutons-connecte");
  boutonModificationTexteProfils.classList.add("boutons-connecte");
  boutonModificationProjets.classList.add("boutons-connecte");
}
// Function récupération des catégories filtre
function recuperationCategories() {
  return fetch(urlCategories)
    .then((categories) => categories.json())
    .then((categorieName) => {
      return categorieName;
    });
}
console.log(recuperationCategories());
// Function ajouter les boutons filtres
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
        let focusFiltre = document.querySelector(".filter-item__selected"); // Focus colorisé des filtres
        focusFiltre.classList.remove("filter-item__selected");
        event.target.classList.add("filter-item__selected");
      });
    }
  });
}
// Function masquer filtres
function masquerFiltres() {
  const masquerFiltres = document.querySelector("#filtres-visibilite");
  masquerFiltres.classList.remove("filtres-active");
  masquerFiltres.classList.add("filtres-non-active");
}
// Function vérification de la présence du token et activation mode édition si ok Inclut addEvenListener Logout
function modeEditionActif() {
  if (isConnected()) {
    createModeEdition();
    const logOut = document.querySelector("#link-logout");
    logOut.innerText = "Logout";
    logOut.addEventListener("click", function () {
      localStorage.clear();
      location.reload();
    });
    affichageBoutonsModifier();
    masquerFiltres();
  }
}
// Function récupération des données de projet
function recuperationProjet() {
  return fetch(urlWorks)
    .then((reponse) => reponse.json())
    .then((worksContent) => {
      return worksContent;
    });
}
// Function créer la gallerie de projet
function affichageProjet(id = -1) {
  const gallery = document.querySelector(".gallery");
  recuperationProjet().then((worksContent) => {
    gallery.innerHTML = null;
    creationElementProjet(worksContent);
  });
}
// Création élément projets
function creationElementProjet(works) {
  const gallery = document.querySelector(".gallery");
  for (indexWorks in works) {
    const cartel = document.createElement("figure");
    const imgCartel = document.createElement("img");
    const titleCartel = document.createElement("figcaption");

    cartel.setAttribute("id", works[indexWorks].id);
    imgCartel.src = works[indexWorks].imageUrl;
    titleCartel.innerHTML = works[indexWorks].title;

    gallery.appendChild(cartel);
    cartel.appendChild(imgCartel);
    cartel.appendChild(titleCartel);
  }
}
// Filtrer projets
async function filtrerProjets(id = -1) {
  let works = await recuperationProjet();
  let filterWorks = works;
  if (id != -1) {
    filterWorks = works.filter((work) => work.categoryId == id);
  }
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = null;
  creationElementProjet(filterWorks);
}
// Overlay
function ModalOverlayOn() {
  const modalContainer = document.querySelector("#modal-container");
  const overlay = document.querySelector("#overlay");
  modalContainer.classList.remove("overlay-off");
  modalContainer.classList.add("overlay-on");
  overlay.classList.remove("overlay-off");
  overlay.classList.add("overlay-on");
}
function ModalOverlayOff() {
  const modalContainer = document.getElementById("modal-container");
  const overlay = document.getElementById("overlay");
  modalContainer.classList.remove("overlay-on");
  modalContainer.classList.add("overlay-off");
  overlay.classList.remove("overlay-on");
  overlay.classList.add("overlay-off");
}
// Construction modales galerie photo
function creationModaleGestiongallerie() {
  const modaleGestionGalleriePhoto = document.querySelector("#modale-gestion-galerie-photo");
  modaleGestionGalleriePhoto.setAttribute("aria-hidden", "true");
  modaleGestionGalleriePhoto.setAttribute("aria-modal", "false");
  modaleGestionGalleriePhoto.setAttribute("role", "dialog");
  modaleGestionGalleriePhoto.setAttribute("aria-labelledby", "gestion");
}
creationModaleGestiongallerie();
// Construction modales ajout photo
function creationModaleAjoutPhoto() {
  const modaleGestionAjoutPhoto = document.querySelector("#modale-gestion-ajout-photo");
  modaleGestionAjoutPhoto.setAttribute("aria-hidden", "true");
  modaleGestionAjoutPhoto.setAttribute("aria-modal", "false");
  modaleGestionAjoutPhoto.setAttribute("role", "dialog");
  modaleGestionAjoutPhoto.setAttribute("aria-labelledby", "ajout");
}
creationModaleAjoutPhoto();
// Modales récupération des projets de le galerie photo
function creationElementProjetModale(works) {
  const galleryThumbs = document.querySelector("#projet-modale-galerie-photo");
  for (indexWorks in works) {
    const cartelThumbs = document.createElement("figure");
    const imgCartelThumbs = document.createElement("img");
    const titleCartelThumbs = document.createElement("figcaption");
    const trashThumbs = document.createElement("div");

    cartelThumbs.setAttribute("id", works[indexWorks].id); //id voir 1 ?????????????????
    cartelThumbs.classList.add("position-icon");
    imgCartelThumbs.src = works[indexWorks].imageUrl;
    imgCartelThumbs.classList.add("thumbs");
    titleCartelThumbs.innerHTML = "éditer";
    trashThumbs.classList.add("icon-trash");
    trashThumbs.addEventListener("click", supprimmerProjet);

    galleryThumbs.appendChild(cartelThumbs);
    cartelThumbs.appendChild(trashThumbs);
    cartelThumbs.appendChild(imgCartelThumbs);
    cartelThumbs.appendChild(titleCartelThumbs);
  }
  const moveThumbs = document.createElement("div");
  moveThumbs.classList.add("icon-move");
  galleryThumbs.appendChild(moveThumbs);
}
// Function afficher la gallerie de projet de la modale
function affichageProjetModale() {
  const galleryThumb = document.querySelector("#projet-modale-galerie-photo");
  recuperationProjet().then((worksContent) => {
    galleryThumb.innerHTML = null;
    creationElementProjetModale(worksContent);
  });
}
affichageProjetModale();
// Function supprimer projet de la gallerie de projet de la modale
async function supprimmerProjet(event) {
  const parent = event.target.closest("figure");
  console.log(parent);
  const idProjet = parent.getAttribute("id");
  const options = {
    method: "DELETE",
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  const request = await fetch(urlWorks + "/" + idProjet, options);
  console.log(request);
  if (request.status === 204) {
    alert("Projet supprimer");
    affichageProjetModale();
    affichageProjet();
  } else if (request.status === 401) {
    alert("Action non authorisé");
  } else if (request.status === 500) {
    alert("Action non authorisé");
  }
}
// Function selecteur modale ajout photo
function affichageSelecteurFiltres() {
  recuperationCategories().then((categories) => {
    for (let indexCategorie in categories) {
      const selectCategories = document.querySelector("#categorie");
      const optionCategorie = document.createElement("option");
      optionCategorie.innerHTML = categories[indexCategorie].name;
      optionCategorie.classList.add("option-categorie");
      optionCategorie.setAttribute("value", categories[indexCategorie].id);
      selectCategories.appendChild(optionCategorie);
    }
  });
}
// Appel Modale gestion de la gallerie photo
function modificationAttributeModaleGestionGallerie() {
  const modaleGestionGalleriePhoto = document.querySelector("#modale-gestion-galerie-photo");
  modaleGestionGalleriePhoto.setAttribute("aria-hidden", "false");
  modaleGestionGalleriePhoto.setAttribute("aria-modal", "true");
  modaleGestionGalleriePhoto.classList.remove("modales-non-active");
  modaleGestionGalleriePhoto.classList.add("modales-active");
}
function appelModaleGestionGallerie(event) { // ne fonctionne pas si mis en function
  event.preventDefault();
  event.stopPropagation();
  modificationAttributeModaleGestionGallerie();
  ModalOverlayOn();
}
const ouvertureModaleGestionGallerie = document.querySelector("#bouton-modification-projets");
ouvertureModaleGestionGallerie.addEventListener("click", appelModaleGestionGallerie);
// Fermeture Modale gestion de la gallerie photo
function defautAttributeModaleGestionGallerie() {
  const modaleGestionGalleriePhoto = document.querySelector("#modale-gestion-galerie-photo");
  modaleGestionGalleriePhoto.setAttribute("aria-hidden", "true");
  modaleGestionGalleriePhoto.setAttribute("aria-modal", "false");
  modaleGestionGalleriePhoto.classList.remove("modales-active");
  modaleGestionGalleriePhoto.classList.add("modales-non-active");
}
function closeModaleGestionGallerie() {
  defautAttributeModaleGestionGallerie();
  ModalOverlayOff();
}
function clickFermetureModaleGestionGallerie() {
  const boutonFermetureModaleGestionGallerie = document.querySelector("#fermeture-modale-gestion-galerie");
  boutonFermetureModaleGestionGallerie.addEventListener("click", closeModaleGestionGallerie);
}
// Appel Modale ajout photo
function modificationAttributeModaleAjoutPhoto() {
  const modaleGestionAjoutPhoto = document.querySelector("#modale-gestion-ajout-photo");
  modaleGestionAjoutPhoto.setAttribute("aria-hidden", "false");
  modaleGestionAjoutPhoto.setAttribute("aria-modal", "true");
  modaleGestionAjoutPhoto.classList.remove("modales-non-active");
  modaleGestionAjoutPhoto.classList.add("modales-active");
}
function appelModaleAjoutPhoto(event) {
  event.preventDefault();
  event.stopPropagation();
  clickFermetureModaleGestionGallerie();
  modificationAttributeModaleAjoutPhoto();
  affichageSelecteurFiltres();
  ModalOverlayOn();
}
function clickAppelModaleAjoutPhoto() {
  const ouvertureModaleAjoutPhoto = document.querySelector("#bouton-appel-modale-ajout-photo");
  ouvertureModaleAjoutPhoto.addEventListener("click", appelModaleAjoutPhoto);
}
// Fermeture Modale ajout photo
function defautAttributeModaleAjoutPhoto() {
  const titre = document.querySelector("#titre");
  const categorie = document.querySelector("#categorie");
  titre.value = null;
  categorie.innerHTML = null;
  const modaleGestionAjoutPhoto = document.querySelector("#modale-gestion-ajout-photo");
  modaleGestionAjoutPhoto.setAttribute("aria-hidden", "true");
  modaleGestionAjoutPhoto.setAttribute("aria-modal", "false");
  modaleGestionAjoutPhoto.classList.remove("modales-active");
  modaleGestionAjoutPhoto.classList.add("modales-non-active");
}
function closeModaleAjoutPhoto() {
  defautAttributeModaleAjoutPhoto();
  ModalOverlayOff();
}
function clickFermetureModaleAjoutPhoto() {
  const boutonFermetureModaleAjoutPhoto = document.querySelector("#fermeture-modale-ajout-photo");
  boutonFermetureModaleAjoutPhoto.addEventListener("click",closeModaleAjoutPhoto);
}
// Retour vers Modale gestion gallerie
function ajoutPhotoVersGestionGallerie() {
  const titre = document.querySelector("#titre");
  const categorie = document.querySelector("#categorie");
  titre.value = null;
  categorie.innerHTML = null;
  const modaleGestionAjoutPhoto = document.querySelector("#modale-gestion-ajout-photo");
  modaleGestionAjoutPhoto.setAttribute("aria-hidden", "true");
  modaleGestionAjoutPhoto.setAttribute("aria-modal", "false");
  modaleGestionAjoutPhoto.classList.remove("modales-active");
  modaleGestionAjoutPhoto.classList.add("modales-non-active");
  const modaleGestionGalleriePhoto = document.querySelector("#modale-gestion-galerie-photo");
  modaleGestionGalleriePhoto.setAttribute("aria-hidden", "false");
  modaleGestionGalleriePhoto.setAttribute("aria-modal", "true");
  modaleGestionGalleriePhoto.classList.remove("modales-non-active");
  modaleGestionGalleriePhoto.classList.add("modales-active");
}
function retourModaleGestionGallerie(event) {
  event.preventDefault();
  event.stopPropagation();
  ajoutPhotoVersGestionGallerie();
  ModalOverlayOn();
}
function clickRetourModaleGestionGallerie() {
  const boutonRetourModaleGestionGallerie = document.querySelector("#retour-modale-gestion-gallerie");
  boutonRetourModaleGestionGallerie.addEventListener("click",retourModaleGestionGallerie );
}
// Fermeture des modal par click overlay
function gestionCloseModaleGestionGallerieByOverlay(event) {
  event.stopPropagation();
  console.log(event.target);
  if (
    event.target.matches("#fermeture-modale-gestion-galerie") ||
    !event.target.closest(".modale")
  ) {
    closeModaleGestionGallerie();
  }
}
function closeModaleGestionGallerieByOverlay() {
  document.addEventListener("click", gestionCloseModaleGestionGallerieByOverlay);
}
// Afichage thumb nouvelle image sélectionnée
function thumbDisplay(event) {
  const inputFile = event.target;
  const file = inputFile.files[0];
  const fileURL = URL.createObjectURL(file); //Créer un objet URL pour l'image sélectionnée

  const previewThumb = document.querySelector("#preview-thumb");
  previewThumb.src = fileURL; //Mettre à jour l'attribut src de l'élément img avec l'image sélectionnée
  previewThumb.classList.remove("preview-thumb-no-active");
  previewThumb.classList.add("preview-thumb-active");

  const containerChargementPhotoText = document.getElementById("container-chargement-photo-text"); // Masquer les éléments par défauts
  containerChargementPhotoText.classList.remove("container-chargement-photo-text" );
  containerChargementPhotoText.classList.add("container-chargement-photo-text-off");

  const boutonAjouterPhoto = document.getElementById("bouton-ajouter-photo");
  boutonAjouterPhoto.classList.remove("bouton-ajouter-photo");
  boutonAjouterPhoto.classList.add("bouton-ajouter-photo-off");

  const containerChargementPhotoImg = document.getElementById("container-chargement-photo-img");
  containerChargementPhotoImg.classList.remove("container-chargement-photo-img");
  containerChargementPhotoImg.classList.add("container-chargement-photo-img-off");
}
// Reset container loading image
function resetContainerLoadingImage(){
  const previewThumb = document.querySelector("#preview-thumb");
  previewThumb.classList.remove("preview-thumb-active");
  previewThumb.classList.add("preview-thumb-no-active");
  const containerChargementPhotoText = document.getElementById("container-chargement-photo-text");
  containerChargementPhotoText.classList.remove("container-chargement-photo-text-off" );
  containerChargementPhotoText.classList.add("container-chargement-photo-text");
  const boutonAjouterPhoto = document.getElementById("bouton-ajouter-photo");
  boutonAjouterPhoto.classList.remove("bouton-ajouter-photo-off");
  boutonAjouterPhoto.classList.add("bouton-ajouter-photo");
  const containerChargementPhotoImg = document.getElementById("container-chargement-photo-img");
  containerChargementPhotoImg.classList.remove("container-chargement-photo-img-off");
  containerChargementPhotoImg.classList.add("container-chargement-photo-img");
}
// Gestion ajout thumb nouvelle image
function gestionAjoutThumb() {
  const boutonUploadPhoto = document.querySelector("#chargement-image");
  boutonUploadPhoto.addEventListener("change", thumbDisplay);
}
// Upload nouvelle image
async function ajouterProjet(event) {
  const file = document.getElementById("chargement-image");
  const titre = document.getElementById("titre");
  const categorie = document.getElementById("categorie");

  if (
    file.files.length === 0 ||
    titre.value.trim() === "" ||
    categorie.value.trim() === ""
  ) {
    event.preventDefault();
    alert("Veuillez remplir tous les champs");
  } else {
    const boutonUploadPhoto = document.querySelector("#bouton-modale-ajout-photo");
    boutonUploadPhoto.classList.add("bouton-modale-ajout-photo-valided");

    const file = document.getElementById("chargement-image").files[0];
    const titre = document.getElementById("titre").value;
    const categorie = document.getElementById("categorie").value;

    const formData = new FormData();
    formData.append("title", titre);
    formData.append("image", file);
    formData.append("category", categorie);

    const options = {
      method: "POST",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      body: formData,
    };
    const request = await fetch(urlWorks, options);
    console.log(request);
    if (request.status === 201) {
      alert("Projet ajouté");
      affichageProjetModale();
      affichageProjet();
    } else if (request.status === 400) {
      alert("Mauvaise demande");
    } else if (request.status === 401) {
      alert("Action non autorisé");
    } else if (request.status === 500) {
      alert("Erreur inattendue");
    }
    setTimeout(function () {      
      const previewThumb = document.getElementById("preview-thumb");
      previewThumb.setAttribute("src", "");
      document.getElementById("titre").value = null;
      document.getElementById("categorie").value = null;
      resetContainerLoadingImage();
    }, 250);
  }
}
// Gestion ajout nouvelle image
function gestionAjoutPhoto() {
  const boutonUploadPhoto = document.querySelector("#bouton-modale-ajout-photo");
  boutonUploadPhoto.addEventListener("click", ajouterProjet);
}
// Lien extérieur vers le compte Instagram
function urlInstagram() {
  window.location.href = "https://www.instagram.com/openclassrooms/";
}
function lienInstagram() {
  const boutonInstagram = document.querySelector("#link-instagram");
  boutonInstagram.addEventListener("click", urlInstagram);
}
//  function main (initialise le projet)
(function main() {
  modeEditionActif();
  affichageFiltres();
  affichageProjet();
  clickFermetureModaleGestionGallerie();
  clickAppelModaleAjoutPhoto();
  clickFermetureModaleAjoutPhoto();
  clickRetourModaleGestionGallerie();
  gestionAjoutThumb();
  gestionAjoutPhoto();
  lienInstagram();
  closeModaleGestionGallerieByOverlay();
})();