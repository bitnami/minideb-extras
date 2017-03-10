#!/bin/bash
. /opt/bitnami/base/functions

print_welcome_page
check_for_updates &

if [[ "$1" == "nami" && "$2" == "start" ]] ||  [[ "$1" == "/init.sh" ]]; then
  nami eval /init.js
fi

exec tini -- "$@"
