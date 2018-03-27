// Types
import {Project, Revision} from '../types/project';
import {PeekOperation} from '../types/operation';

export default class CommitOperationFormatter {
  private project: Project;
  private revisionByIds: {};

  constructor(project: Project) {
    this.project = project;
    this.revisionByIds = this.project.revisions.reduce((memo: object, revision: Revision) => {
      memo[revision.id] = revision;
      return memo;
    }, {});
  }

  logProjectHeader() {
    console.log('----------------------')
    console.log('Project: ', this.project.name);
    console.log('----------------------')
  }

  logSync(path: string) {
    console.log('––––––––––––––')
    console.log('File: ', path)
    console.log('Successfully synced the locale files')
  }

  logPeek(path: string, operations: PeekOperation) {
    console.log('––––––––––––––')
    console.log('File: ', path)

    if (!Object.keys(operations.stats).length) {
      console.log('~~ No changes for this file ~~')
    }

    Object.entries(operations.stats).map(([revisionId, stats]) => {
      console.log('Language: ', this.revisionByIds[revisionId].language.name)
      console.log('––––––––––––––')

      Object.entries(stats).map(([action, name]) => {
        console.log(action, name)
      });
    });
  }
}
