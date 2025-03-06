function toggleForms() {
  const registerForm = document.getElementById("register");
  const loginForm = document.getElementById("login");
  const container = document.querySelector(".container");

  if (registerForm.classList.contains("visible")) {
    // Slide up the register form
    container.style.animation = "slideUp 0.5s forwards";

    setTimeout(() => {
      registerForm.classList.remove("visible");
      registerForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
      loginForm.classList.add("visible");
      // Slide down the login form
      container.style.animation = "slideDown 0.5s forwards";
    }, 500); // Match the duration of the slide up animation
  } else {
    // Slide up the login form
    container.style.animation = "slideUp 0.5s forwards";

    setTimeout(() => {
      loginForm.classList.remove("visible");
      loginForm.classList.add("hidden");
      registerForm.classList.remove("hidden");
      registerForm.classList.add("visible");
      // Slide down the register form
      container.style.animation = "slideDown 0.5s forwards";
    }, 500); // Match the duration of the slide up animation
  }
}
console.log(LogRegSwitch.js);
