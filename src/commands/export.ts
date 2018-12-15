// Command
import Command from '../base'

// Formatters
import ExportFormatter from '../services/formatters/project-export'

// Services
import Document from '../services/document'
import DocumentPathsFetcher from '../services/document-paths-fetcher'
import DocumentExportFormatter from '../services/formatters/document-export'
import HookRunner from '../services/hook-runner'

// Types
import {Hooks} from '../types/document-config'

export default class Export extends Command {
  public static description =
    'Export files from Accent and write them to your local filesystem'

  public static examples = [`$ accent export`]

  public static args = []
  public static flags = {}

  public async run() {
    const documents = this.projectConfig.files()
    const documentConfigs = documents.map(
      (document: Document) => document.config
    )

    const formatter = new DocumentExportFormatter()

    // From all the documentConfigs, do the export, write to local file and log the results.
    new ExportFormatter().log(documentConfigs)

    for (const document of documents) {
      await new HookRunner(document).run(Hooks.beforeExport)

      const targets = new DocumentPathsFetcher().fetch(this.project!, document)

      await Promise.all(
        targets.map(({path, language}) => {
          formatter.log(path)
          return document.export(path, language)
        })
      )

      await new HookRunner(document).run(Hooks.afterExport)
    }
  }
}
