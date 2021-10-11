const DEFAULT_COLOR = "#000000";
const DEFAULT_ERASE = "#F7F6F6";
const DEFAULT_MODE = "draw";
const GRID_SIZE = 16;

const GRID_CANVAS = document.querySelector("#canvas");
const COLOR_TOOL = document.querySelector("#tool-color");
const MODE_TOOLS = document.querySelectorAll("[data-mode]");
const RESET_TOOL = document.querySelector("#tool-reset");

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentHue = 0;
let mouseDown = false;

const createGridItem = (parent) => {
  const gridItem = document.createElement("div");
  parent.appendChild(gridItem);
};

const attachGrid = (parent, size) => {
  for (let i = 0; i < size * size; i += 1) {
    createGridItem(parent);
  }

  attachGridStyle(size);
};

const attachGridStyle = (size) => {
  GRID_CANVAS.style.gridTemplateColumns = returnGridTemplateStyle(size);
  GRID_CANVAS.style.gridTemplateRows = returnGridTemplateStyle(size);
};

const returnGridTemplateStyle = (size) => {
  return `${"auto ".repeat(size)}`;
};

const removeCharacter = (string, charToRemove) => {
  return string
    .split("")
    .filter((char) => char !== charToRemove)
    .join("");
};

const returnUpperCaseHexCode = (string) => {
  return removeCharacter(string, "#").toUpperCase();
};

const updateCurrentColorLabel = (node) => {
  node.nextElementSibling.textContent = returnUpperCaseHexCode(node.value);
};

const changeActiveButton = (node) => {
  node.dataset.mode !== currentMode
    ? node.classList.remove("btn-active")
    : node.classList.add("btn-active");
};

const changeActiveButtons = () => {
  MODE_TOOLS.forEach((btn) => {
    changeActiveButton(btn);
  });
};

const returnRainbowColor = () => {
  currentHue += 3;
  return `hsl(${currentHue}, 100%, 50%)`;
};

const eraseGridItem = (node) => {
  node.style.backgroundColor = DEFAULT_ERASE;
};

const drawGridItem = (node, color) => {
  node.style.backgroundColor = color;
};

const handleColorChange = (node) => {
  currentColor = node.value;
  updateCurrentColorLabel(node);
};

const handleGridEvent = (e) => {
  if (!mouseDown) return;
  switch (currentMode) {
    case "draw": {
      drawGridItem(e.target, currentColor);
      break;
    }
    case "erase": {
      eraseGridItem(e.target);
      break;
    }
    case "rainbow": {
      drawGridItem(e.target, returnRainbowColor(currentHue));
      break;
    }
  }
};

const handleReset = () => {
  GRID_CANVAS.childNodes.forEach((item) => {
    eraseGridItem(item);
  });
};

const handleModeChange = (e) => {
  currentMode = e.target.dataset.mode;
  changeActiveButtons();
};

const addEventListeners = (nodeList, type, callback) => {
  nodeList.forEach((node) => node.addEventListener(type, (e) => callback(e)));
};

window.onload = () => {
  attachGrid(GRID_CANVAS, GRID_SIZE);

  addEventListeners(GRID_CANVAS.childNodes, "mouseenter", handleGridEvent);
  addEventListeners(MODE_TOOLS, "click", handleModeChange);

  COLOR_TOOL.addEventListener("change", (e) => handleColorChange(e.target));
  RESET_TOOL.addEventListener("click", (e) => handleReset());

  GRID_CANVAS.addEventListener("mousedown", (e) => (mouseDown = true));
  GRID_CANVAS.addEventListener("mouseup", (e) => (mouseDown = false));
};
