// Vendor
import * as FormData from 'form-data'
import * as fs from 'fs-extra'
import * as path from 'path'
import fetch from 'node-fetch'

// Services
import Config from './config'

// Types
import {Response} from 'node-fetch'
import {DocumentConfig} from '../types/document-config'
import {ApiConfig} from '../types/api-config'
import {CommitOptions} from '../types/commit-options'

enum OperationName {
  Sync = 'sync'
}

export default class Document {
  private document: DocumentConfig
  private api: ApiConfig

  constructor(documentConfig: DocumentConfig, apiConfig: ApiConfig) {
    this.document = documentConfig
    this.api = apiConfig
  }

  async sync(file: string, options: CommitOptions) {
    const formData = new FormData()
    formData.append('file', fs.createReadStream(file))
    formData.append('document_path', this.parseDocumentName(file))
    formData.append('document_format', this.document.format)
    formData.append('language', this.document.language)

    let url = `${this.api.url}/sync`
    if (options.peek) url = `${url}/peek`

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: this.authorizationHeader()
    })

    return this.handleResponse(response, options, OperationName.Sync)
  }

  async export(file: string) {
    const query = [
      ['document_path', this.parseDocumentName(file)],
      ['document_format', this.document.format],
      ['language', this.document.language]
    ]
      .map(([name, value]) => `${name}=${value}`)
      .join('&')

    const url = `${this.api.url}/export?${query}`
    const response = await fetch(url, {
      headers: this.authorizationHeader()
    })

    this.writeResponseToFile(response, file)
  }

  private authorizationHeader() {
    return {authorization: `Bearer ${this.api.key}`}
  }

  private parseDocumentName(file: string): string {
    return path.basename(file).replace(path.extname(file), '')
  }

  private writeResponseToFile(response: Response, file: string) {
    return new Promise((resolve, reject) => {
      const fileStream = fs.createWriteStream(file, {autoClose: true})
      response.body.pipe(fileStream)
      response.body.on('error', reject)
      fileStream.on('finish', resolve)
    })
  }

  private async handleResponse(
    response: Response,
    options: CommitOptions,
    operationName: OperationName
  ) {
    if (options.peek) {
      const {data} = await response.json()

      return {peek: data}
    } else {
      if (response.status >= 400) return {[operationName]: {success: false}}

      return {[operationName]: {success: true}}
    }
  }
}
