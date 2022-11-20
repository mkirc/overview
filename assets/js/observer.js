
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

function handleIntersect(entries, observer) {
    let elm;
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            if (isVisible(entry)) {
                elm = entry.target;
                currentlyVisibleEntries.push(elm);

                if (visibleInUpperQuarter(entry)) {

                    console.log('top')
                    console.log(elm)

                    scrollTOCToEntry(elm.id);
                }
                console.log('in');
                console.log(entry);
            }
        } else {
            const index = currentlyVisibleEntries.indexOf(entry.target);
            if (index >= 0) {
                console.log('out');
                console.log(entry);
                console.log(index);
                currentlyVisibleEntries.splice(index, 1);
            }
        }
    });
};

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

function setWindowHash(hashString) {
    window.location.hash = '#' + hashString;
}

function scrollTOCToEntry(hashString) {
    let selector = '#toc-details a[href="#' + hashString + '"]';
    document.querySelector(selector).scrollIntoView(
        {behaviour: 'smooth', block: 'start'}
    );
}

