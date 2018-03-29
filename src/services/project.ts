// Vendor
import fetch from 'node-fetch'

// Types
import {ApiConfig} from '../types/api-config'
import {Project} from '../types/project'

export default class ProjectFetcher {
  public async fetch(api: ApiConfig): Promise<Project> {
    const response = await this.graphql(api)
    const data = await response.json()

    return data.data.viewer.project
  }

  private graphql(api: ApiConfig) {
    const query = `query ProjectDetails($project_id: ID!) {
      viewer {
        project(id: $project_id) {
          id
          name
          lastSyncedAt

          language {
            id
            name
          }
          documents {
            entries {
              id
              path
              format
            }
          }
          revisions {
            id
            translationsCount
            conflictsCount
            reviewedCount
            language {
              id
              name
            }
          }
        }
      }
    }`

    return fetch(`${api.url}/graphql`, {
      body: JSON.stringify({query}),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${api.key}`
      },
      method: 'POST'
    })
  }
}
