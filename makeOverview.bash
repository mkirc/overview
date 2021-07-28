#!/usr/bin/env bash

pandoc --from markdown_github+smart+yaml_metadata_block+auto_identifiers+tex_math_single_backslash+tex_math_dollars "$1" \
    --to=html5 \
    -o overview.html \
    --template='./assets/templates/page.html' \
    --self-contained \
    --mathjax\
    --metadata date="$(date)" \
    --metadata author='mkirc' \
    --metadata title='tp2 overview' \
    --toc
