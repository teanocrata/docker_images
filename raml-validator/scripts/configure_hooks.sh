#!/bin/sh

# This script will convert your local .git/hooks directory to
# execute some team hooks

cp 'pre-commit' '../.git/hooks/pre-commit'
sudo chmod +x '../.git/hooks/pre-commit'
