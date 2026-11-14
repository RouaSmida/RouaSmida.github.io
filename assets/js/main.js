(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function stored() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }

  function apply(theme) {
    root.dataset.theme = theme;
    if (toggle) {
      toggle.setAttribute("aria-label", "Switch to " + (theme === "dark" ? "light" : "dark") + " theme");
    }
  }

  // Theme toggle (the button stays hidden when JS is unavailable).
  if (toggle) {
    toggle.hidden = false;
    apply(root.dataset.theme || (systemDark.matches ? "dark" : "light"));
    toggle.addEventListener("click", function () {
      var next = root.dataset.theme === "dark" ? "light" : "dark";
      try { localStorage.setItem("theme", next); } catch (e) { /* private mode */ }
      apply(next);
    });
    // Follow the system until the visitor makes an explicit choice.
    systemDark.addEventListener("change", function (event) {
      if (!stored()) { apply(event.matches ? "dark" : "light"); }
    });
  }

  // Highlight the nav link of the section currently in view.
  var links = document.querySelectorAll('.site-nav a[href^="#"]');
  if (links.length && "IntersectionObserver" in window) {
    var byId = {};
    links.forEach(function (link) { byId[link.getAttribute("href").slice(1)] = link; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        links.forEach(function (link) { link.removeAttribute("aria-current"); });
        byId[entry.target.id].setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) { observer.observe(section); }
    });
  }

  var year = document.getElementById("year");
  if (year) { year.textContent = String(new Date().getFullYear()); }
})();
