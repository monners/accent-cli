export enum Hooks {
  beforeSync = 'beforeSync',
  afterSync = 'afterSync',
  beforeExport = 'beforeExport',
  afterExport = 'afterExport'
}

export interface HookConfig {
  [Hooks.beforeSync]: string
  [Hooks.afterSync]: string
  [Hooks.beforeExport]: string
  [Hooks.afterExport]: string
}

export interface DocumentConfig {
  name: string
  language: string
  format: string
  source: string
  target: string
  hooks?: HookConfig
}
