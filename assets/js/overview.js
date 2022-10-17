
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

    const sideBarUls = Array.from(document.getElementById("toc-details").getElementsByTagName("ul"));
    const root = document.querySelector(':root');
    let rs = getComputedStyle(root);
    sideBarUls.forEach((elm, idx) => {
        elm.style.color = rs.getPropertyValue('--main-txt-color');
    });
}



attachTocMouseEventListener();

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
