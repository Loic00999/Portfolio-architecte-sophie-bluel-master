// Script JavaScript projet Portfolio architecte sophie bluel master Loïc M pour OpenClassRoom
/**
 * Le code attribue l'élément DOM avec l'identifiant « login » à la variable « login ».
 * Il attribue également l'URL « http://localhost:5678/api/users/login » à la variable « urlLogin ».
 */
const login = document.getElementById("login");
const urlLogin = "http://localhost:5678/api/users/login";

/**
 * Fonction d'envoi email & password au backend et traitement de la réponse
 * La fonction JavaScript ci-dessous gère le processus de connexion en envoyant une requête POST avec l'e-mail et le mot de passe de l'utilisateur,
 * puis stock le jeton et l'ID utilisateur reçus dans le stockage local avant de rediriger vers la page d'index.
 * @param event - Le paramètre "event" représente l'objet événement qui est transmis à la fonction de gestionnaire d'événements lorsque l'événement est déclenché.
 */
async function connection(event) {  //async
  event.preventDefault(); // Supprime le rechargement par défaut
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const emailForm = document.forms["identifier"].emailUser.value; // Stock la valeur email contenue dans les options de forms
  const passwordForm = document.forms["identifier"].passwordUser.value;
  const connectionError = document.querySelector("#connection-error");
  if (emailForm === null || passwordForm === null) { // Test la présence d'un email et d'un mot de passe
    connectionError.textContent = "Authentification requise";   
  } else {
    const login = await fetch(urlLogin, { // await
      method: "post", // post 
      headers: { // header
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ // body , stringify
        email: email.value,
        password: password.value,
      }),
    });
    if (login.status === 401) { //
      connectionError.textContent = "Action non authorisé";
    } else if (login.status === 404) {
      connectionError.textContent = "Vérifiez votre identifiant de connexion";
    } else if (login.status === 200) {
      const loginDecoded = await login.json();
      localStorage.setItem("token", loginDecoded.token); // localStorage
      localStorage.setItem("userId", loginDecoded.userId);
      window.location.href = "../index.html"; // Redirige l'utilisateur vers la page index
    }
  }
  console.log(window.localStorage);
  console.log(localStorage.length);
}
login.addEventListener("click", connection);

/**
 * La fonction "logout()" efface le stockage local et recharge la page lors du clique sur le lien de déconnexion.
 */
function logout() {
  const logout = document.querySelector("#link-logout");
  logout.addEventListener("click", function () {
    localStorage.clear(); // 
    location.reload(); // 
  });
}

/**
 * La fonction redirige l'utilisateur vers la page Instagram d'OpenClassrooms.
 */
function urlInstagram() {
  window.location.href = "https://www.instagram.com/openclassrooms/";
}

/**
 * La fonction "linkInstagram" ajoute un écouteur d'événement au bouton "iconne Instagram" avec l'identifiant "link-instagram" qui déclenche la fonction "urlInstagram" lorsqu'on clique dessus.
 */
function linkInstagram() {
  const buttonInstagram = document.querySelector("#link-instagram");
  buttonInstagram.addEventListener("click", urlInstagram);
}

/**
 * Le code "(function main() { ... })();" est une fonction auto-invoquante.
 * Il est immédiatement exécuté lorsque le script est chargé.
 */
(function main() {
  logout();
  linkInstagram();
})();
