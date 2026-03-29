const routes = {
  intro: "/pages/intro.html",
  letter: "/pages/letter.html",
  invite: "/pages/invite.html",
  plan: "/pages/plan.html",
  result: "/pages/result.html",
};

export async function navigate(page) {
  const app = document.getElementById("app");
  const res = await fetch(routes[page]);
  const html = await res.text();
  app.innerHTML = html;

  // load JS tương ứng
  const module = await import(`./pages/${page}.js`);
  module.init();
}