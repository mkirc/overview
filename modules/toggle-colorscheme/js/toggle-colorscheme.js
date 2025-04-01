setInitialColorScheme();

function setInitialColorScheme() {

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if ( localStorage.getItem('color-mode') === 'light' ) {
    document.documentElement.setAttribute('color-mode', 'light')
  } else if ( prefersDark || localStorage.getItem('color-mode') === 'dark' ) {
    document.documentElement.setAttribute('color-mode', 'dark')
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

  const tocLinks = document.querySelectorAll("#toc-details a");
  const root = document.querySelector(':root');
  let rs = getComputedStyle(root);

  tocLinks.forEach((elm, idx) => {
    elm.style.color = rs.getPropertyValue('--main-txt-color');
  });
}


