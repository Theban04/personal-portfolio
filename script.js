document.addEventListener("DOMContentLoaded", function () {

  // Project filters and search
  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll("#projects article, .project-card");
  const searchInput = document.querySelector("#project-search");

  let selectedCategory = "all";
  let searchText = "";

  function showMatchingProjects() {

    projectCards.forEach(function (card) {

      const cardCategory = (card.dataset.category || "").toLowerCase();
      const cardText = card.textContent.toLowerCase();

      const matchesCategory =
        selectedCategory === "all" || cardCategory === selectedCategory;

      const matchesSearch = cardText.includes(searchText);

      card.hidden = !(matchesCategory && matchesSearch);

    });

  }

  filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      selectedCategory = (button.dataset.filter || "all").toLowerCase();

      filterButtons.forEach(function (filterButton) {
        filterButton.classList.remove("active");
        filterButton.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      showMatchingProjects();

    });

  });

  if (searchInput) {

    searchInput.addEventListener("input", function () {
      searchText = searchInput.value.trim().toLowerCase();
      showMatchingProjects();
    });

  }


  // Mobile navigation menu
  const menuButton = document.querySelector("#menu-toggle");
  const navigation = document.querySelector("#main-navigation");

  if (menuButton && navigation) {

    menuButton.addEventListener("click", function () {

      const menuIsOpen = navigation.classList.toggle("show");

      menuButton.setAttribute("aria-expanded", menuIsOpen);

    });

    navigation.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {
        navigation.classList.remove("show");
        menuButton.setAttribute("aria-expanded", "false");
      });

    });

  }


  // Highlight the navigation link for the section currently in view
  const sections = document.querySelectorAll("main section[id]");
  const navigationLinks = document.querySelectorAll("nav a[href^='#']");

  if ("IntersectionObserver" in window && sections.length > 0) {

    const sectionObserver = new IntersectionObserver(function (entries) {

      entries.forEach(function (entry) {

        if (entry.isIntersecting) {

          navigationLinks.forEach(function (link) {

            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id
            );

          });

        }

      });

    }, {
      threshold: 0.4
    });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });

  }


  // Back-to-top button
  const backToTopButton = document.querySelector("#back-to-top");

  if (backToTopButton) {

    window.addEventListener("scroll", function () {

      backToTopButton.hidden = window.scrollY < 300;

    });

    backToTopButton.addEventListener("click", function () {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }

});

document.addEventListener("DOMContentLoaded", function () {

  // Switch between the skill categories
  const skillTabs = document.querySelectorAll(".skill-tab");
  const skillPanels = document.querySelectorAll(".skill-panel");

  skillTabs.forEach(function (tab) {

    tab.addEventListener("click", function () {

      skillTabs.forEach(function (otherTab) {
        otherTab.classList.remove("active");
        otherTab.setAttribute("aria-selected", "false");
        otherTab.setAttribute("tabindex", "-1");
      });

      skillPanels.forEach(function (panel) {
        panel.hidden = true;
      });

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      tab.setAttribute("tabindex", "0");

      const panel = document.getElementById(
        tab.getAttribute("aria-controls")
      );

      if (panel) {
        panel.hidden = false;
      }

    });

  });


  // Update the progress bar as the visitor scrolls
  const progressFill = document.querySelector("#reading-progress-fill");

  function updateReadingProgress() {

    if (!progressFill) {
      return;
    }

    const pageHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const scrollAmount = window.scrollY;

    const progress = pageHeight > 0
      ? (scrollAmount / pageHeight) * 100
      : 0;

    progressFill.style.width = progress + "%";

  }

  window.addEventListener("scroll", updateReadingProgress, {
    passive: true
  });

  window.addEventListener("resize", updateReadingProgress);

  updateReadingProgress();

});