//animations for appearing into viewport

// Function to add the fade-in-animation class when an element enters the viewport
const handleIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-animation");
      observer.unobserve(entry.target); // Remove observer once animation is applied
    }
  });
};

// Create an Intersection Observer
const observer = new IntersectionObserver(handleIntersection, {
  root: null, // Use the viewport as the root
  rootMargin: "0px", // No margin
  threshold: 0.2, // Trigger when at least 20% of the element is visible
});

// Observe elements with the class "fade-in-element"
const fadeElements = document.querySelectorAll(".fade-in-element");
fadeElements.forEach((element) => {
  observer.observe(element);
});

// end animations

//accordion and wrapper appearence animations

let acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    let accordionPlusIcon = this.querySelector(".accordionPlusIcon");

    if (panel.style.maxHeight && panel.style.maxHeight !== "0px") {
      panel.style.maxHeight = "0";
      accordionPlusIcon.textContent = "+";
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      accordionPlusIcon.textContent = "-";
    }
  });
}

// // Get the modal
// var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("videoitem3");

// // When the user clicks the button, open the modal
// btn.onclick = function () {
//   modal.style.display = "block";
// };

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };

////*** The masonry JS stuff ***/
// Create a script element
var script = document.createElement("script");

// Set the source attribute to the Isotope library URL
script.src =
  "https://cdnjs.cloudflare.com/ajax/libs/jquery.isotope/3.0.6/isotope.pkgd.min.js";

// Set the onload callback to initialize Isotope after the script has loaded
script.onload = function () {
  // Initialize Isotope
  var grid = document.querySelector(".masonry-grid");
  var isotope = new Isotope(grid, {
    itemSelector: ".grid-item",
    masonry: {
      columnWidth: ".grid-item",
      gutter: 20,
      isFitWidth: true,
    },
  });

  // Trigger Isotope layout after each image is loaded
  const images = grid.querySelectorAll("img");
  images.forEach((image) => {
    image.addEventListener("load", () => isotope.layout());
  });
};

// Append the script element to the document body
document.body.appendChild(script);

// Get modal elements
var modal = document.getElementById("itemModal");
var modalLeft = document.getElementById("modalLeft");
var modalRight = document.getElementById("modalRight");

// Get all grid items
var gridItems = document.querySelectorAll(".grid-item");

// Attach click event listener to each grid item
gridItems.forEach(function (item) {
  item.addEventListener("click", function () {
    // Check if the clicked item is a newsItem
    if (item.classList.contains("newsItem")) {
      // Do nothing for newsItem, you can add any other logic if needed
      return;
    }

    // Get the content based on the clicked item
    var content = getContentForItem(item);

    // Separate the content for left and right sides
    var leftContent = getLeftContentForItem(item);
    var rightContent = getRightContentForItem(item);

    // Populate modal content
    modalLeft.innerHTML = leftContent;
    modalRight.innerHTML = rightContent;

    // Display the modal
    modal.style.display = "block";
  });
});

// Close the modal if the overlay is clicked
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Function to get content based on the clicked item
function getContentForItem(item) {
  if (item.classList.contains("xText")) {
    return item.innerHTML; // Assuming the content is directly in the xText item
  } else if (
    item.classList.contains("socialImage") ||
    item.classList.contains("instaItem")
  ) {
    // Extract image and description from the clicked item
    var image = item.querySelector(".socialImageImg").src;
    var description = item.querySelector(".socialPostDescription").innerText;
    return `<img src="${image}" class="modal-image"/><div class="modal-description">${description}</div>`;
  } else if (item.classList.contains("newsItem")) {
    // Extract image and title from the clicked news item
    var newsImage = item.querySelector(".newsImage").src;
    var newsTitle = item.querySelector(".h3News").innerText;
    return `<img src="${newsImage}" class="modal-image"/><div class="modal-title">${newsTitle}</div>`;
  } else {
    // Default content for other items
    return "Default Content";
  }
}

// Function to get content for the left side of the modal
function getLeftContentForItem(item) {
  if (
    item.classList.contains("socialImage") ||
    item.classList.contains("instaItem") ||
    item.classList.contains("newsItem")
  ) {
    // Extract image from the clicked item
    var image =
      item.querySelector(".socialImageImg")?.src ||
      item.querySelector(".newsImage")?.src;
    return `<img src="${image}" class="modal-image"/>`;
  } else {
    // Default content for other items
    return "";
  }
}

