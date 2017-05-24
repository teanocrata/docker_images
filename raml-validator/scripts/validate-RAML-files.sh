#!/bin/sh
#
# Hook script to verify what is about to be committed.
# Called by "git commit" with no arguments. The hook
# should exit with non-zero status after issuing an
# appropriate message if RAML files on commit don't
# pass raml-validator .

echo '********************************************************'
echo '    Install  dependencies ...'
echo '********************************************************'

npm install

echo '********************************************************'
echo '    Check RAML files ...'
echo '********************************************************'

AREVALID=true
RED='\033[0;31m'
GREEN='\033[0;32m'
BROWN='\033[0;33m'
NC='\033[0m'

if npm run validate; then continue;
else AREVALID=false; fi

if $AREVALID
then
  echo "${GREEN}Checked files on current commit: OK"
  exit 0
else
  echo "${RED}Checked files on current commit: KO"
  exit 1
fi
