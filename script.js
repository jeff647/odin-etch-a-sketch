const gridContainer = document.querySelector(".grid-container");
const gridSize = 16 * 16;

// API to select and change css properties.
const stylesheet = document.styleSheets[0];
const gridContainerRule = [...stylesheet.cssRules].find(
  (r) => r.selectorText === ".grid-container"
);

// Initialize starting 16 x 16 grid.
createGrid(gridSize);

function createGrid(size) {
  for (let i = 0; i < size; i++) {
    const gridDiv = document.createElement("div");
    gridDiv.classList.add("grid-item");
    gridDiv.textContent = i + 1;
    gridContainer.appendChild(gridDiv);
    gridDiv.addEventListener("mouseover", (e) => {
      e.target.style.backgroundColor = "black";
    });
  }
}

function customSize() {
  let userSizeInput = prompt("Enter the number of squares per side: ");
  let convertedUserSize = userSizeInput ** 2;
  // Empty grid container by removing all child nodes.
  let child = gridContainer.lastElementChild;
  while (child) {
    gridContainer.removeChild(child);
    child = gridContainer.lastElementChild;
  }
  gridContainerRule.style.setProperty(
    "grid-template-columns",
    `repeat(${userSizeInput}, auto)`
  );
  createGrid(convertedUserSize);
}
