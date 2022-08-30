// Invoked on the commit-msg git hook by yorkie.
const chalk = require('chalk')
console.info(process)
console.info(process.env)
const msgPath = process.env.GIT_PARAMS
const lifecycleEvent = process.env.npm_lifecycle_event
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim()
const commitRE =
  /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,50}/
const skipRe = /lerna/g

if (!commitRE.test(msg) && !skipRe.test(lifecycleEvent)) {
  console.log()
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
      `invalid commit message format.`
    )}\n\n` +
      chalk.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n
        feat(xx): write feature here
        `
      )
  )
  process.exit(1)
}
