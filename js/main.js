// Blueprint AI Training — shared behavior
(function () {
  document.documentElement.classList.add("js");

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  // Workshop route diagram: draw the lines when it scrolls into view
  var routeMap = document.querySelector("[data-route]");
  if (routeMap) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            routeMap.classList.add("is-live");
            io.disconnect();
          }
        });
      }, { threshold: 0.3 });
      io.observe(routeMap);
    } else {
      routeMap.classList.add("is-live");
    }
  }

  // Scroll-triggered moments (logo wall, highlight sweep): add .is-in once
  var revealables = document.querySelectorAll("[data-in]");
  if (revealables.length) {
    if ("IntersectionObserver" in window) {
      var ro = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            ro.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });
      revealables.forEach(function (el) { ro.observe(el); });
    } else {
      revealables.forEach(function (el) { el.classList.add("is-in"); });
    }
  }

  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-locked", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
})();
