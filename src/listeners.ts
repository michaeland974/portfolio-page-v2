const buttons = document.querySelectorAll(".controls > button");
const slider = document.querySelector("#slide-container");
const cards = [...document.querySelectorAll("#slide-container .card")];

buttons.forEach((button) => {
  button.addEventListener("click", () => {

    const motion = button.getAttribute("data-slider");
    const offset = (motion === "next" ? 1 : -1);
    const active = document.querySelector("[data-active]");
    const currentIndex = cards.indexOf(active!);
    let newIndex = currentIndex + offset;

    if(newIndex < 0){
      newIndex = cards.length-1;
    }
    else if(newIndex >= cards.length){
      newIndex = 0;
    }

    cards[currentIndex].removeAttribute("data-active");
    cards[newIndex].setAttribute("data-active", "");

    const relativePositionOffset = 2;
    const relativePositionValue = -(newIndex - relativePositionOffset);
    slider!.setAttribute("data-position", `${relativePositionValue}`);
  });
});
