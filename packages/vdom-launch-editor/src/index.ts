import { parse } from '@vue/compiler-sfc'
import { TemplateChildNode } from '@vue/compiler-core'
import { LoaderContext } from 'webpack'
import { InjectDataEnum } from './constants'

function getInjectedContent(
  ast: TemplateChildNode,
  source: string,
  filePath: string
): string {
  // 如果是标签节点
  if (ast.type === 1) {
    if (ast.children && ast.children.length) {
      // 要倒序处理，因为多节点的时候，正序处理注入代码消息时会混乱
      for (let i = ast.children.length - 1; i >= 0; i--) {
        const nodeAst = ast.children[i]
        source = getInjectedContent(nodeAst, source, filePath)
      }
    }
    const line = ast.loc.start.line
    const column = ast.loc.start.column
    const columnToInject = column + ast.tag.length
    const lineToInject = line - 1
    const codeList = source.split('\n')
    const targetLine = codeList[lineToInject]
    const tagName = ast.tag

    const newLine =
      targetLine.slice(0, columnToInject) +
      ` ${InjectDataEnum.INJECT_LINE_NAME}="${line}" ${InjectDataEnum.INJECT_COLUMN_NAME}="${column}" ${InjectDataEnum.INJECT_FILE_PATH_NAME}="${filePath}" ${InjectDataEnum.INJECT_TAG_NAME}="${tagName}" ` +
      targetLine.slice(columnToInject)

    codeList[lineToInject] = newLine

    source = codeList.join('\n')
  }
  return source
}

export default function vueLaunchLoader<T>(
  this: LoaderContext<T>,
  content: string
): string {
  // const params = new URLSearchParams(this.resource);
  // console.info(params.get('type'));
  // if (params.get('type') === 'template') {
  const parseContent = parse(content)
  const filePath = this.resourcePath // 当前文件的本地绝对路径
  let ret: string
  if (parseContent.descriptor?.template) {
    const templateAst = parseContent.descriptor.template.ast
    const templateSource = templateAst.loc.source

    const newContent = getInjectedContent(templateAst, templateSource, filePath)

    ret = content.replace(templateSource, newContent)
    return ret
  }

  return content
}
