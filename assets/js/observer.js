
window.addEventListener("load", (event) => {
  // creates a list of headline elements. The attribute
  // data-number  
  let hl_elms = document.querySelectorAll('[data-number]');

  createObserver(hl_elms);
}, false);

function createObserver(elements) {
  let observer;
  let main_elm = document.getElementById('main-content');

  let options = {
    root: main_elm,
    rootMargin: "0px",
    threshold: 1.0
  };

  observer = new IntersectionObserver(handleIntersect, options);
  elements.forEach((elm) => {
      if (elm) {
          observer.observe(elm);
      }
  });
}

let currentlyVisibleEntries = []
let current;
let previous;

function handleIntersect(entries, observer) {

    let elm;

    entries.forEach(entry => {
        if(entry.isIntersecting) {
            if (isVisible(entry)) {
                elm = entry.target;
                currentlyVisibleEntries.push(elm);
            }
        } else {
            const index = currentlyVisibleEntries.indexOf(entry.target);
            if (index >= 0) {
                currentlyVisibleEntries.splice(index, 1);
            }
        }
    });

    current = currentlyVisibleEntries.at(-1)

    if (current) {

        if (previous) {
            unhighlightTOCElements(previous.id);
        }

        highlightTOCElements(current.id);
        scrollTOCToElementID(current.id);

        previous = current;
    }


};

function highlightTOCElements(elmId) {

    let elm = getTOCLinkForId(elmId); 

    elm.classList.add("highl-txt-obs");

    let parents = getParents(elm);

    parents.forEach((_elm, idx) => {
        if (idx > 0 && _elm.parentNode.id != 'toc-details' && _elm.tagName == 'UL') {
            // let link = _elm.querySelector('a');
            // link.classList.add("highl-txt-obs");
            _elm.previousElementSibling.classList.add("highl-txt-obs");
        }
    });
}

function unhighlightTOCElements(elmId) {

    let elm = getTOCLinkForId(elmId); 

    elm.classList.remove("highl-txt-obs");

    let parents = getParents(elm);

    parents.forEach((_elm, idx) => {
        if (idx > 0 && _elm.parentNode.id != 'toc-details' && _elm.tagName == 'UL') {
            // let link = _elm.querySelector('a');
            // link.classList.remove("highl-txt-obs");
            _elm.previousElementSibling.classList.remove("highl-txt-obs");
        }
    });
}

function getParents(elm) {
  var parents = [];
  while(elm.parentNode && elm.id != 'toc-details') {
    elm = elm.parentNode;
    parents.push(elm);
  }
  return parents;
}

function isVisible(entry) {

    let main_elm = document.getElementById('main-content');
    let entry_y = entry.boundingClientRect.y;

    if (entry_y > main_elm.offsetTop || entry_y < main_elm.offsetHeight) {
        return true
    }
    return false
}

function visibleInUpperQuarter(entry) {
    let elm = entry.target;
    let main_elm = document.getElementById('main-content');

    let elm_y = entry.boundingClientRect.y

    if (
        (elm_y - main_elm.offsetTop) / main_elm.offsetHeight <= 0.25
        && (elm_y - main_elm.offsetTop >= 0)
    ) {
        return true
    }
}

function getTOCLinkForId(id) {
    let selector = '#toc-details a[href="#' + id + '"]';
    return document.querySelector(selector)
}

function scrollTOCToElementID(elmId) {
    let elm = getTOCLinkForId(elmId); 
    elm.scrollIntoView(
        { behavior: "smooth", block: "start" }
    );
}

