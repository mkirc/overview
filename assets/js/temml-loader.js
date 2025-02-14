function simpleLoader() {
    let mathSpans = document.querySelectorAll('span.math');
    // Render all the math.
    for (let aSpan of [...mathSpans]) {
        const tex = aSpan.textContent;
        const displayMode = aSpan.classList.contains("display");
        try {
            temml.render(tex, aSpan, { displayMode });
        } catch (error) {

        }
    }
}



document.addEventListener("DOMContentLoaded", function() {

    // to keep focus of the current position on reload
    // we save the uri fragment and scroll to it after mml conversion
    const current_hash = decodeURIComponent(window.location.hash).substring(1);

    simpleLoader();

    if (current_hash) {
        const curr_h_elm = document.getElementById(current_hash);
        curr_h_elm.scrollIntoView();
    }
});
