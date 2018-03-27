// Types
import {DocumentConfig} from './document-config'
import {ApiConfig} from './api-config'

export interface Config {
  api: ApiConfig
  sync: DocumentConfig[]
}
