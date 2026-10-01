"use strict";
(() => {
  const config = window.GREENHOUSE_CONFIG || {};
  const actions = [
    ["learn-action", config.learnRegistrationUrl, "Register for LEARN"],
    ["build-action", config.buildApplicationUrl, "Apply for BUILD"],
    ["share-action", config.shareApplicationUrl, "Apply for SHARE"]
  ];
  for (const [id, url, label] of actions) {
    if (!url) continue;
    try {
      const target = new URL(url);
      if (target.protocol !== "https:") continue;
      const link = document.createElement("a");
      link.href = target.href;
      link.className = "btn btn-primary";
      link.append(document.createTextNode(label));
      const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      icon.setAttribute("class", "icon");
      icon.setAttribute("viewBox", "0 0 24 24");
      icon.setAttribute("aria-hidden", "true");
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M7 17 17 7M8 7h9v9");
      icon.append(path);
      link.append(icon);
      document.getElementById(id).replaceChildren(link);
    } catch { /* Leave the honest “Coming Soon” state for invalid URLs. */ }
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
