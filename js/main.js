// Blueprint AI Training: shared behavior
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

  // Training planner (home): one question at a time, then a prefilled WhatsApp
  // message. Everything stays in the page; nothing is sent or stored.
  var planner = document.querySelector("[data-planner]");
  if (planner) {
    // REPLACE: WhatsApp number, digits only, country code first
    var WA_NUMBER = "601153238181";

    var steps = [].slice.call(planner.querySelectorAll("[data-step]"));
    var result = planner.querySelector("[data-result]");
    var countEl = planner.querySelector("[data-planner-count]");
    var fillEl = planner.querySelector("[data-planner-fill]");
    var navEl = planner.querySelector("[data-planner-nav]");
    var backBtn = planner.querySelector("[data-back]");
    var restartBtn = planner.querySelector("[data-restart]");
    var summaryList = planner.querySelector("[data-summary-list]");
    var companyInput = planner.querySelector("[data-company]");
    var waLink = planner.querySelector("[data-wa]");

    var answers = {};   // key -> chosen text
    var index = 0;      // which question is showing; steps.length means the result

    var show = function (next, focusIt) {
      index = Math.max(0, Math.min(next, steps.length));
      var atResult = index === steps.length;

      steps.forEach(function (step, i) { step.classList.toggle("is-active", !atResult && i === index); });
      result.classList.toggle("is-active", atResult);

      countEl.textContent = atResult
        ? "All " + steps.length + " answered"
        : "Question " + (index + 1) + " of " + steps.length;
      fillEl.style.transform = "scaleX(" + (atResult ? 1 : index / steps.length) + ")";

      backBtn.hidden = index === 0;
      restartBtn.hidden = !atResult;
      navEl.hidden = backBtn.hidden && restartBtn.hidden;

      if (atResult) { render(); }
      if (focusIt) {
        var target = atResult ? result.querySelector(".planner-q") : steps[index].querySelector(".planner-q");
        if (target) {
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        }
      }
    };

    var message = function () {
      var company = companyInput && companyInput.value.trim();
      var lines = ["Hi Blueprint AI Training, I used the planner on your website.", ""];
      if (company) { lines.push("Company: " + company); }
      steps.forEach(function (step) {
        var key = step.getAttribute("data-key");
        if (answers[key]) { lines.push(step.getAttribute("data-summary") + ": " + answers[key]); }
      });
      lines.push("", "Could you tell me which format you'd run for us, with an outline and a rough cost?");
      return lines.join("\n");
    };

    var render = function () {
      summaryList.innerHTML = "";
      steps.forEach(function (step, i) {
        var key = step.getAttribute("data-key");
        if (!answers[key]) { return; }
        var li = document.createElement("li");
        var btn = document.createElement("button");
        btn.type = "button";
        btn.setAttribute("aria-label", "Change answer: " + step.getAttribute("data-summary"));
        var k = document.createElement("span");
        k.className = "planner-summary-key";
        k.textContent = step.getAttribute("data-summary");
        var v = document.createElement("span");
        v.textContent = answers[key];
        btn.appendChild(k);
        btn.appendChild(v);
        btn.addEventListener("click", function () { show(i, true); });
        li.appendChild(btn);
        summaryList.appendChild(li);
      });

      waLink.href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(message());
    };

    steps.forEach(function (step, i) {
      var key = step.getAttribute("data-key");
      step.querySelectorAll(".opt").forEach(function (opt) {
        opt.addEventListener("click", function () {
          step.querySelectorAll(".opt").forEach(function (o) {
            o.classList.toggle("is-picked", o === opt);
            o.setAttribute("aria-pressed", o === opt ? "true" : "false");
          });
          answers[key] = opt.getAttribute("data-value");
          // Once every question has an answer, editing one returns to the result
          var complete = steps.every(function (s) { return answers[s.getAttribute("data-key")]; });
          // Let the picked state register before moving on
          window.setTimeout(function () { show(complete ? steps.length : i + 1, true); }, 180);
        });
      });
    });

    backBtn.addEventListener("click", function () { show(index - 1, true); });
    restartBtn.addEventListener("click", function () {
      answers = {};
      planner.querySelectorAll(".opt").forEach(function (o) {
        o.classList.remove("is-picked");
        o.removeAttribute("aria-pressed");
      });
      if (companyInput) { companyInput.value = ""; }
      show(0, true);
    });
    if (companyInput) { companyInput.addEventListener("input", render); }

    show(0, false);
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
