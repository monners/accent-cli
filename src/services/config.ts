// Vendor
import {error} from '@oclif/errors'
import * as fs from 'fs-extra'

// Services
import Document from './document'

// Types
import {Config} from '../types/config'
import {DocumentConfig} from '../types/document-config'

export default class ConfigFetcher {
  public readonly config: Config

  constructor() {
    this.config = fs.readJsonSync('accent.json')
  }

  public files(): Document[] {
    return this.operationConfig(this.config.files)
  }

  private operationConfig(
    documentConfigs: DocumentConfig[]
  ) {
    if (!documentConfigs.length) {
      error('You must have at least 1 document set in your config')
    }

    return documentConfigs.map(
      documentConfig => new Document(documentConfig, this.config)
    )
  }
}
