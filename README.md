Accent CLI
======

[![Version](https://img.shields.io/npm/v/accent-cli.svg)](https://npmjs.org/package/accent-cli)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage
<!-- usage -->
```sh-session
$ npm install -g accent-cli
$ accent COMMAND
running command...
$ accent (-v|--version|version)
accent/0.0.0 darwin-x64 node-v8.5.0
$ accent --help [COMMAND]
USAGE
  $ accent COMMAND
...
```
<!-- usagestop -->

# Commands
<!-- commands -->
## accent help [FILE]

describe the command here

```
USAGE
  $ accent [COMMAND]

COMMANDS
  add-translations  Add translations in Accent and write them to your local filesystem
  help              display help for accent
  stats             Fetch stats from the API and display it beautifully
  sync              Sync files in Accent and write them to your local filesystem
```

## accent sync [FILENAME]

Sync files in Accent and write them to your local filesystem

```
USAGE
  $ accent sync [FILENAME]

OPTIONS
  --write  Write the file from the export _after_ the operation

EXAMPLES
  $ accent sync
  $ accent sync Localization-admin
```

## accent add-translations [FILENAME]

Add translations in Accent and write them to your local filesystem

```
USAGE
  $ accent add-translations [FILENAME]

OPTIONS
  --mergeType=smart|force|passive  [default: passive]
  --write                          Write the file from the export _after_ the operation

EXAMPLES
  $ accent add-translations
  $ accent add-translations Localization-admin
```

## accent stats

Fetch stats from the API and display it beautifully

```
USAGE
  $ accent stats

EXAMPLE
  $ accent stats

OUTPUT
  === Stats cli v2

  === Last synced
  2018-03-27T21:30:06.233789Z

  === Master language
  French

  === Translations (1)
  English

  === Documents
  Format: JSON
  Path: public

  === Strings
  # Strings: 6
  ✓ Reviewed: 0
  × In review: 6
```
<!-- commandsstop -->

# License

`accent-cli` is © 2018 [Mirego](http://www.mirego.com) and may be freely distributed under the [New BSD license](http://opensource.org/licenses/BSD-3-Clause).  See the [`LICENSE.md`](https://github.com/mirego/accent-cli/blob/master/LICENSE.md) file.

# About Mirego

[Mirego](http://mirego.com) is a team of passionate people who believe that work is a place where you can innovate and have fun. We’re a team of [talented people](http://life.mirego.com) who imagine and build beautiful Web and mobile applications. We come together to share ideas and [change the world](http://mirego.org).

We also [love open-source software](http://open.mirego.com) and we try to give back to the community as much as we can.
