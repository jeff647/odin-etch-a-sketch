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
    gridContainer.appendChild(gridDiv);
    gridDiv.addEventListener("mouseover", makeGridItemBlack);
  }
}

function makeGridItemBlack(event) {
  event.target.style.backgroundColor = "black";
}

function customSize() {
  let userSizeInput = prompt(
    "Enter the number of squares per side: (Maximum 100)"
  );
  let parsedUserSizeInput = parseInt(userSizeInput);
  if (isNaN(parsedUserSizeInput)) {
    alert(`${userSizeInput} is not a valid number!`);
    return;
  } else if (parsedUserSizeInput > 100) {
    alert(
      `${parsedUserSizeInput} is too big. Size set to default maximum of 100.`
    );
    parsedUserSizeInput = 100;
  }
  let convertedUserSize = parsedUserSizeInput ** 2;
  // Empty grid container by removing all child nodes.
  let child = gridContainer.lastElementChild;
  while (child) {
    gridContainer.removeChild(child);
    child = gridContainer.lastElementChild;
  }
  gridContainerRule.style.setProperty(
    "grid-template-columns",
    `repeat(${parsedUserSizeInput}, auto)`
  );
  createGrid(convertedUserSize);
}

function removeMouseOverEvent() {
  const nodeList = gridContainer.childNodes;
  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].removeEventListener("mouseover", makeGridItemBlack);
  }
}
