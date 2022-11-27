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
    simpleLoader();
});
