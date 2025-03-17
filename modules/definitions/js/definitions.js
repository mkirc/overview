function toggleDefinitions() {

  // TODO: toggle definitions subpanel only
  // const grid = document.getElementById('grid-container');
  // const definitionsEntries = document.querySelectorAll("#definitions > ul li");

  // if (grid.getAttribute('defs-visible') == 'init') {
  //   grid.setAttribute('defs-visible', 'toggle')
  //   if (definitionsEntries.length === 0) {
  //     const definitions = crawlDefinitions();
  //     makeDefinitionUL(sortNodesByTextContent(definitions));
  //   }
  // } else if (grid.getAttribute('defs-visible') == 'toggle') {
  //   grid.setAttribute('defs-visible', 'init')
  // }
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


