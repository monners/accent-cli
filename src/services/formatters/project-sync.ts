// Vendor
import chalk from 'chalk'

// Types
import {DocumentConfig} from '../../types/document-config'
import {Project} from '../../types/project'

export default class ProjectSyncFormatter {
  private readonly project: Project

  constructor(project: Project) {
    this.project = project
  }

  public log(documentConfigs: DocumentConfig[]) {
    console.log(chalk.bold('=== Sync'), chalk.bold.white(this.project.name))

    console.log('')

    console.log(chalk.magenta(`Syncing paths (${documentConfigs.length})`))
    documentConfigs.forEach((documentConfig: DocumentConfig) => {
      console.log('→', chalk.white.bold(documentConfig.path))
    })

    console.log('')
  }
}
