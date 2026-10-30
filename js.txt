/* Inzmaam Ali Portfolio — interactions */
(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  // Loading screen
  const loader = $("#loader");
  window.addEventListener("load", () => {
    window.setTimeout(() => loader?.classList.add("hidden"), 450);
  });
  // Fallback in case a remote font/image delays the load event.
  window.setTimeout(() => loader?.classList.add("hidden"), 3500);

  // Current year
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  // Typing headline
  const typing = $(".typing");
  const roles = [
    "Frontend Developer",
    "Video Editor",
    "Photo Editor",
    "AI Creative Explorer"
  ];
  if (typing) {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const typeLoop = () => {
      const word = roles[roleIndex];
      typing.textContent = word.slice(0, charIndex);

      if (!deleting && charIndex < word.length) {
        charIndex++;
        window.setTimeout(typeLoop, 85);
      } else if (!deleting) {
        deleting = true;
        window.setTimeout(typeLoop, 1250);
      } else if (charIndex > 0) {
        charIndex--;
        window.setTimeout(typeLoop, 42);
      } else {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        window.setTimeout(typeLoop, 350);
      }
    };
    typeLoop();
  }

  // Mobile navigation
  const menuToggle = $("#menuToggle");
  const mainNav = $("#mainNav");
  const closeMenu = () => {
    mainNav?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = mainNav?.classList.toggle("open") ?? false;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });
  $$(".nav-link").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("click", event => {
    if (mainNav?.classList.contains("open") &&
        !mainNav.contains(event.target) &&
        !menuToggle?.contains(event.target)) closeMenu();
  });

  // Reveal on scroll
  const revealItems = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Project filters
  const filterButtons = $$(".filter-btn");
  const projectCards = $$(".project-card");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(item => item.classList.toggle("active", item === button));
      projectCards.forEach(card => {
        const matches = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !matches);
      });
    });
  });

  // Active navigation and back-to-top
  const backToTop = $("#backToTop");
  const navLinks = $$(".nav-link");
  const sections = $$("main section[id]");
  const updateScrollUI = () => {
    const scrollY = window.scrollY;
    backToTop?.classList.toggle("visible", scrollY > 500);

    let current = "home";
    sections.forEach(section => {
      if (scrollY >= section.offsetTop - 180) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };
  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();
  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Subtle custom cursor on mouse devices
  const dot = $(".cursor-dot");
  const ring = $(".cursor-ring");
  if (window.matchMedia("(pointer: fine)").matches && dot && ring) {
    document.body.classList.add("cursor-ready");
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    window.addEventListener("mousemove", event => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
    });
    const moveRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX - 15}px, ${ringY - 15}px)`;
      requestAnimationFrame(moveRing);
    };
    moveRing();
    $$("a, button, input, textarea").forEach(element => {
      element.addEventListener("mouseenter", () => {
        ring.style.width = "44px";
        ring.style.height = "44px";
        ring.style.borderColor = "rgba(77,255,154,.95)";
      });
      element.addEventListener("mouseleave", () => {
        ring.style.width = "30px";
        ring.style.height = "30px";
        ring.style.borderColor = "rgba(77,255,154,.65)";
      });
    });
  }

  // EmailJS contact form. Uses the existing service/template/public key from the supplied HTML.
  const contactForm = $("#contactForm");
  const formStatus = $("#formStatus");
  contactForm?.addEventListener("submit", async event => {
    event.preventDefault();
    const submitButton = $('button[type="submit"]', contactForm);
    const originalText = submitButton?.innerHTML || "Send Message";
    if (!window.emailjs) {
      if (formStatus) formStatus.textContent = "Email service is unavailable. Please try again later.";
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = 'Sending <i class="fa-solid fa-spinner fa-spin"></i>';
    }
    if (formStatus) formStatus.textContent = "";

    const formData = {
      name: $("#name")?.value.trim() || "",
      email: $("#email")?.value.trim() || "",
      subject: $("#subject")?.value.trim() || "",
      message: $("#message")?.value.trim() || ""
    };

    try {
      await emailjs.send("service_j5vb8wn", "template_3viv8zl", formData);
      if (formStatus) formStatus.textContent = "Message sent successfully. Thank you!";
      contactForm.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      if (formStatus) formStatus.textContent = "Message could not be sent. Please try again.";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
      }
    }
  });
})();
