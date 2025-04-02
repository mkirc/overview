#!/usr/bin/env bash

set -e

_base_path="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

source "$_base_path"/common.sh

main() {

    # step 0:
    # parse well-known filenames from appropriate (specified?)
    # module directory in form:
    # module-name/
    #            /run/
    #            /html/
    #            /css/
    #            /js/
    checkModsSelected "'toc' 'toggle-panels' 'definitions'"
    [[ -v mods_selected ]] || exit

    # TODO: step -1.1:
    # run before-hook in run/hooks/

    # TODO: step 0.1:
    # parse additional options to pandoc from a run/options.


    # step 1:
    # assemble html files for left, right panels
    # as (-B, --include-before / -A, --include-after )
    # includes, which can be declared multiple times for
    # mutiple includes.
    gatherRessourcePaths
    [[ ! -v pandoc_opts_html ]] \
        && [[ ! -v pandoc_pots_css ]] \
        && [[ ! -v pandoc_opts_js ]] \
        && exit

    # step 2: generate template from ressources
    generateTemplate

    [[ -f "$_template_file" ]] || exit

    # step 2:
    # use the template created in step 1 on the
    # infile. add toc if the module usage commands it.
    runPandoc
    # step 2.1:
    # cleanup temp file
    rm "$_template_file"
}

checkModsSelected() {


    local -a mods_to_check="( ${*:-$(</dev/stdin)} )"
    # check if all selected mods are present in modules directory
    local -a mods_available=($(find "$_base_path"/../modules/* -maxdepth 0 -type d))
    local -a mods_available_names="( $(catArray mods_available | stripPrefix '*/') )"


    if any mods_to_check not inArray mods_available_names; then
        local -a mods_missing="( $(gatherAll mods_to_check not inArray mods_available_names) )"
        echo "${mods_missing[@]} not found in modules, exiting."
        exit
    fi

    # All mods selected are present.
    declare -agr mods_selected="($(catArray mods_to_check))"
}

gatherRessourcePaths() {

    set -e
    local -a mods_html_left=()
    local -a mods_html_right=()
    local -a mods_html_nav=()
    local -a mods_css=()
    local -a mods_js=()
    local mod

    # gather ressource paths
    for mod in $(catArray mods_selected | splitArray); do
        [[ -f "$_base_path"/../modules/"$mod"/html/left-panel.html ]] \
            && mods_html_left+=( "$_base_path"/../modules/"$mod"/html/left-panel.html )

        [[ -f "$_base_path"/../modules/"$mod"/html/right-panel.html ]] \
            && mods_html_right+=( "$_base_path"/../modules/"$mod"/html/right-panel.html )

        [[ -f "$_base_path"/../modules/"$mod"/html/nav.html ]] \
            && mods_html_nav+=( "$_base_path"/../modules/"$mod"/html/nav.html )

        mods_css+=( $(find "$_base_path"/../modules/"$mod"/css/*.css -maxdepth 0 -type f) )
        mods_js+=( $(find "$_base_path"/../modules/"$mod"/js/*.js -maxdepth 0 -type f) )
    done

    # catArray mods_html_left | splitArray
    # catArray mods_html_right | splitArray
    # catArray mods_css | splitArray
    # catArray mods_js | splitArray

    # assemble pandoc options
    local -a opts_html_nav="($(zippedWithPrefix '-B' mods_html_nav))"
    local -a opts_html_left="($(zippedWithPrefix '-B' mods_html_left))"
    local -a opts_html_right="($(zippedWithPrefix '-A' mods_html_right))"

    # set global arrays for pandoc options
    declare -agr pandoc_opts_html="($(catArray opts_html_nav opts_html_left opts_html_right))"
    declare -agr pandoc_opts_css="($(zippedWithPrefix '-c' mods_css))"
    declare -agr pandoc_opts_js="($(zippedWithPrefix '-H' mods_js))"

    set +e

    # echo "${pandoc_opts_html[*]}"
    # echo "${pandoc_opts_css[*]}"
    # echo "${pandoc_opts_js[*]}"

    # exit
}


generateTemplate() {
    # Arguments to pandoc:
    # body.html effectively replaces '${ body }' in main.html
    # -s make standalone document
    # --quiet suppresses warnings
    # --embed-resources effectively inlines css+js assets
    # -c adds css assets by path
    # -H adds js assets by path
    # -B adds html asset in left panel
    # -A adds html asset in right panel
    # -o write template to temp file
    declare -g _template_file="$_base_path"/.tmp-"$(date +'%s')"
    pandoc \
        body.html \
        -s \
        --quiet \
        --template=main.html \
        $(echo "${pandoc_opts_html[*]}") \
        $(echo "${pandoc_opts_css[*]}") \
        $(echo "${pandoc_opts_js[*]}") \
        -o "$_template_file"
    return $?
}

runPandoc() {

    local opt_toc=''
    inArray mods_selected 'toc' && opt_toc='--toc'
    pandoc ./in.md \
        -s \
        --quiet \
        --embed-resources \
        --template="$_template_file" \
        $(echo "$opt_toc") \
        -o out.html
    return $?
}

main
# step 23:
# run after-hook scripts in module/run/hooks.
