
const darkColors = {
    "--main-bg-color": "#333",
    "--secondary-bg-color": "#444",
    "--main-txt-color": "lightgrey",
    "--highl-def-color": "darkslategrey"
};
const lightColors = {
    "--main-bg-color": "#E7E9EB",
    "--secondary-bg-color": "white",
    "--main-txt-color": "#444",
    "--highl-def-color": "aquamarine"
};

function attachTocMouseEventListener() {

    const sideBarUls = Array.from(document.getElementById("toc-details").getElementsByTagName("ul"));
    const root = document.querySelector(':root');
    let rs = getComputedStyle(root);

    sideBarUls.forEach((elm, idx) => {
        if (idx > 0) {
            elm.addEventListener('mouseover', function(e) {
                elm.previousElementSibling.style.color = rs.getPropertyValue('--highl-txt-color');
            });
            elm.addEventListener('mouseout', function(e) {
                elm.previousElementSibling.style.color = rs.getPropertyValue('--main-txt-color');
            });
        }
    });
}
attachTocMouseEventListener();



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

function reColorAll(colorScheme) {

    const root = document.querySelector(':root');
    for (const key of Object.keys(colorScheme)) {
        root.style.setProperty(key, colorScheme[key])
    }
}

function setInitialColorScheme() {

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if ( localStorage.getItem('color-mode') === 'light' ) {
        reColorAll(lightColors);
    } else if ( prefersDark || localStorage.getItem('color-mode') === 'dark' ) {
        reColorAll(darkColors);
    }
}

setInitialColorScheme();

function toggleColorScheme() {
    const root = document.querySelector(':root');
    let rs = getComputedStyle(root);

    if ( rs.getPropertyValue('--main-txt-color') == 'lightgrey') {
        reColorAll(lightColors);
        localStorage.setItem("color-mode", "light")
    } else if ( rs.getPropertyValue('--main-txt-color') == '#444') {
        reColorAll(darkColors);
        localStorage.setItem("color-mode", "dark")
    }
    repaintAllTocULs();

}

function repaintAllTocULs() {

    const sideBarLinks = Array.from(document.getElementById("toc-details").getElementsByTagName("a"));
    const root = document.querySelector(':root');
    let rs = getComputedStyle(root);
    sideBarLinks.forEach((elm, idx) => {
        elm.style.color = rs.getPropertyValue('--main-txt-color');
    });
}

