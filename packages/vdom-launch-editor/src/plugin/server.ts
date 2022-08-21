import http from 'http'
import portFinder from 'portfinder'
import launchEditor from 'launch-editor'
// 单例
let isServed = false

type fnCb = (a: number) => void
export default function startServer(cb: fnCb): void {
  if (isServed) {
    return
  }
  isServed = true

  const server = http.createServer((req, res) => {
    const params = new URLSearchParams(req?.url?.slice(1))
    const filePath = params.get('filePath')
    const line = Number(params.get('line'))
    const column = Number(params.get('column'))

    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    })
    res.end('ok')

    launchEditor(`${filePath}:${line}:${column}`)
  })

  portFinder.getPort({ port: 4000 }, (err, port) => {
    if (err) {
      throw err
    }

    server.listen(port, () => {
      cb(port)
    })
  })
}
