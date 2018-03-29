// Vendor
import {flags} from '@oclif/command'

// Command
import Command from './base'

export default abstract class extends Command {
  public static args = [
    {
      name: 'filename',
      required: false
    }
  ]

  public static flags = {
    write: flags.boolean({
      description: 'Write the file from the export _after_ the operation'
    })
  }
}
