accent
======



[![Version](https://img.shields.io/npm/v/accent.svg)](https://npmjs.org/package/accent)
[![CircleCI](https://circleci.com/gh/simonprev/accent/tree/master.svg?style=shield)](https://circleci.com/gh/simonprev/accent/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/simonprev/accent?branch=master&svg=true)](https://ci.appveyor.com/project/simonprev/accent/branch/master)
[![Codecov](https://codecov.io/gh/simonprev/accent/branch/master/graph/badge.svg)](https://codecov.io/gh/simonprev/accent)
[![Downloads/week](https://img.shields.io/npm/dw/accent.svg)](https://npmjs.org/package/accent)
[![License](https://img.shields.io/npm/l/accent.svg)](https://github.com/simonprev/accent/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g accent
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
* [accent hello [FILE]](#accent-hello-file)
* [accent help [COMMAND]](#accent-help-command)

## accent hello [FILE]

describe the command here

```
USAGE
  $ accent hello [FILE]

OPTIONS
  -f, --force
  -n, --name=name  name to print

EXAMPLE
  $ accent hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/simonprev/accent/blob/v0.0.0/src/commands/hello.ts)_

## accent help [COMMAND]

display help for accent

```
USAGE
  $ accent help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v1.2.1/src/commands/help.ts)_
<!-- commandsstop -->
