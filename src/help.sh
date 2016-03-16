help_message="Usage: accent [OPERATION] [OPTION]...
Sync, merge and export with the Accent API

  --api-url            URL of the Accent API endpoint
  --api-key            key that identify the API Client, you can find it in your project’s settings

  --input-file         file that will be sent to Accent on a sync or merge
  --input-directory    directory that will be zipped and then sent to Accent on a sync or merge
                       This is useful for multi-file projects
  --language           language identifier
  --merge-type         merge type parameter that will be sent to Accent
                       Available merge types: smart, force and passive
  --format             format parameter that will be sent to Accent
                       Available format: ios, android, rails, json, es6_module
  --output-file        file that will be written upon receiveing a file from Accent
  --output-directory   directory that will be written and unzipped upon receiveing a zip from Accent

  --help               show this message

Examples:
  accent sync --input-file=locale.json --language=fr
  accent merge --input-file=activerecord.en.yml --language=en
  accent export --format=json --language=en --output-file=new-locale.json

This package only execute cUrl command. Here is a mapping of an accent cli command vs a cUrl command:

  accent sync
    --api-url=http://accent-url.net
    --api-key=test123
    --input-file=locale.json
    --language=fr

  curl 'http://accent-url.net/sync'
    -F filepath=locale.json
    -F file=@locale.json
    -F language=fr
    -H 'Authorization: Bearer test1234'"
