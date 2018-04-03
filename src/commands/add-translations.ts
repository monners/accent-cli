// Command
import {flags} from '@oclif/command'
import Command from '../base-commit'

// Formatters
import Formatter from '../services/formatters/project-add-translations'
import ExportFormatter from '../services/formatters/project-export'

// Services
import Document from '../services/document'
import CommitOperationFormatter from '../services/formatters/commit-operation'
import DocumentExportFormatter from '../services/formatters/document-export'

// Types
import {DocumentConfig} from '../types/document-config'
import {Project} from '../types/project'

export default class AddTranslations extends Command {
  public static description = 'Add translations in Accent and write them to your local filesystem'

  public static examples = [
    `$ accent add-translations`,
    `$ accent add-translations Localization-admin`
  ]

  public static args = [...Command.args]
  public static flags = {
    ...Command.flags,
    mergeType: flags.string({
      default: 'passive',
      options: ['smart', 'force', 'passive'],
      required: false
    })
  }

  public async run() {
    const {args, flags} = this.parse(AddTranslations)

    // Fetch config to add translations, defaults to all config entries in addTranslations config.
    const documents = this.projectConfig.addTranslations(args.filename)

    // From all the documentConfigs, do the add translations or peek operations and log the results.
    this.logProjectOperation(
      this.project!,
      documents.map((document: Document) => document.config)
    )
    for (const document of documents) {
      await Promise.all(this.processDocumentConfig(document))
    }

    if (!flags.write) return
    const formatter = new DocumentExportFormatter()

    // From all the documentConfigs, do the export, write to local file and log the results.
    this.logProjectExport(
      documents.map((document: Document) => document.config)
    )
    for (const document of documents) {
      await Promise.all(
        document.paths.map(path => {
          formatter.log(path)
          return document.export(path)
        })
      )
    }
  }

  private processDocumentConfig(document: Document) {
    const {flags} = this.parse(AddTranslations)
    const formatter = new CommitOperationFormatter()

    return document.paths.map(async path => {
      const operations = await document.addTranslations(path, flags)

      if (operations.addTranslations && !operations.peek) {
        formatter.logAddTranslation(path)
      }

      if (operations.peek) formatter.logPeek(path, operations.peek)

      return operations
    })
  }

  private logProjectOperation(
    project: Project,
    documentConfigs: DocumentConfig[]
  ) {
    const formatter = new Formatter(project)
    formatter.log(documentConfigs)
  }

  private logProjectExport(documentConfigs: DocumentConfig[]) {
    const formatter = new ExportFormatter()
    formatter.log(documentConfigs)
  }
}
