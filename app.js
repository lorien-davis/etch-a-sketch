function createGrid() {
  const gridContainer = document.querySelector('.grid-container');
  const gridItems = [];

  let gridSize = {
    size: 100,
    style: []
  };

  for (let i = 0; i < gridSize.size; i += 1) {
    gridSize.style.push(' auto');
  }

  gridContainer.setAttribute('style', `grid-template-columns:${gridSize.style.join('')}`);

  for (let i = 0; i < (gridSize.size * gridSize.size); i += 1) {
    gridItems.push(document.createElement('div'));
    gridItems[i].classList.add('grid-item');
  }

  gridItems.forEach(item => {
    gridContainer.appendChild(item);
  });
}

function drawSketch() {
  const gridItems = document.querySelectorAll('.grid-item');
  const gridContainer = document.querySelector('.grid-container');
  let isDrawing = false;

  gridContainer.addEventListener('mousedown', function () {
    isDrawing = true;
  });

  gridItems.forEach(item => {
    item.addEventListener('mouseover', function () {
      if (isDrawing === true) {
        this.setAttribute('style', `background-color: ${checkColor()}`);
      }
    });
  });

  gridContainer.addEventListener('mouseup', function () {
    isDrawing = false;
  });
}

function clearSketch() {
  const gridItems = document.querySelectorAll('.grid-item');

  gridItems.forEach(item => {
    item.style.removeProperty('background-color');
  });
}

function checkColor() {
  return document.querySelector('input').value;
}

createGrid();
drawSketch();