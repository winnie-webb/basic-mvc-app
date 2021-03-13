const form = document.getElementById("form");
const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const errorMessage = document.querySelector(".errorMessage");
form.action = "";

form.addEventListener("submit", registerUser);

function registerUser(e) {
  e.preventDefault();

  const userData = {
    email: email.value,
    username: username.value,
    password: password.value,
  };

  const sendFormData = () => {
    fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          window.location.href = "/auth/signin";
        }
        if (res.status === 400) {
          errorMessage.textContent = "Not an email. Please try again";
          return;
        }
        return res.json();
      })
      .then((res) => {
        const { message } = res;
        errorMessage.textContent = message;
      })

      .catch((err) => {
        console.log(err);
      });
  };
  sendFormData();
}
