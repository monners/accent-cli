// Vendor
import chalk from 'chalk'

// Types
import {DocumentConfig} from '../../types/document-config'
import {Project} from '../../types/project'

export default class ProjectAddTranslationsFormatter {
  private readonly project: Project

  constructor(project: Project) {
    this.project = project
  }

  public log(documentConfigs: DocumentConfig[]) {
    console.log(
      chalk.bold('––– Add translations:'),
      chalk.bold.white(this.project.name)
    )

    console.log('')

    console.log(chalk.magenta('Adding translations paths'))

    console.log('')
  }
}
