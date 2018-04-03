// Command
import Command from '../base-commit'

// Formatters
import ExportFormatter from '../services/formatters/project-export'
import Formatter from '../services/formatters/project-sync'

// Services
import Document from '../services/document'
import CommitOperationFormatter from '../services/formatters/commit-operation'
import DocumentExportFormatter from '../services/formatters/document-export'

// Types
import {DocumentConfig} from '../types/document-config'
import {Project} from '../types/project'

export default class Sync extends Command {
  public static description = 'Sync files in Accent and write them to your local filesystem'

  public static examples = [`$ accent sync`, `$ accent sync Localization-admin`]

  public static args = [...Command.args]
  public static flags = {...Command.flags}

  public async run() {
    const {args, flags} = this.parse(Sync)

    // Fetch config to sync, defaults to all config entries in sync config.
    const documents = this.projectConfig.sync(args.filename)

    // From all the documentConfigs, do the sync or peek operations and log the results.
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
    const {flags} = this.parse(Sync)
    const formatter = new CommitOperationFormatter()

    return document.paths.map(async path => {
      const operations = await document.sync(path, flags)

      if (operations.sync && !operations.peek) formatter.logSync(path)
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