"use strict";
(() => {
  const INITIAL_VOTES = 10;
  const MAX_DIALOGS = 5;
  const detailsCopy = {
    learn: {
      kicker: "01 / EXPLORE",
      title: "Learn",
      body: "Wednesday 7 October, 8:00–9:30 pm, in A-303A at Shun Hing College. Open to all JCSV III residents. No coding experience is needed."
    },
    build: {
      kicker: "02 / EXPERIMENT",
      title: "Build",
      body: "Applications close on 16 October at 23:59 HKT. Bring a project idea, or apply as an individual and ask to join a team."
    },
    share: {
      kicker: "03 / CONNECT",
      title: "Share",
      body: "Demo Day is an informal evening in mid-November. Presenter and audience registration will open closer to the event."
    }
  };

  const template = document.getElementById("demo-details-template");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const resetButton = document.querySelector("[data-reset]");
  const upvoteButton = document.querySelector("[data-vote-up]");
  const downvoteButton = document.querySelector("[data-vote-down]");
  const voteCount = document.querySelector("[data-vote-count]");
  const faqItems = [...document.querySelectorAll("[data-faq]")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let votes = INITIAL_VOTES;

  const renderVotes = () => {
    if (voteCount) voteCount.textContent = String(votes);
  };

  const fillModal = (modal, copy) => {
    modal.setAttribute("aria-label", copy.title);
    modal.querySelector("[data-detail-kicker]").textContent = copy.kicker;
    modal.querySelector("[data-detail-title]").textContent = copy.title;
    modal.querySelector("[data-detail-body]").textContent = copy.body;
  };

  const presentModal = (modal, layer) => {
    modal.style.setProperty("--demo-layer", String(layer));
    const mask = modal.querySelector(".demo-modal-mask");
    const panel = modal.querySelector(".demo-modal-panel");
    mask.style.zIndex = String(100 + layer);
    panel.style.zIndex = String(300 + layer);
    document.body.append(modal);
    document.body.classList.add("demo-modal-open");
    const closeButton = modal.querySelector("[data-demo-close]");
    closeButton.addEventListener("click", () => {
      // DEBUG BUG 1: Close creates another modal instead of closing it
      const openCount = document.querySelectorAll(".demo-modal").length;
      if (openCount >= MAX_DIALOGS) {
        closeButton.textContent = "Too many dialogs!";
        return;
      }
      const clone = modal.cloneNode(true);
      presentModal(clone, openCount);
    });
    closeButton.focus();
  };

  document.querySelectorAll("[data-demo-details]").forEach((button) => {
    button.addEventListener("click", () => {
      const copy = detailsCopy[button.getAttribute("data-demo-details")];
      if (!copy || !template || document.querySelector(".demo-modal")) return;
      const modal = template.content.cloneNode(true).querySelector(".demo-modal");
      fillModal(modal, copy);
      presentModal(modal, 0);
    });
  });

  faqItems.forEach((item, index) => {
    item.querySelector("summary")?.addEventListener("click", (event) => {
      event.preventDefault();
      // DEBUG BUG 2: FAQ opens the next item instead of the clicked one
      const wrongIndex = (index + 1) % faqItems.length;
      const target = faqItems[wrongIndex];
      target.open = !target.open;
    });
  });

  const vote = (button, change) => {
    // DEBUG BUG 3: Both vote buttons change the count in the opposite direction.
    votes += change;
    renderVotes();
    if (reduceMotion) return;
    button.classList.remove("is-bounce");
    void button.offsetWidth;
    button.classList.add("is-bounce");
    voteCount?.classList.remove("is-dropping");
    void voteCount?.offsetWidth;
    voteCount?.classList.add("is-dropping");
    const floater = document.createElement("span");
    floater.className = "demo-vote-float";
    floater.textContent = change > 0 ? "+1" : "-1";
    button.append(floater);
    floater.addEventListener("animationend", () => floater.remove());
  };
  upvoteButton?.addEventListener("click", () => vote(upvoteButton, -1));
  downvoteButton?.addEventListener("click", () => vote(downvoteButton, 1));

  themeToggle?.addEventListener("click", () => {
    // DEBUG BUG 4: Dark mode triggers a blackout instead of theme switch
    document.body.classList.add("blackout");
    themeToggle.setAttribute("aria-pressed", "true");
  });

  resetButton?.addEventListener("click", () => {
    // Reset all demo demo states
    document.querySelectorAll(".demo-modal, .demo-vote-float").forEach((node) => node.remove());
    document.body.classList.remove("blackout", "demo-modal-open");
    faqItems.forEach((item) => {
      item.open = false;
    });
    votes = INITIAL_VOTES;
    renderVotes();
    upvoteButton?.classList.remove("is-bounce");
    downvoteButton?.classList.remove("is-bounce");
    voteCount?.classList.remove("is-dropping");
    themeToggle?.setAttribute("aria-pressed", "false");
  });

  renderVotes();
})();
