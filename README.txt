This is a handy little utility for producing
mathjax-supported html from markdown.
I use it for writing summaries of lectures.

Installation: clone this repo.
You can also add it into your $PATH or just make an
alias overview="bash path/to/makeOverview.bash".

Usage:

bash /path/to/makeOverview.bash <your md file> [-o,--outfile your-file.html]

This project would be nothing without its components:

* https://pandoc.org, the swiss army knife of document conversion (and more) [v2.19.2]

* https://github.com/stathissideris/ditaa/, astonishing little ascii-art -> svg converter [v0.11.0]

* https://temml.org, lightweight in size, impressive in support of tex functions [v0.9.0]

* https://argbash.dev, the go-to command line options and help message generator for bash [v2.10.0]


enjoy!
