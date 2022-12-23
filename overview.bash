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
    if [[ -z "$_arg_title" ]]; then
        _arg_title=${_arg_md_file_path%%.*}
    fi
    if [[ -z "$_arg_author" ]]; then
        _arg_author="$USER"
    fi

}

run_pandoc(){

    pandoc --from markdown+grid_tables+smart+yaml_metadata_block+auto_identifiers+tex_math_single_backslash+tex_math_dollars "$_arg_md_file_path" \
        --to=html5 \
        -o "$_arg_outfile" \
        --template="$basePath"/assets/templates/page.html \
        -V basepath="$basePath" \
        --katex\
        --standalone\
        --embed-resources\
        --metadata date="$(date)" \
        --metadata author="$_arg_author" \
        --metadata title="$_arg_title" \
        --toc \
        --number-sections

}

main() {
    set_default_arguments
    run_pandoc
}

main
