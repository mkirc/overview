#!/usr/bin/env bash

basePath="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# source command line options
. "$basePath"/ov-opts.sh

set_default_arguments() {

    if [[ -z "$_arg_md_file_path" ]]; then
        _PRINT_HELP=yes die
    elif [[ -z "$_arg_outfile" ]]; then
        _arg_outfile="$(pwd)"/"${_arg_md_file_path/%.*/.html}"
    fi

}

run_pandoc(){

    pandoc --from markdown_github+smart+yaml_metadata_block+auto_identifiers+tex_math_single_backslash+tex_math_dollars "$_arg_md_file_path" \
        --to=html5 \
        -o "$_arg_outfile" \
        --template="$basePath"/assets/templates/page.html \
        -V basepath="$basePath" \
        --self-contained \
        --mathjax\
        --metadata date="$(date)" \
        --metadata author="$USER" \
        --metadata title=${_arg_md_file_path%%.*} \
        --toc

}

main() {
    set_default_arguments
    run_pandoc
}

main
