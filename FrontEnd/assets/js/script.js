// Script JavaScript projet Portfolio architecte sophie bluel master Loïc M pour OpenClassRoom
/**
 *  Le code ci-dessous déclare deux variables constantes « urlWorks » et « urlCategories » avec une chaîne valeurs.
 *  Ces variables stockent les URL de deux points de terminaison d'API différents,
 *  "http://localhost:5678/api/works" et "http://localhost:5678/api/categories".
 */
const urlWorks = "http://localhost:5678/api/works";
const urlCategories = "http://localhost:5678/api/categories";

/**
 * La fonction "isConnected()" vérifie si un token est stocké dans le localStorage du navigateur et le renvoie.
 * @returns = La valeur de la variable "controleToken" est renvoyée.
 */
function isConnected() {
  const controleToken = localStorage.getItem("token");
  console.log(controleToken);
  return controleToken;
}

/**
 * La fonction "createModeEdition()" crée la banière d'édition du mode administrateur avec un titre, une icône et un bouton pour publier les modifications.
 */
function createModeEdition() {
  const modeEdition = document.querySelector("#mode-edition");
  modeEdition.classList.add("mode-edition");
  const divTitreModeEdition = document.createElement("div");
  divTitreModeEdition.classList.add("titre-mode-edition");
  modeEdition.appendChild(divTitreModeEdition);
  const imgTitreModeEdition = document.createElement("img");
  imgTitreModeEdition.setAttribute("src", "./assets/icons/mode-edition.png");
  imgTitreModeEdition.setAttribute("alt", "Icon mode édition");
  divTitreModeEdition.appendChild(imgTitreModeEdition);
  const spanTitreModeEdition = document.createElement("div");
  spanTitreModeEdition.innerHTML = "Mode édition";
  divTitreModeEdition.appendChild(spanTitreModeEdition);
  const divboutonPublier = document.createElement("div");
  divboutonPublier.setAttribute("id", "publier");
  divboutonPublier.classList.add("bouton-publier");
  modeEdition.appendChild(divboutonPublier);
  const spanboutonPublier = document.createElement("div");
  spanboutonPublier.innerHTML = "publier les changements";
  divboutonPublier.appendChild(spanboutonPublier);
}

/**
 * La fonction "affichageBoutonsModifier()" supprime la classe "boutons-non-connecte" et ajoute la classe "boutons-connecte" à trois boutons différents.
 * Elle permet l'affichage des boutons "modifier".
 */
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

/**
 * La fonction "recuperationCategories()" récupère les données de l'URL catégorie de l'API et renvoie la réponse JSON contenant les noms de catégories.
 * @returns = La fonction "recuperationCategories()" renvoie une promesse qui résout la réponse JSON de la requête de récupération.
 */
function recuperationCategories() {
  return fetch(urlCategories) // fetch
    .then((categories) => categories.json()) // then
    .then((categorieName) => {
      return categorieName;
    });
}
console.log(recuperationCategories());

/**
 * La fonction "affichageFiltres()" crée dynamiquement des éléments de filtre basés sur des catégories
 * et ajoute des écouteurs d'événements pour filtrer les projets en fonction de la catégorie sélectionnée.
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
        let focusFiltre = document.querySelector(".filter-item__selected");
        focusFiltre.classList.remove("filter-item__selected");
        event.target.classList.add("filter-item__selected");
      });
    }
  });
}

/**
 * La fonction "masquerFiltres()" supprime la classe "filtres-active" et ajoute la classe "filtres-non-active" à l'élément d'identifiant "filtres-visibilite".
 * Elle permet de masquer les filtre en mode administrateur connecté.
 */
function masquerFiltres() {
  const masquerFiltres = document.querySelector("#filtres-visibilite");
  masquerFiltres.classList.remove("filtres-active");
  masquerFiltres.classList.add("filtres-non-active");
}

/**
 * La fonction "modeEditionActif()" vérifie si l'utilisateur est connecté, et si c'est le cas, elle crée un mode d'édition, modifie le texte d'un lien de déconnexion,
 * ajoute un écouteur d'événement au lien de déconnexion qui efface le stockage local et recharge la page lorsque cliqué, affiche les boutons de modification et masque les filtres.
 */
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

