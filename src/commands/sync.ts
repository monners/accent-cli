// Vendor
import {flags} from '@oclif/command'

// Command
import Command from '../base'

// Formatters
import ExportFormatter from '../services/formatters/project-export'
import SyncFormatter from '../services/formatters/project-sync'
import AddTranslationsFormatter from '../services/formatters/project-add-translations'

// Services
import Document from '../services/document'
import CommitOperationFormatter from '../services/formatters/commit-operation'
import DocumentExportFormatter from '../services/formatters/document-export'
import DocumentPathsFetcher from '../services/document-paths-fetcher'
import HookRunner from '../services/hook-runner'

// Types
import {Hooks} from '../types/document-config'

export default class Sync extends Command {
  public static description =
    'Sync files in Accent and write them to your local filesystem'

  public static examples = [`$ accent sync`, `$ accent sync Localization-admin`]

  public static args = []

  public static flags = {
    'add-translations': flags.boolean({
      description:
        'Add translations in Accent to help translators if you already have translated strings'
    }),
    'merge-type': flags.string({
      description:
        'Will be used in the add translations call as the "merge_type" param',
      options: ['smart', 'passive', 'force'],
      default: 'smart'
    }),
    'sync-type': flags.string({
      description: 'Will be used in the sync call as the "sync_type" param',
      options: ['smart', 'passive'],
      default: 'smart'
    }),
    write: flags.boolean({
      description: 'Write the file from the export _after_ the operation'
    })
  }

  public async run() {
    const {flags} = this.parse(Sync)

    const documents = this.projectConfig.files()
    const documentConfigs = documents.map(
      (document: Document) => document.config
    )

    // From all the documentConfigs, do the sync or peek operations and log the results.
    new SyncFormatter(this.project!).log(documentConfigs)

    for (const document of documents) {
      await new HookRunner(document).run(Hooks.beforeSync)

      await Promise.all(this.syncDocumentConfig(document))

      await new HookRunner(document).run(Hooks.afterSync)
    }

    if (flags['add-translations']) {
      new AddTranslationsFormatter(this.project!).log(documentConfigs)

      for (const document of documents) {
        await Promise.all(this.addTranslationsDocumentConfig(document))
      }
    }

    if (!flags.write) return
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

  private syncDocumentConfig(document: Document) {
    const {flags} = this.parse(Sync)
    const formatter = new CommitOperationFormatter()

    return document.paths.map(async path => {
      const operations = await document.sync(path, flags)

      if (operations.sync && !operations.peek) formatter.logSync(path)
      if (operations.peek) formatter.logPeek(path, operations.peek)

      return operations
    })
  }

  private addTranslationsDocumentConfig(document: Document) {
    const {flags} = this.parse(Sync)
    const formatter = new CommitOperationFormatter()

    const targets = new DocumentPathsFetcher()
      .fetch(this.project!, document)
      .filter(({language}) => language !== document.config.language)

    return targets.map(async ({path, language}) => {
      const operations = await document.addTranslations(path, language, flags)

      if (operations.addTranslations && !operations.peek)
        formatter.logAddTranslations(path)
      if (operations.peek) formatter.logPeek(path, operations.peek)

      return operations
    })
  }
}
