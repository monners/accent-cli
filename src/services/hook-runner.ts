// Vendor
import {exec} from 'child_process'

// Formatters
import Formatter from './formatters/hook-runner'

// Types
import {HookConfig, Hooks} from '../types/document-config'
import Document from './document'

const hookFunction = (name: Hooks, cmd: string) => {
  if (!cmd) return () => null

  new Formatter().log(name, cmd)

  return () =>
    new Promise((resolve, reject) => {
      exec(cmd, (error, stdout) => {
        if (error) return reject(error)

        resolve(stdout)
      })
    })
}

export default class HookRunner {
  public readonly hooks?: HookConfig

  constructor(document: Document) {
    this.hooks = document.config.hooks
  }

  public async run(name: Hooks) {
    if (!this.hooks) return null

    const hook = hookFunction(name, this.hooks[name])

    return hook()
  }
}
