// Types
import {ApiConfig} from './api-config'
import {DocumentConfig} from './document-config'

export interface Config {
  api: ApiConfig
  sync: DocumentConfig[]
  addTranslations: DocumentConfig[]
}
