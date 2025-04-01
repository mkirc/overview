all() {
    # Args: [Name of Array to act on: String] [Expression: String...]
    # Returns: [True if all calls to Expression evaluated to True, else False: Int]
    local -n array1="$1"
    local elm
    shift

    for elm in "${array1[@]}"; do
        "$@" "$elm" || return 1
    done
    return 0
}

any() {
    # Args: [Name of Array to act on: String] [Expression: String...]
    # Returns: [True if all calls to Expression evaluated to True, else False: Int]
    local -n array1="$1"
    local elm
    shift

    for elm in "${array1[@]}"; do
        "$@" "$elm" && return 0
    done
    return 1
}

not() {
    if "$@"; then
        return 1
    else
        return 0
    fi
}

inArray() {
    # Args: [Name of array to match: String] [Element to match: String]
    # Returns: [True if element is found, else false: Int]
    local -n arrayToMatch="$1"
    local match="$2"
    local elm

    # echo "$match"
    for elm in "${arrayToMatch[@]}"; do
        [[ "$elm" == "$match" ]] && return 0
     done
    return 1
}

append() {
    # Args [Name of Array to append to: String] [Element to append: Any]
    # Returns: [True, if append succeeded, else False: Int]
    local -n ref="$1"
    local elm="$2"

    ref+=("$2")
    return $?
}

insertAt() {
    # Args: [Name of Array to insert into: String] [Index to insert after: Int] [Element  to insert: Any]
    # Returns: [Return value of insert operation, 13 if Index > length of Array: Int]
    local -n ref="$1"
    local -i idx="$2"
    local elm="$3"
    local -i len="${#ref[@]}"
    [[ $(($len + 1)) -gt $idx && $idx -ge 0 ]] \
        || { echo "Index (${2}) out of range"; return 13; }

    ref=( "${ref[@]:0:$idx}" "$elm" "${ref[@]:$idx:$len}" )
    return $?
}

catArray() {
    # Args: [Names of arrays to concatenate: String...]
    # Returns: [Quoted String of concatenated Array Elements: String]

    # Note the unusual quoting syntax. This is mandatory when constructing
    # arrays from @Q-transformed strings
    local -a params="(${*:-$(</dev/stdin)})"
    local i
    for ((i=0; i<"${#params[@]}"; i++)); do
        local -n arr"${i}"="${params[${i}]}"
    done
    local -a out=()
    for ((i=0; i<"${#params[@]}"; i++)); do
        local -n arrayName="arr${i}"
        # declare -p "arr${i}"
        out=("${out[@]}" "${arrayName[@]}")
    done
    echo "${out[@]@Q}"
}

splitArray() {
    # Args: [Quoted string of array elements: String]
    # Returns: [Newline-separated array elements: String]
    local -ar tempArray="( ${*:-$(</dev/stdin)} )"
    # declare -p arr
    printf '%s\n' "${tempArray[@]}"
}

# This is the inverse function to splitarray
unsplitArray() {
    # Args: [Newline-separated array elements: String]
    # Returns [Quoted string of array elements: String]
    local -a tempArray=()
    if [[ $# -gt 0 ]]; then
        readarray -t tempArray < <(echo "$@")
    else
        readarray -t tempArray </dev/stdin
    fi
    # declare -p tempArray
    echo "${tempArray[@]@Q}"
}

stripPrefix() {
    # Args: [Name of Array to strip: String] [Separator String according toBash Glob Notation: String]
    # Returns [Quoted string of stripped array elements: String]
    local sep="$1"
    shift
    local -a tempArray="( ${*:-$(</dev/stdin)} )"
    local -i idx

    for idx in "${!tempArray[@]}"; do
        tempArray[$idx]="${tempArray[$idx]##$sep}" || return 1
    done
    echo "${tempArray[@]@Q}"
}

stripSuffix() {
    # Args: [Name of Array to strip: String] [Separator String according toBash Glob Notation: String]
    # Returns [Quoted string of stripped array elements: String]
    local sep="$1"
    shift
    local -a tempArray="( ${*:-$(</dev/stdin)} )"
    local -i idx

    for idx in "${!tempArray[@]}"; do
        tempArray[$idx]="${tempArray[$idx]%%$sep}" || return 1
    done
    echo "${tempArray[@]@Q}"
}

gatherAll() {
    # Args: [Name of Array to compare from: String] [Expression]
    # Returns [Quoted string of array elements: String]
    local -n array1="$1"
    local -a out=()
    local elm

    shift

    for elm in "${array1[@]}"; do
        if "$@" "$elm"; then
            out+=("$elm")
        fi
    done
    echo "${out[@]@Q}"
}

zipped() {
    # Args: [Name of Array take the even positions: String] [Name of Array to take the odd positions: String]
    # Returns: [Quoted Array, containing zipped values of inputs: String]
    local -n arrayEven="$1"
    local -n arrayOdd="$2"
    [[ "${#arrayOdd[@]}" == "${#arrayEven[@]}" ]] \
        || { echo 'Arrays are not same length, aborting'; return 12; }

    local -a out=()
    local -i index
    for index in "${!arrayEven[@]}"; do
        insertAt out $(($index*2)) "${arrayEven[$index]}"
        insertAt out $(($index*2+1)) "${arrayOdd[$index]}"
    done
    echo "${out[@]@Q}"
}

getKeys() {
    # Args: [Name of Array: String]
    # Returns: String of Keys for Array: String|Int]
    local -n ref="$1"
    echo "${!ref[@]}"
}
