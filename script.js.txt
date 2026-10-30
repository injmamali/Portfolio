/* =========================================
   INZMAAM ALI PORTFOLIO - FIXED SCRIPT
   Works with the supplied index.html/style.css
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // 1) Loading screen
  const loader = $("#loader");
  const hideLoader = () => {
    if (loader) loader.classList.add("hidden");
  };
  window.addEventListener("load", hideLoader, { once: true });
  // Fallback in case an external asset takes too long to load.
  window.setTimeout(hideLoader, 4500);

  // 2) Typing animation
  const typing = $(".typing");
  if (typing) {
    const words = [
      "Frontend Developer",
      "Video Editor",
      "Photo Editor",
      "AI Creative Explorer"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const typeEffect = () => {
      const word = words[wordIndex];
      typing.textContent = word.slice(0, charIndex);

      if (!deleting && charIndex < word.length) {
        charIndex++;
        window.setTimeout(typeEffect, 105);
      } else if (!deleting) {
        deleting = true;
        window.setTimeout(typeEffect, 1250);
      } else if (charIndex > 0) {
        charIndex--;
        window.setTimeout(typeEffect, 48);
      } else {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        window.setTimeout(typeEffect, 300);
      }
    };
    typeEffect();
  }

  // 3) Mobile navigation (IDs matched to index.html)
  const menuToggle = $("#menuToggle");
  const mainNav = $("#mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
      const icon = $("i", menuToggle);
      if (icon) {
        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-xmark", isOpen);
      }
    });

    $$(".nav-link", mainNav).forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        const icon = $("i", menuToggle);
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-xmark");
        }
      });
    });

    document.addEventListener("click", event => {
      if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        const icon = $("i", menuToggle);
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-xmark");
        }
      }
    });
  }

  // 4) Back-to-top button
  const backToTop = $("#backToTop");
  const updateBackToTop = () => {
    if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 400);
  };
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 5) Custom cursor (matches .cursor-dot and .cursor-ring in HTML/CSS)
  const cursorDot = $(".cursor-dot");
  const cursorRing = $(".cursor-ring");
  const canUseCustomCursor = window.matchMedia("(pointer: fine)").matches;

  if (cursorDot && cursorRing && canUseCustomCursor) {
    document.body.classList.add("cursor-ready");
    document.addEventListener("mousemove", event => {
      cursorDot.style.left = `${event.clientX}px`;
      cursorDot.style.top = `${event.clientY}px`;
      cursorRing.style.left = `${event.clientX - 15}px`;
      cursorRing.style.top = `${event.clientY - 15}px`;
    });

    $$("a, button, input, textarea").forEach(element => {
      element.addEventListener("mouseenter", () => {
        cursorRing.style.width = "42px";
        cursorRing.style.height = "42px";
      });
      element.addEventListener("mouseleave", () => {
        cursorRing.style.width = "30px";
        cursorRing.style.height = "30px";
      });
    });
  }

  // 6) Reveal animations
  const revealItems = $$(".reveal");
  if ("IntersectionObserver" in window) {
    document.body.classList.add("reveal-ready");
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: "0px 0px 80px 0px" });

    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // 7) Project filters
  const filterButtons = $$(".filter-btn");
  const projectCards = $$(".project-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";

      filterButtons.forEach(item => item.classList.toggle("active", item === button));

      projectCards.forEach(card => {
        const show = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  // 8) Active navigation link while scrolling
  const navLinks = $$(".nav-link");
  const sections = $$("main section[id]");

  if ("IntersectionObserver" in window && navLinks.length && sections.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });

    sections.forEach(section => sectionObserver.observe(section));
  }

  // 9) Header scroll styling
  const header = $(".site-header");
  const updateHeader = () => {
    if (header) {
      header.style.boxShadow = window.scrollY > 40
        ? "0 10px 35px rgba(0,0,0,.38)"
        : "0 10px 45px rgba(0,0,0,.25)";
    }
  };
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  // 10) Footer year
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  // 11) Contact form - EmailJS
  const contactForm = $("#contactForm");
  const formStatus = $("#formStatus");
  const submitButton = $(".submit-button", contactForm || document);

  if (contactForm) {
    contactForm.addEventListener("submit", async event => {
      event.preventDefault();

      if (!contactForm.reportValidity()) return;

      if (!window.emailjs || typeof window.emailjs.send !== "function") {
        if (formStatus) {
          formStatus.textContent = "Email service load nahi hui. Please page refresh karke dobara try karein.";
        }
        return;
      }

      const formData = {
        name: $("#name", contactForm)?.value.trim() || "",
        email: $("#email", contactForm)?.value.trim() || "",
        subject: $("#subject", contactForm)?.value.trim() || "",
        message: $("#message", contactForm)?.value.trim() || ""
      };

      if (formStatus) formStatus.textContent = "Sending message...";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.style.opacity = "0.65";
      }

      try {
        // These IDs are retained from the supplied script.
        // Confirm they match the EmailJS account and email template.
        await window.emailjs.send("service_j5vb8wn", "template_3viv8zl", formData);
        if (formStatus) formStatus.textContent = "Message sent successfully!";
        contactForm.reset();
      } catch (error) {
        console.error("EmailJS error:", error);
        if (formStatus) {
          formStatus.textContent = "Message send nahi hua. EmailJS service/template settings check karein.";
        }
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.style.opacity = "";
        }
      }
    });
  }

  console.log("%cPortfolio script loaded successfully", "color:#4dff9a;font-weight:bold;");
});
