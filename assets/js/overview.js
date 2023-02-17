
setInitialColorScheme();

window.addEventListener("load", function(e) {
  attachTocMouseEventListeners();

})

function setInitialColorScheme() {

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if ( localStorage.getItem('color-mode') === 'light' ) {
    document.documentElement.setAttribute('color-mode', 'light')
  } else if ( prefersDark || localStorage.getItem('color-mode') === 'dark' ) {
    document.documentElement.setAttribute('color-mode', 'dark')
  }
}


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

  const grid = document.getElementById('grid-container');

  if (grid.getAttribute('toc-visible') == 'init') {
    grid.setAttribute('toc-visible', 'toggle')
  } else if (grid.getAttribute('toc-visible') == 'toggle') {
    grid.setAttribute('toc-visible', 'init')
  }


}

function toggleDefinitions() {

  const grid = document.getElementById('grid-container');
  const definitionsEntries = document.querySelectorAll("#definitions > ul li");

  if (grid.getAttribute('defs-visible') == 'init') {
    grid.setAttribute('defs-visible', 'toggle')
    if (definitionsEntries.length === 0) {
      const definitions = crawlDefinitions();
      makeDefinitionUL(sortNodesByTextContent(definitions));
    }
  } else if (grid.getAttribute('defs-visible') == 'toggle') {
    grid.setAttribute('defs-visible', 'init')
  }
}

function crawlDefinitions() {

  const definitions = document.querySelectorAll(".definition strong");

  return definitions
}

function sortNodesByTextContent(nodes) {

  let sorted = Array.from(nodes).sort(function(a,b) {
    return a.textContent.localeCompare(b.textContent)
  });

  return sorted
}

function makeDefinitionUL(definitions) {

  const definitionsUl = document.querySelector("#definitions > ul");

  definitions.forEach((elm, idx) => {

    let entryLI = document.createElement("li");

    entryLI.textContent = elm.textContent

    entryLI.addEventListener("click", function(e) {
      elm.scrollIntoView({behavior: "smooth", block: "center"})
    })

    definitionsUl.appendChild(entryLI);

  })
}

function toggleColorScheme() {

  if ( document.documentElement.getAttribute('color-mode') == 'dark' ) {
    document.documentElement.setAttribute('color-mode', 'light')
    localStorage.setItem("color-mode", "light")
  } else if (  document.documentElement.getAttribute('color-mode') == 'light' ) {
    document.documentElement.setAttribute('color-mode', 'dark')
    localStorage.setItem("color-mode", "dark")
  }
  repaintAllTocULs();

}

function repaintAllTocULs() {

  const tocLinks = document.querySelectorAll("#toc-details a");
  const root = document.querySelector(':root');
  let rs = getComputedStyle(root);

  tocLinks.forEach((elm, idx) => {
    elm.style.color = rs.getPropertyValue('--main-txt-color');
  });
}

