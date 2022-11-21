
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

    const sideBarUls = document.querySelectorAll('#toc-details ul');

    sideBarUls.forEach((elm, idx) => {
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
    const root = document.querySelector(':root');
    let rs = getComputedStyle(root);

    let toc_visible = rs.getPropertyValue('--toc-visible')

    let toc_width_toggle = rs.getPropertyValue('--side-nav-width-' + toc_visible);
    let toc_visible_toggle = rs.getPropertyValue('--toc-visible-' + toc_visible);


    const grid = document.querySelector(".grid-container");

    const toc = document.getElementById("side-wrapper");
    let ts = getComputedStyle(toc);

    toc.style.setProperty('display', toc_visible_toggle);
    grid.style.setProperty('grid-template-columns', toc_width_toggle + ' auto 1vw');

    if (toc_visible == 'toggle') {
        root.style.setProperty('--toc-visible', 'init');
    } else if (toc_visible == 'init') {
        root.style.setProperty('--toc-visible', 'toggle');
    }


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

    const sideBarLinks = document.querySelectorAll("#toc-details a");
    const root = document.querySelector(':root');
    let rs = getComputedStyle(root);

    sideBarLinks.forEach((elm, idx) => {
        elm.style.color = rs.getPropertyValue('--main-txt-color');
    });
}

