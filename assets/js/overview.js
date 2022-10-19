
const darkColors = {
    "--main-bg-color": "#333",
    "--secondary-bg-color": "#444",
    "--main-txt-color": "lightgrey",
    "--highl-txt-color": "#FAB57F",
    "--highl-def-color": "darkslategrey"
};
const lightColors = {
    "--main-bg-color": "#E7E9EB",
    "--secondary-bg-color": "white",
    "--main-txt-color": "#444",
    "--highl-txt-color": "#FAB57F",
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

function repaintAllTocULs() {

    const sideBarLinks = Array.from(document.getElementById("toc-details").getElementsByTagName("a"));
    const root = document.querySelector(':root');
    let rs = getComputedStyle(root);
    sideBarLinks.forEach((elm, idx) => {
        elm.style.color = rs.getPropertyValue('--main-txt-color');
    });
}



attachTocMouseEventListener();

function toggleTOC() {
    const grid = document.querySelector(".grid-container");
    let gs = getComputedStyle(grid);
    const toc = document.getElementById("side-wrapper");
    let ts = getComputedStyle(toc);
    if ( ts.getPropertyValue('display') == 'block' ) {

        toc.style.setProperty('display', 'none');
        grid.style.setProperty('grid-template-columns', '1vw auto 1vw');

    } else if  ( ts.getPropertyValue('display') == 'none' ) {
        toc.style.setProperty('display', 'block');
        grid.style.setProperty('grid-template-columns', '20vw auto 1vw');
    }
}

function toggleColorScheme() {
    const root = document.querySelector(':root');
    let rs = getComputedStyle(root);

    if ( rs.getPropertyValue('--main-txt-color') == 'lightgrey') {
        for (const key of Object.keys(lightColors)) {
            root.style.setProperty(key, lightColors[key])
        }
    } else if ( rs.getPropertyValue('--main-txt-color') == '#444') {
        for (const key of Object.keys(darkColors)) {
            root.style.setProperty(key, darkColors[key])
        }
    }
    repaintAllTocULs();

}
