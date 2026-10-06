"use strict";
(() => {
  const config = window.GREENHOUSE_CONFIG || {};
  const createAction = (url, label, note, variant = "primary", download = false) => {
    if (!url) return null;
    try {
      const target = new URL(url, window.location.href);
      if (!download && target.protocol !== "https:") return null;
      if (download && target.origin !== window.location.origin) return null;
      const link = document.createElement("a");
      link.href = target.href;
      link.className = `btn btn-${variant}`;
      const copy = document.createElement("span");
      const title = document.createElement("strong");
      title.textContent = label;
      copy.append(title);
      if (note) {
        const detail = document.createElement("small");
        detail.textContent = note;
        copy.append(detail);
      }
      link.append(copy);
      const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      icon.setAttribute("class", "icon");
      icon.setAttribute("viewBox", "0 0 24 24");
      icon.setAttribute("aria-hidden", "true");
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M7 17 17 7M8 7h9v9");
      icon.append(path);
      link.append(icon);
      return link;
    } catch {
      return null;
    }
  };

  const actions = [
    ["learn-action", config.learnRegistrationUrl, "Register for LEARN", "", "primary"],
    ["build-proposal-action", config.buildProposalApplicationUrl, "Apply with a proposal", "I have a project idea", "build"],
    ["build-without-proposal-action", config.buildWithoutProposalUrl, "Apply as an individual", "I want to join a team", "build"],
    ["build-proposal-menu-action", config.buildProposalApplicationUrl, "BUILD · With proposal", "Submit your project idea", "build"],
    ["build-without-proposal-menu-action", config.buildWithoutProposalUrl, "BUILD · As an individual", "Ask to join a team", "build"],
    ["build-template-action", config.buildTemplateUrl, "Download proposal template", "Markdown (.md)", "secondary", true],
    ["share-presenter-action", config.sharePresenterRegistrationUrl, "Register as a presenter", "Share your project", "primary"],
    ["share-audience-action", config.shareAudienceRegistrationUrl, "Register as an audience", "Join Demo Day", "secondary"],
    ["share-presenter-menu-action", config.sharePresenterRegistrationUrl, "SHARE · Presenter", "Share your project", "primary"],
    ["share-audience-menu-action", config.shareAudienceRegistrationUrl, "SHARE · Audience", "Join Demo Day", "secondary"]
  ];
  for (const [id, url, label, note, variant, download] of actions) {
    const link = createAction(url, label, note, variant, download);
    const container = document.getElementById(id);
    if (link && container) container.replaceChildren(link);
  }

  const bindDetailsModal = (openSelector, dialog, closeSelector) => {
    const detailsButtons = [...document.querySelectorAll(openSelector)];
    if (!detailsButtons.length || !dialog) return;
    const highlightsTitle = dialog.querySelector("h2");
    const closeDetailsButton = dialog.querySelector(closeSelector);
    detailsButtons.forEach((button) => button.addEventListener("click", () => {
      dialog.showModal();
      highlightsTitle?.focus({ preventScroll: true });
    }));
    closeDetailsButton?.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      const bounds = dialog.getBoundingClientRect();
      const inside = event.clientX >= bounds.left && event.clientX <= bounds.right
        && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
      if (!inside) dialog.close();
    });
  };

  bindDetailsModal("[data-learn-modal-open]", document.getElementById("learn-details-modal"), "[data-learn-modal-close]");
  bindDetailsModal("[data-build-modal-open]", document.getElementById("build-details-modal"), "[data-build-modal-close]");

  const carousel = document.querySelector("[data-carousel]");
  if (carousel) {
    const track = carousel.querySelector(".hero-track");
    const slides = [...carousel.querySelectorAll("[data-carousel-slide]")];
    const dots = [...carousel.querySelectorAll("[data-carousel-dot]")];
    const previous = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current = 0;
    let timer = null;
    const paused = reduceMotion;

    const show = (index) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === current;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
        slide.inert = !active;
      });
      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === current;
        dot.classList.toggle("is-active", active);
        if (active) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    };

    const stopTimer = () => {
      window.clearTimeout(timer);
      timer = null;
    };

    const startTimer = () => {
      stopTimer();
      if (paused || document.hidden || carousel.matches(":hover")) return;
      timer = window.setTimeout(() => {
        show(current + 1);
        startTimer();
      }, 5000);
    };

    const choose = (index) => {
      show(index);
      startTimer();
    };

    previous?.addEventListener("click", () => choose(current - 1));
    next?.addEventListener("click", () => choose(current + 1));
    dots.forEach((dot) => dot.addEventListener("click", () => choose(Number(dot.dataset.carouselDot))));

    if (track) {
      let touchStartX = 0;
      let touchStartY = 0;
      track.addEventListener("touchstart", (event) => {
        if (event.touches.length !== 1) return;
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
        stopTimer();
      }, { passive: true });
      track.addEventListener("touchend", (event) => {
        const touch = event.changedTouches[0];
        const horizontal = touch.clientX - touchStartX;
        const vertical = touch.clientY - touchStartY;
        if (Math.abs(horizontal) >= 50 && Math.abs(horizontal) > Math.abs(vertical) * 1.2) {
          choose(current + (horizontal < 0 ? 1 : -1));
        } else {
          startTimer();
        }
      }, { passive: true });
      track.addEventListener("touchcancel", startTimer, { passive: true });
    }

    carousel.addEventListener("mouseenter", stopTimer);
    carousel.addEventListener("mouseleave", startTimer);
    carousel.addEventListener("focusin", stopTimer);
    carousel.addEventListener("focusout", (event) => {
      if (!carousel.contains(event.relatedTarget)) startTimer();
    });
    document.addEventListener("visibilitychange", startTimer);

    show(0);
    startTimer();
  }

})();
