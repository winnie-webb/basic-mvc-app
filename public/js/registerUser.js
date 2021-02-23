const form = document.getElementById("form");
const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");

form.action = "";

form.addEventListener("submit", registerUser);

function registerUser(e) {
  e.preventDefault();

  const userData = {
    email: email.value,
    username: username.value,
    password: password.value,
  };

  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      console.log(res);
      if (res.status === 201) {
        window.location.href = "/signin";
      }
    })

    .catch((err) => {
      console.log(err);
    });
}
