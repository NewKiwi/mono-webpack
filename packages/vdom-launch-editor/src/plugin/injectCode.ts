function sendLaunchData(targetNode: Element) {
  const filePath = targetNode.getAttribute('_pos_path')
  const line = targetNode.getAttribute('_pos_line')
  const column = targetNode.getAttribute('_pos_column')

  const url = `POST_URL?filePath=${filePath}&line=${line}&column=${column}`

  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.send()
}

window.addEventListener('click', (e: MouseEvent) => {
  if (e.ctrlKey) {
    sendLaunchData(e.target as Element)
  }
})
