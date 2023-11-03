const gridContainer = document.querySelector(".grid-container");
const gridSize = 16 * 16;

// API to select and change css properties.
const stylesheet = document.styleSheets[0];
const gridContainerRule = [...stylesheet.cssRules].find(
  (r) => r.selectorText === ".grid-container"
);

// Initialize starting 16 x 16 grid.
createGrid(gridSize);

// Grid size functions
function createGrid(size) {
  for (let i = 0; i < size; i++) {
    const gridDiv = document.createElement("div");
    gridDiv.classList.add("grid-item");
    gridContainer.appendChild(gridDiv);
    gridDiv.addEventListener("mouseover", makeGridItemBgColorBlack);
  }
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

// Grid style functions
function makeGridItemBgColorBlack(e) {
  removeMouseOverEvent(makeGridItemBgColorRandom);
  addMouseOverEvent(makeGridItemBgColorBlack);
  e.target.style.backgroundColor = "black";
}

function makeGridItemBgColorRandom(e) {
  removeMouseOverEvent(makeGridItemBgColorBlack);
  addMouseOverEvent(makeGridItemBgColorRandom);
  e.target.style.backgroundColor = `rgb(${randomIntegerGenerator(
    256
  )},${randomIntegerGenerator(256)},${randomIntegerGenerator(256)})`;
}

function makeGridItemBgColorDarken(e){
  removeMouseOverEvent(makeGridItemBgColorBlack);
  removeMouseOverEvent(makeGridItemBgColorRandom);
  addMouseOverEvent(makeGridItemBgColorDarken);
  e.target.style.filter = "brightness(0%)";
}

function removeMouseOverEvent(currentEvent) {
  const nodeList = gridContainer.childNodes;
  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].removeEventListener("mouseover", currentEvent);
  }
}

function addMouseOverEvent(currentEvent) {
  const nodeList = gridContainer.childNodes;
  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].addEventListener("mouseover", currentEvent);
  }
}

// Helper functions
function randomIntegerGenerator(rangeValue) {
  return Math.floor(Math.random() * rangeValue);
}
