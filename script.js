const gridContainer = document.querySelector(".grid-container");
const gridSize = 16 * 16;

for (let i = 0; i < gridSize; i++) {
  const gridDiv = document.createElement("div");
  gridDiv.classList.add("grid-item");
  gridDiv.textContent = i + 1;
  gridContainer.appendChild(gridDiv);
}
