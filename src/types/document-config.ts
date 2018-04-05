export enum Hooks {
  beforeSync = 'beforeSync',
  afterSync = 'afterSync',
  beforeAddTranslations = 'beforeAddTranslations',
  afterAddTranslations = 'afterAddTranslations',
  beforeExport = 'beforeExport',
  afterExport = 'afterExport'
}

export interface HookConfig {
  [Hooks.beforeSync]: string
  [Hooks.afterSync]: string
  [Hooks.beforeAddTranslations]: string
  [Hooks.afterAddTranslations]: string
  [Hooks.beforeExport]: string
  [Hooks.afterExport]: string
}

export interface DocumentConfig {
  name: string
  language: string
  format: string
  path: string
  hooks?: HookConfig
}
