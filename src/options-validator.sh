#!/bin/bash

if [ -z "$API_KEY" ]; then
  printf "${UWhite}Parameter error:${Color_Off} \`--api-key\` must be set, you’ll find the value in your project settings\n"
  has_error=true
fi

if [ -z "$API_URL" ]; then
  printf "${UWhite}Parameter error:${Color_Off} \`--api-url\` must be set to a valid URL\n"
  has_error=true
fi

if [ -n "$input_directory" ] && [ ! -d "$input_directory" ]; then
  printf "${UWhite}Parameter error:${Color_Off} \`$input_directory\` must be a directory\n"
  has_error=true
fi

if [ -n "$input_file" ] && [ ! -e "$input_file" ]; then
  printf "${UWhite}Parameter error:${Color_Off} \`$input_file\` must be a file\n"
  has_error=true
fi

if [ -z "$file_language" ]; then
  printf "${UWhite}Parameter error:${Color_Off} \`--language\` parameter must be set (Maybe try something like --language=fr)\n"
  has_error=true
fi

if [ "$operation" = "export" ] && [ -z "$file_format" ]; then
  printf "${UWhite}Parameter error:${Color_Off} \`--format\` parameter must be set on an export operation\n"
  has_error=true
fi

if [ "$operation" = "export" ] && [ -z "$output_file" ]; then
  printf "${UWhite}Parameter error:${Color_Off} \`--output-file\` parameter must be set on an export operation\n"
  has_error=true
fi

if [ "$operation" = "sync" ] && [ -z "$input_file" ]; then
  if [ -z "$input_directory" ]; then
    printf "${UWhite}Parameter error:${Color_Off} \`--input-file\` or \`--input-directory\` parameter must be set on a sync operation\n"
    has_error=true
  fi
fi

if [ "$operation" = "merge" ] && [ -z "$input_file" ]; then
  if [ -z "$input_directory" ]; then
    printf "${UWhite}Parameter error:${Color_Off} \`--input-file\` or \`--input-directory\` parameter must be set on a merge operation\n"
    has_error=true
  fi
fi

if [ -n "$output_file" ] && [ -e "$output_file" ] && [ $has_error != "true" ]; then
  printf "${UWhite}Existing file:${Color_Off} $output_file already exists, do you want to overwrite it? Y/n: "

  read overwrite_output_file

  if [ ! "$overwrite_output_file" == "Y" ]; then
    has_error=true
  fi
fi

if [ $has_error == "true" ]; then
  printf "${URed}Error:${Color_Off} ${Red}Cannot complete operation${Color_Off}\n"
  exit 1
fi