/**
 * La fonction "recuperationProjet()" récupère les données de l'URL work de l'API et renvoie la réponse sous forme d'objet JSON.
 * @returns La fonction "recuperationProjet" renvoie une promesse qui résout le contenu JSON de la réponse de la requête "fetch".
 */
function recuperationProjet() {
  return fetch(urlWorks)
    .then((reponse) => reponse.json())
    .then((worksContent) => {
      return worksContent;
    });
}

/**
 * La fonction "affichageProjet(id = -1)" récupère les données du projet et crée des éléments HTML pour les afficher dans une galerie.
 * @param [id] - Le paramètre `id` est un paramètre facultatif dont la valeur par défaut est -1.
 * Il est utilisé pour spécifier l'ID d'un projet spécifique à afficher. Si aucun identifiant n'est fourni, tous les projets seront affichés.
 */
function affichageProjet(id = -1) {
  const gallery = document.querySelector(".gallery");
  recuperationProjet().then((worksContent) => {
    gallery.innerHTML = null; // Efface le html de la gallerie pour évite l'accumulation des fitres dans le dom après chaque clique sur un filtre
    creationElementProjet(worksContent);
  });
}

/**
 * La fonction "creationElementProjet(works)" crée des éléments HTML pour chaque œuvre dans le tableau "works" et les ajoute à l'élément ".gallery".
 * @param works - Le paramètre "works" est un tableau d'objets. Chaque objet représente une œuvre et possède les propriétés suivantes : figure, img et figcaption.
 */
