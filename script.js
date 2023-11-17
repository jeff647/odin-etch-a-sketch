const gridContainer = document.querySelector(".grid-container");
const gridSize = 16 * 16;
let userSize = gridSize;

const buttonAudio = new Audio("./buttonClick.wav");
const buttons = document.querySelectorAll("button");
buttonAudio.volume = 0.3;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttonAudio.load();
    buttonAudio.play();
  });
});

// API to select and change css properties.
const stylesheet = document.styleSheets[0];
const gridContainerRule = [...stylesheet.cssRules].find(
  (r) => r.selectorText === ".grid-container"
);

// Initialize starting 16 x 16 grid with black mouseover as default event
createGrid(gridSize);

// Create a grid based on size and event parameter
function createGrid(size, event = makeGridItemBgBlack) {
  emptyGridContainer();
  resizeGridTemplateColumns(Math.sqrt(size));
  for (let i = 0; i < size; i++) {
    const gridDiv = document.createElement("div");
    gridDiv.classList.add("grid-item");
    // Initialize brightness for darkening function
    gridDiv.style.filter = "brightness(100%)";
    gridContainer.appendChild(gridDiv);
  }
  addMouseOverEvent(event);
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
  emptyGridContainer();
  resizeGridTemplateColumns(parsedUserSizeInput);
  createGrid(convertedUserSize);
  userSize = convertedUserSize;
}

// Empty grid container by removing all child node
function emptyGridContainer() {
  let child = gridContainer.lastElementChild;
  while (child) {
    gridContainer.removeChild(child);
    child = gridContainer.lastElementChild;
  }
}

// Update css property to resize squares to fit container fully
function resizeGridTemplateColumns(columns) {
  gridContainerRule.style.setProperty(
    "grid-template-columns",
    `repeat(${columns}, auto)`
  );
}

// Add event listener to grid items
function addMouseOverEvent(currentEvent) {
  removeMouseOverEvent(makeGridItemBgBlack);
  removeMouseOverEvent(makeGridItemBgRandom);
  removeMouseOverEvent(makeGridItemBgDarken);
  removeMouseOverEvent(makeGridItemBgLighten);
  const nodeList = gridContainer.childNodes;
  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].addEventListener("mouseover", currentEvent);
  }
}
// Remove event listeners to grid items
function removeMouseOverEvent(currentEvent) {
  const nodeList = gridContainer.childNodes;
  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].removeEventListener("mouseover", currentEvent);
  }
}

// Style Functions

function makeGridItemBgBlack(evt) {
  evt.target.style.backgroundColor = "hsl(0, 0%, 0%)";
}

function makeGridItemBgRandom(evt) {
  evt.target.style.backgroundColor = `rgb(${randomIntegerGenerator(
    256
  )},${randomIntegerGenerator(256)},${randomIntegerGenerator(256)})`;
}

// Reduce element brightness by 10% each time event is triggered (Min 0)
function makeGridItemBgDarken(evt) {
  let brightnessLevelArray = evt.target.style.filter.match(numberRegex);
  let brightnessLevel = parseInt(brightnessLevelArray[0]);

  if (brightnessLevel > 0) {
    evt.target.style.filter = `brightness(${brightnessLevel - 10}%)`;
  }
}

// Increase element brightness by 10% each time event is triggered (Max 100)
function makeGridItemBgLighten(evt) {
  let brightnessLevelArray = evt.target.style.filter.match(numberRegex);
  let brightnessLevel = parseInt(brightnessLevelArray[0]);

  if (brightnessLevel < 100) {
    evt.target.style.filter = `brightness(${brightnessLevel + 10}%)`;
  }
}

function erase(evt) {
  evt.target.style.backgroundColor = "hsl(0, 0%, 100%)";
  evt.target.style.filter = "brightness(100%)";
}

// HELPER FUNCTIONS

// Return number from 0 up to but excluding rangeValue
function randomIntegerGenerator(rangeValue) {
  return Math.floor(Math.random() * rangeValue);
}

const numberRegex = /\d+/;
