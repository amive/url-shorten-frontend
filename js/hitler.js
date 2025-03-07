$("#password").focusin(function () {
  $("form").addClass("up");
});
$("#password").focusout(function () {
  $("form").removeClass("up");
});

$(document).on("mousemove", function (event) {
  var dw = $(document).width() / 15;
  var dh = $(document).height() / 15;
  var x = event.pageX / dw;
  var y = event.pageY / dh;
  $(".eye-ball").css({
    width: x,
    height: y,
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const switchLinks = document.querySelectorAll(".switch");
  const hitlerHands = document.querySelectorAll(".hand");

  switchLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hitlerHands.forEach((hand) => hand.classList.add("throw"));

      setTimeout(() => {
        hitlerHands.forEach((hand) => hand.classList.remove("throw"));
      }, 1000);
    });
  });
});
