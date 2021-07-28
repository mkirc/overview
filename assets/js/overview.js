
const sideBarUls = Array.from(document.getElementById("toc-details").getElementsByTagName("ul"));

sideBarUls.forEach((elm, idx) => {
    if (idx > 0) {
        elm.onmouseover = function(e) {
            elm.previousSibling.style.color = "#FAB57F";
        }
        elm.onmouseout = function(e) {
            elm.previousSibling.style.color = "lightgrey";
        }
    }
});
console.log(sideBarUls);


function toggleTOC() {
    const elm = document.getElementById("main-content");
    let style = window.getComputedStyle(elm).getPropertyValue('grid-column-start');
    if (style == 'main-content') {
        elm.style.gridArea = '2 / 1 / 3 / 3'
        elm.style.margin = '0 0 0 2em';
    } else {
        elm.style.gridArea = "main-content";
        elm.style.margin = '0 0 0 0.1rem';
    }
}
