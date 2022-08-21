import { LoaderContext } from 'webpack'
import { getOptions } from 'loader-utils'
import { validate } from 'schema-utils'
import schema from './options.json'

export default function rawLoader<T>(
  this: LoaderContext<T>,
  source: string
): string {
  const options = getOptions(this)

  validate(options, schema, {
    name: 'raw-loader',
    baseDataPath: 'options' // 报错时，显示报错信息的出现路径位置
  })

  const json: string = JSON.stringify(source)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')

  const esModule: boolean =
    typeof options.esModule !== 'undefined' ? options.esModule : true

  return `${esModule ? 'export default' : 'module.exports ='} ${json}`
}
