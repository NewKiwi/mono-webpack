import fs from 'fs'
import path from 'path'

interface getCodeOptions {
  url: string
}

export default function getInjectCode(options: getCodeOptions): string {
  const code = fs.readFileSync(path.join(__dirname, './injectCode.js'), 'utf-8')

  return `<script>\n${code.replace('POST_URL', options.url)}\n</script>`
}
