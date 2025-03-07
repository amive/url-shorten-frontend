function toggleForms() {
  const registerForm = document.getElementById("register");
  const loginForm = document.getElementById("login");
  const hitlerHands = document.querySelectorAll(".hand");

  if (registerForm.classList.contains("visible")) {
    hitlerHands.forEach((hand) => hand.classList.add("slide-in"));

    setTimeout(() => {
      registerForm.classList.remove("visible");
      registerForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
      loginForm.classList.add("visible", "slide-in");

      hitlerHands.forEach((hand) => hand.classList.remove("slide-in"));
    }, 500);
  } else {
    hitlerHands.forEach((hand) => hand.classList.add("slide-in"));
    loginForm.classList.add("slide-in");

    setTimeout(() => {
      loginForm.classList.remove("visible");
      loginForm.classList.add("hidden");
      registerForm.classList.remove("hidden");
      registerForm.classList.add("visible", "slide-in");

      hitlerHands.forEach((hand) => hand.classList.remove("slide-in"));
    }, 500);
  }
}
