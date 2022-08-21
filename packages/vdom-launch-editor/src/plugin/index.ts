import startServer from './server'
import getInjectCode from './getInjectCode'
import { Compiler, Compilation } from 'webpack'

interface pluginOptions {
  baseUrl: string
}

interface CustomCompilationHooks {
  htmlWebpackPluginAfterHtmlProcessing: any
}

class VueLaunchEditorPlugin {
  private baseUrl: string

  constructor(options: pluginOptions = { baseUrl: 'http://localhost' }) {
    this.baseUrl = options.baseUrl
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(
      'VueLaunchEditorPlugin',
      (compilation: Compilation): void => {
        startServer(port => {
          const code = getInjectCode({ url: `${this.baseUrl}:${port}` })

          const hooks = compilation.hooks as any as CustomCompilationHooks
          hooks.htmlWebpackPluginAfterHtmlProcessing.tap(
            'HtmlWebpackPlugin',
            data => {
              data.html = data.html.replace('</body>', `${code}\n</body>`)
            }
          )
        })

        // compilation.hooks.normalModuleLoader.tap('vue-loader-plugin', (context) => {
        //   console.info(context);
        // })
      }
    )
  }
}

export default VueLaunchEditorPlugin
