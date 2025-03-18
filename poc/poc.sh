#!/usr/bin/env bash

# step 0:
# parse well-known filenames from appropriate (specified?)
# module directory in form:
# module-name/
#            /html/
#            /css/
#            /js/

# step 1:
# assemble templates for left, right panels
# as (-B, --include-before / -A, --include-after ).
# body.html only contains '${ body }' and replaces
# the '${ body }' in main template.

# body.html effectively replaces '${ body }' in main.hmtml
# --embed-resources effectively inlines css+js assets
# -c add css assets by path
# -H adds js assets by path
# -B adds html asset in left panel
# -A adds html asset in right panel
# -o write template to temp file
pandoc \
    body.html \
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

# step 1.1:
# test exit status etc.

# step 2:
# use the template created in step 1 on the
# infile. add toc if the module usage commands it.
pandoc ./in.md \
    -s \
    --quiet \
    --template=tmp.html \
    --toc \
    -o out.html \

# step 666:
# cleanup temp file
[[ -f tmp.html ]] && cat tmp.html  && rm tmp.html
