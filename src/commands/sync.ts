// Vendor
import {error} from '@oclif/errors'
import {Command, flags} from '@oclif/command'

// Services
import Config from '../services/config';
import Project from '../services/project';
import Tree from '../services/tree';
import Document from '../services/document';
import CommitOperationFormatter from '../services/commit-operation-formatter';

// Types
import {ApiConfig} from '../types/api-config';
import {DocumentConfig} from '../types/document-config';

export default class Sync extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ accent sync`,
  ]

  static args = [
    {
      name: 'filename',
      required: false
    }
  ]

  static flags = {
    write: flags.boolean({description: 'Write the file from the export _after_ the sync'})
  }

  async run() {
    const {args} = this.parse(Sync)

    const config = new Config();

    const apiConfig = config.api();
    if (!apiConfig.url) error("You must set an API url in your config");
    if (!apiConfig.key) error("You must set an API key in your config");

    // Fetch project from the GraphQL API.
    const project = await Project.fetch(apiConfig);

    // Fetch config to sync, defaults to all config entries in sync config.
    const documentConfigs = config.sync(args.filename);

    const formatter = new CommitOperationFormatter(project);
    formatter.logProjectHeader();

    // From all the documentConfigs, do the sync or peek operations and log the results.
    documentConfigs.forEach((documentConfig) => {
      this.processDocumentConfig(documentConfig, apiConfig, formatter);
    })
  }

  private async processDocumentConfig(documentConfig: DocumentConfig, apiConfig: ApiConfig, formatter: CommitOperationFormatter) {
    const {flags} = this.parse(Sync)

    const document = new Document(documentConfig, apiConfig);
    const paths = new Tree(documentConfig).list()

    const syncOperations = paths.map(async (path) => {
      const operations = await document.sync(path, {peek: !flags.write})

      if (operations.sync) return formatter.logSync(path);
      if (operations.peek) return formatter.logPeek(path, operations.peek);
    });

    // Write the files inplace as extracted by the Tree module
    if (flags.write) {
      await Promise.all(paths.map((path) => document.export(path)));
    }
  }
}
