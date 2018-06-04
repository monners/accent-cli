import {expect, test} from '@oclif/test'

describe('hello', () => {
  test
  .stdout()
  .command(['hello'])
  .catch(/is not a accent command./)
  .it('shows version', context => {
    expect(context.stdout).to.equal('')
  })
});
