const urlCategories = "http://localhost:5678/api/categories";

const galleryCartel = document.getElementsByClassName("gallery");
const oldCartel = document.getElementsByName("figure");
const oldImgCartel = document.getElementsByName("img");
const oldTitleCartel = document.getElementsByName("figcaption");
const cartel = document.createElement("figure");
const imgCartel = document.createElement("img");
const titleCartel = document.createElement("figcaption");


// supp contenue id gallery

// div id filters en second enfant

//création filtres 

function affichageCategorie(){
  const filtreCartel = document.getElementById("filters");




}


function affichageProjet(){}



const filterInput = document.createElement("input");
filterInput.classList.add("");
filterInput.setAttribute("type", "submit");
filterInput.setAttribute("value", "");
.appendChild(filterInput);





function recuperationCategories() {
  // Récupération des catégories de l'API
  fetch(urlCategories)
    .then((reponse) => reponse.json())
    //.then(() => {});

}
recuperationCategories();


/*
let slide;
function createSpansDot(){
  for (slide in slides) {
    const spanDot = document.createElement("span");
    spanDot.setAttribute("id", slide);
    spanDot.classList.add("dot");
    document.querySelector(".dots").appendChild(spanDot);
    if (slide == 0) {
      spanDot.classList.add("dot_selected");
    }
  }
}
createSpansDot();
*/



















