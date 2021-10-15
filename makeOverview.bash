#!/usr/bin/env bash

basePath="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

pandoc --from markdown_github+smart+yaml_metadata_block+auto_identifiers+tex_math_single_backslash+tex_math_dollars "$1" \
    --to=html5 \
    -o "$(pwd)"/"${1/%.*/.html}" \
    --template="$basePath"/assets/templates/page.html \
    -V basepath="$basePath" \
    --self-contained \
    --mathjax\
    --metadata date="$(date)" \
    --metadata author='mkirc' \
    --metadata title=${1%%.*} \
    --toc
