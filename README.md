# Overview

This is a handy little utility for producing
html + mathml documents from markdown enhanced with latex using
a fine tuned template and pandoc's '--standalone' feature.
I use it for writing lecture summaries.

## Installation:

clone this repo.

You can also add it to your $PATH or just make an
`alias overview="bash path/to/makeOverview.bash"`.


## Usage:

`bash /path/to/makeOverview.bash <your md file> [-o,--outfile your-file.html]`

## Acknowledgements

This project would be nothing without its components:

* https://pandoc.org, the swiss army knife of document conversion (and more) [v2.19.2]

* https://github.com/stathissideris/ditaa/, astonishing little ascii-art -> svg converter [v0.11.0]

* https://temml.org, lightweight in size, impressive in support of tex functions [v0.9.0]

* https://argbash.dev, the go-to command line options and help message generator for bash [v2.10.0]

You may be interested in the corresponding [vim plugin](https://github.com/mkirc/vim-overview.git).

enjoy!
