"use strict";
(() => {
  const config = window.GREENHOUSE_CONFIG || {};
  const createAction = (url, label, note, variant = "primary") => {
    if (!url) return null;
    try {
      const target = new URL(url);
      if (target.protocol !== "https:") return null;
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
    ["build-proposal-action", config.buildProposalApplicationUrl, "Apply with a proposal", "I have a project idea", "primary"],
    ["build-without-proposal-action", config.buildWithoutProposalUrl, "Apply without a proposal", "I want to join a team", "secondary"],
    ["build-proposal-menu-action", config.buildProposalApplicationUrl, "BUILD · With proposal", "Submit your project idea", "primary"],
    ["build-without-proposal-menu-action", config.buildWithoutProposalUrl, "BUILD · Without proposal", "Ask to join a team", "secondary"],
    ["share-action", config.shareApplicationUrl, "Apply for SHARE", "", "primary"]
  ];
  for (const [id, url, label, note, variant] of actions) {
    const link = createAction(url, label, note, variant);
    const container = document.getElementById(id);
    if (link && container) container.replaceChildren(link);
  }

  const detailsButton = document.querySelector(".hero-details");
  const highlights = document.getElementById("highlights");
  const highlightsTitle = document.getElementById("highlights-title");
  if (detailsButton && highlights && highlightsTitle) {
    detailsButton.addEventListener("click", () => {
      const open = highlights.hasAttribute("hidden");
      highlights.toggleAttribute("hidden", !open);
      detailsButton.setAttribute("aria-expanded", String(open));
      detailsButton.textContent = open ? "Hide details" : "See details";
      if (!open) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      highlights.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      highlightsTitle.focus();
    });
  }
})();
