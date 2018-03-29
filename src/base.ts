// Vendor
import Command from '@oclif/command'
import {error} from '@oclif/errors'
import chalk from 'chalk'
import cli from 'cli-ux'

// Services
import ConfigFetcher from './services/config'
import ProjectFetcher from './services/project'

// Types
import {ApiConfig} from './types/api-config'
import {Project} from './types/project'

const sleep = (ms: number) =>
  new Promise((resolve: () => void) => setTimeout(resolve, ms))

export default abstract class extends Command {
  public projectConfig: ConfigFetcher = new ConfigFetcher()
  public apiConfig: ApiConfig = this.projectConfig.api()
  public project?: Project

  public async init() {
    if (!this.apiConfig.url) error('You must set an API url in your config')
    if (!this.apiConfig.key) error('You must set an API key in your config')

    // Fetch project from the GraphQL API.
    cli.action.start(chalk.white('Fetch config'))
    await sleep(1000)
    const fetcher = new ProjectFetcher()
    this.project = await fetcher.fetch(this.apiConfig)
    cli.action.stop(chalk.green('✓'))
  }
}
