function toggleLeftPanel() {
  const gridContainer = document.getElementById('grid-container');

  if (gridContainer.getAttribute('left-panel-visible') == 'true') {
    gridContainer.setAttribute('left-panel-visible', 'false');
  } else if (gridContainer.getAttribute('left-panel-visible') == 'false') {
    gridContainer.setAttribute('left-panel-visible', 'true');
  }
}

function toggleRightPanel() {
  const gridContainer = document.getElementById('grid-container');

  if (gridContainer.getAttribute('right-panel-visible') == 'true') {
    gridContainer.setAttribute('right-panel-visible', 'false');
  } else if (gridContainer.getAttribute('right-panel-visible') == 'false') {
    gridContainer.setAttribute('right-panel-visible', 'true');
  }
}

function toggleBothPanels() {
  toggleRightPanel();
  toggleLeftPanel();
}
