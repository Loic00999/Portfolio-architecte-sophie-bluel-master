/**
 *  Connexion
 */
localStorage.clear();

const login = document.getElementById("login");
const urlLogin = "http://localhost:5678/api/users/login";

async function connexion(event) {
  event.preventDefault(); // Supprime le rechargement par défaut
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  if (email === "" || password === "") {
    const loginFail = document.getElementById("loginFail");
    loginFail.textContent = "Authentification requise";
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

    const loginDecoded = await login.json();
    localStorage.setItem("token", loginDecoded.token);
    localStorage.setItem("userId", loginDecoded.userId);
    window.location.href = "../index.html";
  }
  console.log(window.localStorage);
  console.log(localStorage.length);
}
login.addEventListener("click", connexion);
/**
 * Lien extérieur vers le compte Instagram
 */
const linkInstagram = document.querySelector("#link-instagram");
linkInstagram.addEventListener('click', function () {
  window.location.href = "https://www.instagram.com/openclassrooms/";
});
/**
 * localStorage méthodes et propriétés.
 *
 * - setItem(key, value) = localStorage.getItem("",""); > const Test = { lettre:"a", nombre: 1} > localStorage.getItem("test", JSON.stringify(Test));
 * - getItem(key) = localStorage.getItem("");
 * - removeItem(key) = localStorage.removeItem("");
 * - key(index) = localStorage.key();
 * - localStorage.clear();
 * - length = console.log(localStorage.length);
 */
