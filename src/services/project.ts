// Vendor
import fetch from 'node-fetch';

// Types
import {ApiConfig} from '../types/api-config';
import {Project} from '../types/project';

export default class ProjectFetcher {
  static async fetch(api: ApiConfig): Promise<Project> {
    const response = await this.graphql(api);
    const data = await response.json();

    return data.data.viewer.project;
  }

  private static graphql(api: ApiConfig) {
    const query = `query ProjectDetails($project_id: ID!) {
      viewer {
        project(id: $project_id) {
          id
          name
          revisions {
            id
            language {
              name
            }
          }
        }
      }
    }`;

    return fetch(`${api.url}/graphql`, {
      method: 'POST',
      body: JSON.stringify({query}),
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${api.key}`
      }
    });
  }
}
