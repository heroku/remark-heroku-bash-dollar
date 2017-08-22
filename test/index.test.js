const remark = require('remark')
const fs = require('fs')
const plugin = require('../src/index')

const processMarkdown = async (md) => {
  return remark().use(plugin).process(md)
}

test('it adds an error when code has no bash dollar', async () => {
  let markdown = fs.readFileSync('./test/code_no_dollar_symbols.md', 'utf8')

  const lint = await processMarkdown(markdown)
  expect(lint.messages.length).toBe(1)
  expect(lint.messages[0].message).toBe('Precede code lines with a dollar symbol')
})
test('it does not add error messages when bash dollars are present', async () => {
  let markdown = fs.readFileSync('./test/code_with_dollar_symbols.md', 'utf8')

  const lint = await processMarkdown(markdown)
  expect(lint.messages.length).toBe(0)
})
