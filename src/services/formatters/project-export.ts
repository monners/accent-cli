// Vendor
import chalk from 'chalk'

// Types
import {DocumentConfig} from '../../types/document-config'

export default class ProjectExportFormatter {
  public log(documentConfigs: DocumentConfig[]) {
    console.log(chalk.magenta(`Writing paths (${documentConfigs.length})`))
    documentConfigs.forEach((documentConfig: DocumentConfig) => {
      console.log('→', chalk.white.bold(documentConfig.path))
    })

    console.log('')
  }
}
