const form = document.getElementById("form");
const errorMessage = document.querySelector(".errorMessage");
const forgotPasswordLink = document.querySelector(".forgot-password");
const username = document.getElementById("username");
const password = document.getElementById("password");

form.action = "";

form.addEventListener("submit", loginUser);

function loginUser(e) {
  e.preventDefault();

  const userData = {
    username: username.value,
    password: password.value,
  };

  const sendFormData = () => {
    fetch("/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("username", userData.username);
          window.location.href = "/";
          return;
        }
        return res.json();
      })
      .then((res) => {
        const { success, message } = res;
        if (success) return;

        errorMessage.textContent = message;
        forgotPasswordLink.textContent = "Forgot password?";
      })

      .catch((err) => {
        console.log(err);
      });
  };
  sendFormData();
}
