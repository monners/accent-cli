// Vendor
import * as glob from 'glob'

// Types
import {DocumentConfig} from '../types/document-config'

export default class Tree {
  private document: DocumentConfig

  constructor(document: DocumentConfig) {
    this.document = document
  }

  list(): string[] {
    return glob.sync(this.document.path, {})
  }
}
