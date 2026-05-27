/**
 * Download content as a file
 * @param content - The content to be downloaded
 * @param filename - The name of the file
 */
export function download(content: string, filename: string): void {
  const eleLink = document.createElement('a')
  eleLink.download = filename
  eleLink.style.display = 'none'
  const blob = new Blob([content])
  eleLink.href = URL.createObjectURL(blob)
  document.body.appendChild(eleLink)
  eleLink.click()
  document.body.removeChild(eleLink)
}