// Function to get content for the right side of the modal
function getRightContentForItem(item) {
  if (item.classList.contains("xText")) {
    // Extract content from the xText item
    return item.innerHTML;
  } else if (
    item.classList.contains("socialImage") ||
    item.classList.contains("instaItem") ||
    item.classList.contains("newsItem")
  ) {
    // Extract description and profile info from the clicked item
    var description =
      item.querySelector(".socialPostDescription")?.innerText ||
      item.querySelector(".h3News")?.innerText;
    var profileInfo = item.querySelector(".socialProfileInfo")?.innerHTML;
    return `<div class="modal-description">${description}</div><div class="modal-profile-info">${profileInfo}</div>`;
  } else {
    // Default content for other items
    return "";
  }
}

// Function to hide items beyond the first 10 upon load
document
  .getElementById("leaderboardExpandOpen")
  .addEventListener("click", () =>
    toggleItems("leaderboardOpen", "leaderboardExpandOpen")
  );

var eventLeaderboardItemsOpen = document.querySelectorAll(
  "#leaderboardOpen .itemLeaderboard"
);
for (var i = 10; i < eventLeaderboardItemsOpen.length; i++) {
  eventLeaderboardItemsOpen[i].classList.add("hidden");
}

document
  .getElementById("leaderboardExpandWomen")
  .addEventListener("click", () =>
    toggleItems("leaderboardWomen", "leaderboardExpandWomen")
  );

var eventLeaderboardItemsWomen = document.querySelectorAll(
  "#leaderboardWomen .itemLeaderboard"
);
for (var i = 10; i < eventLeaderboardItemsWomen.length; i++) {
  eventLeaderboardItemsWomen[i].classList.add("hidden");
}

document
  .getElementById("leaderboardExpandSeniors")
  .addEventListener("click", () =>
    toggleItems("leaderboardSeniors", "leaderboardExpandSeniors")
  );

var eventLeaderboardItemsSeniors = document.querySelectorAll(
  "#leaderboardSeniors .itemLeaderboard"
);
for (var i = 10; i < eventLeaderboardItemsSeniors.length; i++) {
  eventLeaderboardItemsSeniors[i].classList.add("hidden");
}

document
  .getElementById("leaderboardExpandJuniors")
  .addEventListener("click", () =>
    toggleItems("leaderboardJuniors", "leaderboardExpandJuniors")
  );

var eventLeaderboardItemsJuniors = document.querySelectorAll(
  "#leaderboardJuniors .itemLeaderboard"
);
for (var i = 10; i < eventLeaderboardItemsJuniors.length; i++) {
  eventLeaderboardItemsJuniors[i].classList.add("hidden");
}

document
  .getElementById("leaderboardExpandGirls")
  .addEventListener("click", () =>
    toggleItems("leaderboardGirls", "leaderboardExpandGirls")
  );

var eventLeaderboardItemsGirls = document.querySelectorAll(
  "#leaderboardGirls .itemLeaderboard"
);
for (var i = 10; i < eventLeaderboardItemsGirls.length; i++) {
  eventLeaderboardItemsGirls[i].classList.add("hidden");
}

function toggleItems(containerId, buttonId) {
  // Get all items with class "itemLeaderboard" inside the specified container
  var eventLeaderboardItems = document.querySelectorAll(
    `#${containerId} .itemLeaderboard`
  );

  // Loop through items starting from the 11th position and toggle classes
  for (var i = 10; i < eventLeaderboardItems.length; i++) {
    eventLeaderboardItems[i].classList.toggle("hidden");
    eventLeaderboardItems[i].classList.toggle("beyondVisible");
  }

  // Toggle the button label using getElementById
  var button = document.getElementById(buttonId);
  var isHidden = eventLeaderboardItems[10].classList.contains("hidden");
  button.innerHTML = isHidden ? "Show top 100" : "Close";

  // Scroll to the leaderboard element only when "Close" button is clicked
  if (!isHidden) {
    button.addEventListener(
      "click",
      () => {
        document
          .getElementById("leaderboard")
          .scrollIntoView({ behavior: "smooth" });
      },
      { once: true }
    );
  }
}

//carousel
document
  .querySelector(".carousel-button.prev")
  .addEventListener("click", () => scrollCarousel(-1));

document
  .querySelector(".carousel-button.next")
  .addEventListener("click", () => scrollCarousel(1));

function scrollCarousel(direction) {
  const container = document.querySelector(".carousel-container");
  const itemWidth = container.querySelector(".eventLeaderboard").offsetWidth;
  const scrollAmount = direction > 0 ? itemWidth : -itemWidth;
  container.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
}
