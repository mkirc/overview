This is a handy little utility for producing
mathjax-supported html from markdown.
My usecase is writing summaries of lectures.

Usage:

You can use this fully featured (eg. with embedded images etc.) by
cloning the repo, copying the .md you want to convert into the project
and compile via

bash makeOverview.bash [your md file]

You can also add it into your $PATH or just make an

alias overview="bash path/to/the/repo/overview/makeOverview.bash"

and use this for quick compilation (right now only text works).

enjoy!
