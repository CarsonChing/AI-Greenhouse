"use strict";
(() => {
  const config = window.GREENHOUSE_CONFIG || {};
  const actions = [
    ["learn-action", config.learnRegistrationUrl, "Register for LEARN"],
    ["build-action", config.buildApplicationUrl, "Apply for BUILD"]
  ];
  for (const [id, url, label] of actions) {
    if (!url) continue;
    try {
      const target = new URL(url);
      if (target.protocol !== "https:") continue;
      const link = document.createElement("a");
      link.href = target.href;
      link.className = "button registration active";
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
})();
