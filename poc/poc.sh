#!/usr/bin/env bash
# generate template from templates
pandoc body.html \
    -s \
    --quiet \
    --template=main.html \
    --embed-resources \
    -c test.css \
    -H <(echo './test.js')  \
    -H <(echo './test.js')  \
    -H <(echo './test.js')  \
    -B toc.html \
    -A toc.html \
    -o tmp.html

pandoc ./in.md -s \
    --quiet \
    --template=tmp.html \
    --toc \
    -o out.html \

[[ -f tmp.html ]] && cat tmp.html  && rm tmp.html
