#!/usr/bin/env bash

# Prevent filename expansion (like **/*.* file pattern)
set -f

# The error variable is used in src/options-parser.sh and src/options-validator.sh
has_error=false
