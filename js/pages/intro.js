import { navigate } from "../router.js";

export function init() {
  document.getElementById("openLetter")
    .addEventListener("click", () => {
      navigate("letter");
    });
}