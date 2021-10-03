const gridContainer = document.querySelector("#grid-container");
const selectedColor = document.querySelector("#color-wheel");
const colorWheelDesc = document.querySelector("#color-wheel-desc");

let color = selectedColor.value;

const generateGridItems = (amount) => {
  const gridItems = [];

  for (let i = 0; i < amount; i += 1) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItems.push(gridItem);
  }

  return gridItems;
};

const addGridColumns = (amount) => {
  let styleString = "";

  for (let i = 0; i < amount; i += 1) {
    styleString += "auto ";
  }

  return styleString;
};

const changeNodeColor = (node, color) => {
  node.style.backgroundColor = color;
};

const amount = 50;
const gridItems = generateGridItems(amount * amount);

gridContainer.style.gridTemplateColumns = addGridColumns(amount);

gridItems.forEach((item) => {
  gridContainer.appendChild(item);

  item.addEventListener("mouseenter", (e) => {
    changeNodeColor(e.target, color);
  });
});

selectedColor.addEventListener("input", (e) => {
  color = e.target.value;
  colorWheelDesc.textContent = e.target.value;
});
