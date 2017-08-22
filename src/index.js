const rule = require('unified-lint-rule')
const visit = require('unist-util-visit')

async function codeHasBashDollars (ast, file) {

  const validate = async (node) => {

    if (!node.value.match(/^\$/m)) { file.message('Precede code lines with a dollar symbol', node) }
  }

  await visit(ast, 'code', validate)
}

module.exports = rule('remark-lint:code-has-bash-dollar', codeHasBashDollars)
