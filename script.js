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

// creates an empty div and attaches it to the passed parent
const createGridItem = (parent) => {
  const gridItem = document.createElement("div");
  parent.appendChild(gridItem);
};

// attaches a square grid of [size x size] filled with empty divs
// to the passed parent
const attachGrid = (parent, size) => {
  for (let i = 0; i < size * size; i += 1) {
    createGridItem(parent);
  }

  attachGridStyle(size);
};

// attaches required css styles to display square grid
const attachGridStyle = (size) => {
  GRID_CANVAS.style.gridTemplateColumns = returnGridTemplateStyle(size);
  GRID_CANVAS.style.gridTemplateRows = returnGridTemplateStyle(size);
};

// returns the required text for grid templates to be mutable
const returnGridTemplateStyle = (size) => {
  return `${"auto ".repeat(size)}`;
};

// returns a string with the passed character removed
const removeCharacter = (string, charToRemove) => {
  return string
    .split("")
    .filter((char) => char !== charToRemove)
    .join("");
};

// returns an uppercase hexcode without the hashtag for
// display purposes
const returnUpperCaseHexCode = (string) => {
  return removeCharacter(string, "#").toUpperCase();
};

// updates the current color label to match the current color
const updateCurrentColorLabel = (node) => {
  node.nextElementSibling.textContent = returnUpperCaseHexCode(node.value);
};

// changes a single button so 'btn-active' matches the
// current mode
const changeActiveButton = (button) => {
  button.dataset.mode !== currentMode
    ? button.classList.remove("btn-active")
    : button.classList.add("btn-active");
};

// checks each button and changes styles to make buttons
// match current mode
const changeActiveButtons = () => {
  MODE_TOOLS.forEach((btn) => {
    changeActiveButton(btn);
  });
};

// returns a hsl color with the hue shifted by 3 each time
const returnRainbowColor = () => {
  currentHue += 3;
  return `hsl(${currentHue}, 100%, 50%)`;
};

// changes a grid item so it's background color matches
// DEFAULT_ERASE
const eraseGridItem = (node) => {
  node.style.backgroundColor = DEFAULT_ERASE;
};

// changes a grid item so it's background color matches
// the passed color
const drawGridItem = (node, color) => {
  node.style.backgroundColor = color;
};

// changes the selected color label if the color input
// is changes
const handleColorChange = (node) => {
  currentColor = node.value;
  updateCurrentColorLabel(node);
};

// if the mouse enters a gridItem && the mouse is being clicked
// the cursor will draw or erase based on the currentMode
// if rainbow is selected, the cursor will draw rainbow pixels
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

// iterates through ever gridItem and erases the background
// if the reset button is clicked
const handleReset = () => {
  GRID_CANVAS.childNodes.forEach((item) => {
    eraseGridItem(item);
  });
};

// changes the current mode and updates the active mode
// button if any mode buttons are clicked
const handleModeChange = (e) => {
  currentMode = e.target.dataset.mode;
  changeActiveButtons();
};

// adds event listers to multiple items
const addEventListeners = (nodeList, type, callback) => {
  nodeList.forEach((node) => node.addEventListener(type, (e) => callback(e)));
};

// on window load:
// - draw the canvas
// - add the handleGridEvent function to ALL gridItems
// - add the handleModeChange function to ALL mode buttons
// - add the handleColorChange function to the color wheel input
// - add the handleReset function to the reset button
window.onload = () => {
  attachGrid(GRID_CANVAS, GRID_SIZE);

  addEventListeners(GRID_CANVAS.childNodes, "mouseenter", handleGridEvent);
  addEventListeners(MODE_TOOLS, "click", handleModeChange);

  COLOR_TOOL.addEventListener("change", (e) => handleColorChange(e.target));
  RESET_TOOL.addEventListener("click", (e) => handleReset());

  // these event listeners stop the cursor drawing at all times
  // and instead only when the mouse is clicked down
  GRID_CANVAS.addEventListener("mousedown", (e) => (mouseDown = true));
  GRID_CANVAS.addEventListener("mouseup", (e) => (mouseDown = false));
};
