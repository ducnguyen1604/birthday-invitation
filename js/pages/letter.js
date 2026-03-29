import { navigate } from "../router.js";

export function init() {
  document.getElementById("letterText").innerText = `
Anh xin lỗi vì đã khiến em buồn...
Nhưng với anh, em luôn là người duy nhất và đặc biệt.
Sinh nhật năm nay, điều anh muốn nhất là được ở bên em.
`;

  document.getElementById("nextBtn")
    .addEventListener("click", () => navigate("invite"));
}