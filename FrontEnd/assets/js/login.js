// Connexion
const login = document.getElementById("login");
const urlLogin = "http://localhost:5678/api/users/login";
// Fonction d'envoi email & password au backend et traitement de la réponse
async function connection(event) {
  event.preventDefault(); // Supprime le rechargement par défaut
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const emailForm = document.forms["identifier"].emailUser.value;
  const passwordForm = document.forms["identifier"].passwordUser.value;
  const connectionError = document.querySelector("#connection-error");
  if (emailForm === null || passwordForm === null) {
    connectionError.textContent = "Authentification requise";



    
  } else {
    const login = await fetch(urlLogin, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    if (login.status === 401) {
      connectionError.textContent = "Action non authorisé";
    } else if (login.status === 404) {
      connectionError.textContent = "Vérifiez votre identifiant de connexion";
    } else if (login.status === 200) {
      const loginDecoded = await login.json();
      localStorage.setItem("token", loginDecoded.token);
      localStorage.setItem("userId", loginDecoded.userId);
      window.location.href = "../index.html";
    }
  }
  console.log(window.localStorage);
  console.log(localStorage.length);
}
login.addEventListener("click", connection);
// Déconnexion
function logout() {
  const logout = document.querySelector("#link-logout");
  logout.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
  });
}
// Lien extérieur vers le compte Instagram
function urlInstagram() {
  window.location.href = "https://www.instagram.com/openclassrooms/";
}
function linkInstagram() {
  const buttonInstagram = document.querySelector("#link-instagram");
  buttonInstagram.addEventListener("click", urlInstagram);
}
//  function main (initialise le projet)
(function main() {
  logout();
  linkInstagram();
})();
