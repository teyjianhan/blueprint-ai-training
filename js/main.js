// Blueprint AI Training: shared behavior
(function () {
  document.documentElement.classList.add("js");

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  // Department marquee: give every name its own blur, from its own distance to
  // the centre, so a name is sharp in the middle and soft at the edges.
  //
  // The blur belongs to the WORD, not to the region of screen it is crossing.
  // Defocusing by region (a mask, a blurred copy underneath) cuts through the
  // middle of a name and leaves one end sharp and the other soft, which reads
  // as a glow around the word instead of depth.
  //
  // Steadiness comes from quantising. Blur is rounded to a step, so a name only
  // gets a new filter at the few moments it crosses one, instead of every
  // frame; a filter that changes every frame re-blurs moving content and boils.
  // Reads are batched ahead of writes so measuring never forces a reflow
  // mid-loop, and the whole thing idles while the section is off-screen.
  var deptMarquee = document.querySelector("[data-dept-marquee]");
  var stillPreferred = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (deptMarquee && !stillPreferred) {
    var names = deptMarquee.querySelectorAll(".dept-track > span");
    var css = getComputedStyle(deptMarquee);
    var num = function (prop, fallback) {
      var v = parseFloat(css.getPropertyValue(prop));
      return isNaN(v) ? fallback : v;
    };
    var focus = num("--dept-focus", 0.25);      // share of width kept sharp
    var maxBlur = num("--dept-blur-max", 5.5);  // px at the outer edge
    var ease = num("--dept-blur-ease", 1.2);    // falloff curve past the focus
    var step = num("--dept-blur-step", 0.4);    // px quantisation
    var applied = new Array(names.length);
    var pending = new Array(names.length);
    var visible = true;

    var measure = function () {
      var box = deptMarquee.getBoundingClientRect();
      var mid = box.left + box.width / 2;
      var half = box.width / 2 || 1;
      for (var i = 0; i < names.length; i++) {
        var r = names[i].getBoundingClientRect();
        var d = Math.min(1, Math.abs(r.left + r.width / 2 - mid) / half);
        // Hold focus across the middle, then ease outward. The exponent keeps
        // the first part of the ramp gentle so names drift out of focus rather
        // than snapping, while still reaching full blur at the edge.
        var t = d <= focus ? 0 : (d - focus) / (1 - focus);
        pending[i] = Math.round(Math.pow(t, ease) * maxBlur / step) * step;
      }
      for (var j = 0; j < names.length; j++) {
        if (pending[j] !== applied[j]) {
          applied[j] = pending[j];
          names[j].style.setProperty("--b", pending[j]);
        }
      }
    };

    var last = 0;
    var loop = function (now) {
      if (visible && now - last > 90) { last = now; measure(); }
      requestAnimationFrame(loop);
    };
    measure();
    requestAnimationFrame(loop);

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
      }).observe(deptMarquee);
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
