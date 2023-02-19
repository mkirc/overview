
document.addEventListener("DOMContentLoaded", function() {

  // TODO: Render Tex in ToC directly so toc-loader does not run into problems,
  // then load Eq's in Viewport lazily

  // TODO: intersections seem to be calculated before img's are loaded,
  // leading to offsets. Can we defer setup until after?

  const math_spans = document.querySelectorAll("span.math");
  const main_elm = document.getElementById("main-content");

  let options = {
    root: main_elm,
    rootMargin: "10em",
    threshold: 1.0
  };

  let observer = new IntersectionObserver(handleIntersect, options);

  math_spans.forEach((elm) => {
    if (elm) {
      observer.observe(elm);
    }
  });
})

function handleIntersect(entries, observer) {

  let elm;

  entries.forEach((entry) => {
    if (entry.isIntersecting && isVisible(entry)) {

      elm = entry.target
      const tex = elm.textContent;
      const display_mode = elm.classList.contains("display");

      try {
        temml.render(tex, elm, { display_mode });
        observer.unobserve(elm);
        console.log(entry)
      } catch (error) {

      }
    }
  });

}

function isVisible(entry) {

    let main_elm = document.getElementById('main-content');
    let entry_y = entry.boundingClientRect.y;

    if (entry_y > main_elm.offsetTop || entry_y < main_elm.offsetHeight) {
        return true
    }
    return false
}

