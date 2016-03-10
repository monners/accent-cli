#!/bin/bash

if [ -n "$input_directory" ] && [ -d "$input_directory" ]; then
  zip -qr $input_directory $input_directory
  input_file="$input_directory".zip
fi

if [ -z "$filepath" ] && [ -n "$input_directory" ]; then
  filepath=**/*.*
fi

if [ -z "$filepath" ] && [ -n "$input_file" ]; then
  filepath=$input_file
fi
