window.addEventListener("load", function(e) {
  attachTocMouseEventListeners();

})


function attachTocMouseEventListeners() {

  const tocUls = document.querySelectorAll('#toc-details ul');

  tocUls.forEach((elm, idx) => {
    if (idx > 0) {
      elm.addEventListener('mouseover', function(e) {
        elm.previousElementSibling.classList.add("highl-txt");
      });
      elm.addEventListener('mouseout', function(e) {
        elm.previousElementSibling.classList.remove("highl-txt")
      });
    }
  });
}

function toggleTOC() {

  // TODO: toggle toc subpanel only
  // const grid = document.getElementById('grid-container');

  // if (grid.getAttribute('toc-visible') == 'init') {
  //   grid.setAttribute('toc-visible', 'toggle')
  // } else if (grid.getAttribute('toc-visible') == 'toggle') {
  //   grid.setAttribute('toc-visible', 'init')
  // }

}


