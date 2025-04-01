#!/usr/bin/env bash

set -e

_base_path="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

source "$_base_path"/common.sh

# step 0:
# parse well-known filenames from appropriate (specified?)
# module directory in form:
# module-name/
#            /run/
#            /html/
#            /css/
#            /js/

declare PANEL_SEPARATOR="toggle-panels"

declare -a mods_available=($(find "$_base_path"/../modules/* -maxdepth 0 -type d))

declare -a mods_selected=("toc" "toggle-panels" "definitions")

declare -a mods_available_names="( $(catArray mods_available | stripPrefix '*/') )"

if any mods_selected not inArray mods_available_names; then
    declare -a mods_missing="( $(gatherAll mods_selected not inArray mods_available_names) )"
    echo "${mods_missing[@]} not found in modules, exiting."
    exit
fi
# All mods selected htmlare present.

# gather html paths
declare -a mods_html_left=()
declare -a mods_html_right=()
declare -a mods_html_nav=()
declare -a mods_css=()
declare -a mods_js=()
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
unset mod

# catArray mods_html_left | splitArray
# catArray mods_html_right | splitArray
# catArray mods_css | splitArray
# catArray mods_js | splitArray

declare -a prefixes_nav=()
for idx in $(getKeys mods_html_nav); do
    prefixes_nav+=('-B')
done
declare -a opts_html_nav="($(zipped prefixes_nav mods_html_nav))"

declare -a prefixes_left=()
declare -i idx
for idx in $(getKeys mods_html_left); do
    prefixes_left+=('-B')
done
declare -a opts_html_left="($(zipped prefixes_left mods_html_left))"

declare -a prefixes_right=()
for idx in $(getKeys mods_html_right); do
    prefixes_right+=('-A')
done
declare -a opts_html_right="($(zipped prefixes_right mods_html_right))"
declare -a pandoc_opts_html="($(catArray opts_html_nav opts_html_left opts_html_right))"

declare -a prefixes_css=()
for idx in $(getKeys mods_css); do
    prefixes_css+=('-c')
done
declare -a pandoc_opts_css="($(zipped prefixes_css mods_css))"

declare -a prefixes_js=()
for idx in $(getKeys mods_js); do
    prefixes_js+=('-H')
done

declare -a pandoc_opts_js="($(zipped prefixes_js mods_js))"
unset idx

# echo "${pandoc_opts_html[*]}"
# echo "${pandoc_opts_css[*]}"
# echo "${pandoc_opts_js[*]}"


# exit
# step 0.1:
# run before-hook in run/hooks/

# step 0.1:
# parse additional options to pandoc from a run/options.

# step 1:
# assemble html files for left, right panels
# as (-B, --include-before / -A, --include-after )
# includes, which can be declared multiple times for
# mutiple includes.



# Arguments:
# body.html effectively replaces '${ body }' in main.html
# -s make standalone document
# --quiet suppresses warnings
# --embed-resources effectively inlines css+js assets
# -c adds css assets by path
# -H adds js assets by path
# -B adds html asset in left panel
# -A adds html asset in right panel
# -o write template to temp file

# pandoc \
#     body.html \
#     -s \
#     --quiet \
#     --template=main.html \
#     --embed-resources \
#     -c test.css \
#     -H <(echo './test.js')  \
#     -H <(echo './test.js')  \
#     -H <(echo './test.js')  \
#     -B toc.html \
#     -A toc.html \
#     -o tmp.html

pandoc \
    body.html \
    -s \
    --quiet \
    --template=main.html \
    --embed-resources \
    $(echo "${pandoc_opts_html[*]}") \
    $(echo "${pandoc_opts_css[*]}") \
    $(echo "${pandoc_opts_js[*]}") \
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

# step 2.1:
# cleanup temp file
[[ -f tmp.html ]] && cat tmp.html  && rm tmp.html

# step 23:
# run after-hook scripts in module/run/hooks.