function creationElementProjet(works) { // work
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

/**
 * La fonction "filtrerProjets(id = -1)" filtre une liste de projets en fonction d'un ID de catégorie donné et met à jour l'élément de galerie sur la page Web avec les projets filtrés.
 * @param [id] - Le paramètre "id" est un paramètre facultatif qui représente l'ID de catégorie.
 * Si un ID de catégorie valide est fourni, la fonction filtrera les projets en fonction de cet ID de catégorie.
 * Si aucun identifiant de catégorie n'est fourni (ou si la valeur est -1), la fonction n'appliquera aucun filtrage et affichera tout les projets.
 */
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

/**
 * Les fonctions ci-dessous basculent la visibilité de l'overlay des modales en ajoutant ou en supprimant des classes CSS.
 */
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

/**
 * La fonction "creationModaleGestiongallerie()" définit les attributs de l'élément modal de la gestion de la galerie photo.
 */
function creationModaleGestiongallerie() {
  const modaleGestionGalleriePhoto = document.querySelector("#modale-gestion-galerie-photo");
  modaleGestionGalleriePhoto.setAttribute("aria-hidden", "true");
  modaleGestionGalleriePhoto.setAttribute("aria-modal", "false");
  modaleGestionGalleriePhoto.setAttribute("role", "dialog");
  modaleGestionGalleriePhoto.setAttribute("aria-labelledby", "gestion");
}
creationModaleGestiongallerie();

/**
 * La fonction "creationModaleAjoutPhoto()" définit les attributs de l'élément modal de l'ajout de photos.
 */
function creationModaleAjoutPhoto() {
  const modaleGestionAjoutPhoto = document.querySelector("#modale-gestion-ajout-photo");
  modaleGestionAjoutPhoto.setAttribute("aria-hidden", "true");
  modaleGestionAjoutPhoto.setAttribute("aria-modal", "false");
  modaleGestionAjoutPhoto.setAttribute("role", "dialog");
  modaleGestionAjoutPhoto.setAttribute("aria-labelledby", "ajout");
}
creationModaleAjoutPhoto();

/**
 * La fonction "creationElementProjetModale()" crée des éléments HTML pour la galerie de projets les images et textes récupéré de l'API.
 * @param works - Le paramètre "works" est un tableau d'objets.
 * Chaque objet représente une œuvre et possède les propriétés suivantes : figure, img et figcaption ainsy que éléments de suppresions d'image et iconne de mouvement
 */
function creationElementProjetModale(works) {
  const galleryThumbs = document.querySelector("#projet-modale-galerie-photo");
  for (indexWorks in works) {
    const cartelThumbs = document.createElement("figure");
    const imgCartelThumbs = document.createElement("img");
    const titleCartelThumbs = document.createElement("figcaption");
    const trashThumbs = document.createElement("div");

    cartelThumbs.setAttribute("id", works[indexWorks].id);
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

/**
 * La fonction "affichageProjetModale()" récupère le contenu du projet et crée des éléments pour afficher la modal de projet après récupération des données de l'API.
 */
function affichageProjetModale() {
  const galleryThumb = document.querySelector("#projet-modale-galerie-photo");
  recuperationProjet().then((worksContent) => {
    galleryThumb.innerHTML = null;
    creationElementProjetModale(worksContent);
  });
}
affichageProjetModale();

/**
 * La fonction "supprimmerProjet(event)" est une fonction asynchrone qui supprime un projet en envoyant une requête DELETE à l'URL de l'API et en gérant différents statuts de réponse.
 * @param event - Le paramètre `event` est un objet événement qui représente l'événement qui a déclenché la fonction.
 */
async function supprimmerProjet(event) {
  const parent = event.target.closest("figure"); // closest 
  console.log(parent);
  const idProjet = parent.getAttribute("id");
  const options = {
    method: "DELETE", // delete 
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }, // bearer 
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

/**
 * La fonction "affichageSelecteurFiltres()" récupère les catégories et crée dynamiquement les boutons de filtrage avec en options l'identifiant correspondant à leurs "categorie".
 */
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

/**
 * La fonction modifie les attributs et les classes de la modal de gestion de la gallerie pour la rendre visible et active.
 */
function modificationAttributeModaleGestionGallerie() {
  const modaleGestionGalleriePhoto = document.querySelector("#modale-gestion-galerie-photo");
  modaleGestionGalleriePhoto.setAttribute("aria-hidden", "false");
  modaleGestionGalleriePhoto.setAttribute("aria-modal", "true");
  modaleGestionGalleriePhoto.classList.remove("modales-non-active");
  modaleGestionGalleriePhoto.classList.add("modales-active");
}

/**
 * La fonction "appelModaleGestionGallerie()" est utilisée pour gérer l'événement lorsque le bouton avec l'identifiant "bouton-modification-projets" est cliqué, empêchant le comportement par défaut et empêchant la propagation de l'événement.
 */
function appelModaleGestionGallerie(event) { // ne fonctionne pas si mis en function
  event.preventDefault();
  event.stopPropagation();
  modificationAttributeModaleGestionGallerie();
  ModalOverlayOn();
}
const ouvertureModaleGestionGallerie = document.querySelector("#bouton-modification-projets");
ouvertureModaleGestionGallerie.addEventListener("click", appelModaleGestionGallerie);

/**
 * La fonction définit les attributs et les classes par défaut pour la modal de la gestion de la galerie de photos.
 * Elle permet de masquer la modale.
 */
function defautAttributeModaleGestionGallerie() {
  const modaleGestionGalleriePhoto = document.querySelector("#modale-gestion-galerie-photo");
  modaleGestionGalleriePhoto.setAttribute("aria-hidden", "true");
  modaleGestionGalleriePhoto.setAttribute("aria-modal", "false");
  modaleGestionGalleriePhoto.classList.remove("modales-active");
  modaleGestionGalleriePhoto.classList.add("modales-non-active");
}

/**
 * La fonction "closeModaleGestionGallerie()" ferme un modal de gestion de la galerie en réinitialisant ses attributs et en désactivant l'overlay.
 */
function closeModaleGestionGallerie() {
  defautAttributeModaleGestionGallerie();
  ModalOverlayOff();
}

/**
 * La fonction "clickFermetureModaleGestionGallerie()" ajoute un écouteur d'événement de clic à un bouton avec l'identifiant "fermeture-modale-gestion-galerie" et appelle la fonction "closeModaleGestionGallerie()" lorsque le bouton est cliqué.
 */
function clickFermetureModaleGestionGallerie() {
  const boutonFermetureModaleGestionGallerie = document.querySelector("#fermeture-modale-gestion-galerie");
  boutonFermetureModaleGestionGallerie.addEventListener("click", closeModaleGestionGallerie);
}

/**
 * La fonction modifie les attributsde la modal d'a jout de photo pour la rendre visible et active.
 */
function modificationAttributeModaleAjoutPhoto() {
  const modaleGestionAjoutPhoto = document.querySelector("#modale-gestion-ajout-photo");
  modaleGestionAjoutPhoto.setAttribute("aria-hidden", "false");
  modaleGestionAjoutPhoto.setAttribute("aria-modal", "true");
  modaleGestionAjoutPhoto.classList.remove("modales-non-active");
  modaleGestionAjoutPhoto.classList.add("modales-active");
}

/**
 * La fonction "appelModaleAjoutPhoto(event)" est utilisée pour ouvrir la modal d'ajouter de photo, empêchant le comportement d'événement par défaut et arrêtant la propagation de l'événement.
 */
function appelModaleAjoutPhoto(event) {
  event.preventDefault();
  event.stopPropagation();
  clickFermetureModaleGestionGallerie();
  modificationAttributeModaleAjoutPhoto();
  affichageSelecteurFiltres();
  ModalOverlayOn();
}

/**
 * La fonction "clickAppelModaleAjoutPhoto()" ajoute un écouteur d'événement à un bouton qui déclenche la fonction "appelModaleAjoutPhoto(event)" lorsqu'on clique dessus.
 */
function clickAppelModaleAjoutPhoto() {
  const ouvertureModaleAjoutPhoto = document.querySelector("#bouton-appel-modale-ajout-photo");
  ouvertureModaleAjoutPhoto.addEventListener("click", appelModaleAjoutPhoto);
}

/**
 * La fonction "defautAttributeModaleAjoutPhoto()" réinitialise les valeurs et attributs d'un élément modal lié à l'ajout de photos.
 */
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

/**
 * La fonction "closeModaleAjoutPhoto()" réinitialise les attributs de la modal pour ajouter des photos et désactive l'overlay.
 * Elle permet de masquer la modale.
 */
function closeModaleAjoutPhoto() {
  defautAttributeModaleAjoutPhoto();
  ModalOverlayOff();
}

/**
 * La fonction "clickFermetureModaleAjoutPhoto()" ajoute un écouteur d'événement à un bouton avec l'identifiant "fermeture-modale-ajout-photo" qui déclenche la fonction "closeModaleAjoutPhoto" lorsqu'on clique dessus.
 */
function clickFermetureModaleAjoutPhoto() {
  const boutonFermetureModaleAjoutPhoto = document.querySelector("#fermeture-modale-ajout-photo");
  boutonFermetureModaleAjoutPhoto.addEventListener("click",closeModaleAjoutPhoto);
}

/**
 * La fonction "ajoutPhotoVersGestionGallerie()" permet de passer du modal "Ajouter une photo" au modal "Gestion de la galerie".
 */
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

/**
 * La fonction "retourModaleGestionGallerie" empêche le comportement par défaut d'un événement, empêche l'événement de se propager davantage, ajoute une photo à la galerie et active l'overlay.
 */
function retourModaleGestionGallerie(event) {
  event.preventDefault();
  event.stopPropagation();
  ajoutPhotoVersGestionGallerie();
  ModalOverlayOn();
}

/**
 * La fonction "clickRetourModaleGestionGallerie()" ajoute un écouteur d'événement de clic à un bouton avec l'identifiant "retour-modale-gestion-gallerie" et appelle la fonction "retourModaleGestionGallerie" lorsque le bouton est cliqué.
 */
function clickRetourModaleGestionGallerie() {
  const boutonRetourModaleGestionGallerie = document.querySelector("#retour-modale-gestion-gallerie");
  boutonRetourModaleGestionGallerie.addEventListener("click",retourModaleGestionGallerie );
}

/**
 * La fonction "gestionCloseModaleGestionGallerieByOverlay(event)" permet de fermer un modal de gestion d'une galerie lorsque l'on clique sur l'overlay ou sur le bouton de fermeture.
 */
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

/**
 * La fonction ajoute un écouteur d'événement au contenu de la page extérieure à la modale.
 */
function closeModaleGestionGallerieByOverlay() {
  document.addEventListener("click", gestionCloseModaleGestionGallerieByOverlay);
}

/**
 * La fonction `thumbDisplay` est utilisée pour afficher l'image miniature du fichier qui est sélectionné.
 */
function thumbDisplay(event) {
  const inputFile = event.target;
  const file = inputFile.files[0];
  const fileURL = URL.createObjectURL(file); // 

  const previewThumb = document.querySelector("#preview-thumb");
  previewThumb.src = fileURL;
  previewThumb.classList.remove("preview-thumb-no-active");
  previewThumb.classList.add("preview-thumb-active");

  const containerChargementPhotoText = document.getElementById("container-chargement-photo-text");
  containerChargementPhotoText.classList.remove("container-chargement-photo-text" );
  containerChargementPhotoText.classList.add("container-chargement-photo-text-off");

  const boutonAjouterPhoto = document.getElementById("bouton-ajouter-photo");
  boutonAjouterPhoto.classList.remove("bouton-ajouter-photo");
  boutonAjouterPhoto.classList.add("bouton-ajouter-photo-off");

  const containerChargementPhotoImg = document.getElementById("container-chargement-photo-img");
  containerChargementPhotoImg.classList.remove("container-chargement-photo-img");
  containerChargementPhotoImg.classList.add("container-chargement-photo-img-off");
}

/**
 * La fonction réinitialise la modale ajout de photo en supprimant et en ajoutant des classes CSS spécifiques à différents éléments.
 */
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

/**
 * La fonction "gestionAjoutThumb()" ajoute un écouteur d'événement au bouton "chargement-image" et appelle la fonction "thumbDisplay" lorsque la valeur du bouton change.
 */
function gestionAjoutThumb() {
  const boutonUploadPhoto = document.querySelector("#chargement-image");
  boutonUploadPhoto.addEventListener("change", thumbDisplay);
}

/**
 * La fonction "ajouterProjet(event)" est une fonction asynchrone qui gère l'événement d'ajout d'un projet en vérifiant si tous les champs obligatoires sont remplis, en téléchargeant l'image et les détails du projet sur le serveur et en affichant les alertes appropriées en fonction de l'état de la réponse.
 */
async function ajouterProjet(event) {
  const file = document.getElementById("chargement-image");
  const titre = document.getElementById("titre");
  const categorie = document.getElementById("categorie");

  if (
    file.files.length === 0 ||
    titre.value.trim() === "" ||
    categorie.value.trim() === "" // trim
  ) {
    event.preventDefault();
    alert("Veuillez remplir tous les champs");
  } else {
    const boutonUploadPhoto = document.querySelector("#bouton-modale-ajout-photo");
    boutonUploadPhoto.classList.add("bouton-modale-ajout-photo-valided");

    const file = document.getElementById("chargement-image").files[0];
    const titre = document.getElementById("titre").value;
    const categorie = document.getElementById("categorie").value;

    const formData = new FormData(); // formdata
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

/**
 * La fonction "gestionAjoutPhoto()" ajoute un écouteur d'événement à un bouton d'identifiant "bouton-modale-ajout-photo" et appelle la fonction "ajouterProjet" lorsque le bouton est cliqué.
 */
function gestionAjoutPhoto() {
  const boutonUploadPhoto = document.querySelector("#bouton-modale-ajout-photo");
  boutonUploadPhoto.addEventListener("click", ajouterProjet);
}

/**
 * Le code JavaScript ci-dessus définit une fonction qui redirige l'utilisateur vers la page Instagram d'OpenClassrooms lorsqu'un bouton portant l'identifiant « lien-instagram » est cliqué.
 */
function urlInstagram() {
  window.location.href = "https://www.instagram.com/openclassrooms/";
}
function lienInstagram() {
  const boutonInstagram = document.querySelector("#link-instagram");
  boutonInstagram.addEventListener("click", urlInstagram);
}

//  function main (initialise le projet)
/* Le code ci-dessus est une fonction auto-invoquante en JavaScript. Il exécute une série de fonctions qui effectuent diverses tâches liées à la gestion d'une galerie. */
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
