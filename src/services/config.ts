// Vendor
import {error} from '@oclif/errors'
import * as fs from 'fs-extra'

// Types
import {Config} from '../types/config';
import {ApiConfig} from '../types/api-config';
import {DocumentConfig} from '../types/document-config';

export default class ConfigFetcher {
  private config: Config;

  constructor() {
    this.config = fs.readJsonSync('accent.json')
  }

  sync(nameInConfig: string): DocumentConfig[] {
    let document = this.findByNameSync(nameInConfig);
    if (!document && nameInConfig) error("No match in your config for this file");

    const documents = document ? [document] : this.config.sync;

    if (!documents.length) error("You must have at least 1 document set in your config");

    return documents;
  }

  api(): ApiConfig {
    return this.config.api;
  }

  private findByNameSync(nameInConfig: string) {
    return this.config.sync.find(({name}) => name === nameInConfig);
  }
}
