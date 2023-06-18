const urlWorks = "http://localhost:5678/api/works";
const urlCategories = "http://localhost:5678/api/categories";

/***function clear gallery ***/
/*
function clearGallery(){
  const gallery = document.querySelect(".gallery");
  gallery.innerHTML = "";
}
clearGallery();
*/
/***ajouter les boutons filtres ***/
async function recuperationCategories() {
  await fetch(urlCategories)
    .then((retour) => retour.json())
    .then((categorieName) => {
      let indexCategorie;
      for (indexCategorie in categorieName) {
        const divFiltreParent = document.querySelector(".filters");
        const filterDiv = document.createElement("div");
        filterDiv.innerHTML = categorieName[indexCategorie].name;
        filterDiv.classList.add("filter-item");
        divFiltreParent.appendChild(filterDiv);
      }
    });
}
recuperationCategories();

/***ajouter les images ***/
async function affichageProjet() {
  const gallery = document.querySelector(".gallery");
  fetch(urlWorks)
    .then((reponse) => reponse.json())
    .then((worksContent) => {
        for (indexWorks in worksContent) {

        const cartel = document.createElement("figure");
        cartel.setAttribute("id", worksContent[indexWorks].category.name);
        gallery.appendChild(cartel);

        const imgCartel = document.createElement("img");
        imgCartel.src = worksContent[indexWorks].imageUrl;
        cartel.appendChild(imgCartel);

        const titleCartel = document.createElement("figcaption");
        titleCartel.innerHTML = worksContent[indexWorks].title;
        cartel.appendChild(titleCartel);
      }
    });
}
affichageProjet();

/***ajouter addEventListener sur les boutons filtres ***/
const eventFilters = document.querySelectorAll(".filter-item");






