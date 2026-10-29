// Feature 1: Filter project cards by category.
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll("#projects article");
const projectSearch = document.getElementById("project-search");

let activeCategory = "all";

function updateProjects() {

  const searchText = projectSearch
    ? projectSearch.value.trim().toLowerCase()
    : "";

  projectCards.forEach(function (project) {

    const categoryMatches =
      activeCategory === "all" ||
      project.dataset.category === activeCategory;

    // Feature 2: Search project titles and descriptions.
    const searchMatches =
      project.textContent.toLowerCase().includes(searchText);

    project.hidden = !(categoryMatches && searchMatches);

  });

}

filterButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    activeCategory = button.dataset.filter;

    filterButtons.forEach(function (filterButton) {

      filterButton.setAttribute("aria-pressed", "false");

    });

    button.setAttribute("aria-pressed", "true");
    updateProjects();

  });

});

if (projectSearch) {

  projectSearch.addEventListener("input", updateProjects);

}


// Feature 3: Open and close the mobile navigation menu.
const menuButton = document.getElementById("menu-toggle");
const navigation = document.getElementById("main-navigation");

if (menuButton && navigation) {

  menuButton.addEventListener("click", function () {

    const menuIsOpen = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", menuIsOpen);

  });

  navigation.querySelectorAll("a").forEach(function (link) {

    link.addEventListener("click", function () {

      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");

    });

  });

}


// Feature 4: Highlight the navigation link for the section in view.
const pageSections = document.querySelectorAll("main section[id]");
const pageLinks = document.querySelectorAll(
  "#main-navigation a[href^='#']"
);

function updateActiveLink() {

  let currentSection = pageSections.length > 0
    ? pageSections[0].id
    : "";

  pageSections.forEach(function (section) {

    if (section.getBoundingClientRect().top <= 150) {
      currentSection = section.id;
    }

  });

  pageLinks.forEach(function (link) {

    const linkIsActive =
      link.getAttribute("href") === "#" + currentSection;

    link.classList.toggle("active", linkIsActive);

    if (linkIsActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }

  });

}

window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink();


// Feature 5: Show a button that returns the visitor to the top.
const backToTopButton = document.getElementById("back-to-top");

if (backToTopButton) {

  function updateBackToTopButton() {

    backToTopButton.hidden = window.scrollY < 300;

  }

  window.addEventListener("scroll", updateBackToTopButton, {
    passive: true
  });

  backToTopButton.addEventListener("click", function () {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

  updateBackToTopButton();

}