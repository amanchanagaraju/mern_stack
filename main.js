document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  loginForm.addEventListener("submit", handleLoginSubmit);
  registerForm.addEventListener("submit", handleRegisterSubmit);
});

function handleLoginSubmit(event) {
  event.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  // Replace 'http://localhost:3000' with the URL of your backend server
  const url = "http://localhost:3000/signin";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the backend here
      console.log(data);
    })
    .catch((error) => {
      console.error("Error sending login data:", error);
    });
}

function handleRegisterSubmit(event) {
  event.preventDefault();
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;

  // Replace 'http://localhost:3000' with the URL of your backend server
  const url = "http://localhost:5000/signup";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the backend here
      console.log(data);
    })
    .catch((error) => {
      console.error("Error sending registration data:", error);
    });
}
