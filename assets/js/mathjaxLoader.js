
MathJax = {
  //
  //  Load only TeX input and the contextual menu
  //
  loader: {load: ['input/tex', 'ui/menu']},
  //
  //  When page is ready, render the math in the document
  //
  //
  //  When page is ready:
  //    disable the assistive-mathml menu item
  //    render the document, handling require and autoload calls
  //
  startup: {
    pageReady() {
      MathJax.startup.document.menu.menu.findID('Accessibility', 'AssistiveMml').disable();
      MathJax._.mathjax.mathjax.handleRetriesFor(() => MathJax.startup.document.render());
    }
  },
  //
  //  Override the usual typeset render action with one that generates MathML output
  //
  options: {
    renderActions: {
      assistiveMml: [],  // disable assistive mathml
      typeset: [150,
        (doc) => {for (math of doc.math) {MathJax.config.renderMathML(math, doc)}},
        (math, doc) => MathJax.config.renderMathML(math, doc)
      ]
    },
    menuOptions: {
      settings: {
        assistiveMml: false
      }
    }
  },
  //
  // The action to use for rendering MathML
  //
  renderMathML(math, doc) {
    math.typesetRoot = document.createElement('mjx-container');
    math.typesetRoot.innerHTML = MathJax.startup.toMML(math.root);
    math.display && math.typesetRoot.setAttribute('display', 'block');
  }
};
