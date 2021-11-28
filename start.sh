#!/bin/bash

# Files
alibaba_scraper=index.js

# Node files
node_stuff_1=package.json
node_stuff_2=package-lock.json
node_stuff_3=node_modules

# Color
red="\e[31m"
green="\e[32m"
purple="\e[35m"
cyan="\e[36m"
rs="\e[0m"

# Messages commands
select_search_target='echo -e -n "[${green}SEARCH${rs}][${red}KEYWORD${rs}]"'
select_search_range='echo -e -n "[${green}SEARCH${rs}][${red}RANGE${rs}]"'
select_do_test='echo -e -n "${cyan}Do you want to would like to do some test?${rs} [${green}Y${rs}] or (${red}Press enter${rs})"'

type=":"

#############
# EXECUTION #
#############

# Node dependencies
dependencies='cheerio axios'

# Check Node dependencies
if ! [ -e $node_stuff_1 ] && ! [ -e $node_stuff_2 ] && ! [ -d $node_stuff_3 ]; then
    echo -e -n "Error trying to get Node depencies do you want install it? [${green}Y${rs}] or (${red}Press enter${rs})"
    read -p $type option

    if [ "${option:0}" == "y" ] || [ "${option:0}" == "Y" ]; then 
        npm init -y
        npm install $dependencies
    fi
fi

# Ask do test
eval $select_do_test
read -p $type do_test

if [ "${do_test:0}" == "y" ] || [ "${do_test:0}" == "Y" ]; then
    # Request input
    
    eval $select_search_target 
    read -p $type target
    
    eval $select_search_range
    read -p $type range
    
    # Run Alibaba scraper
    run="node ${alibaba_scraper} ${target} ${range}"

    eval $run

fi

