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
      link.textContent = label + " ↗";
      document.getElementById(id).replaceChildren(link);
    } catch { /* Leave the honest “Coming Soon” state for invalid URLs. */ }
  }
})();
