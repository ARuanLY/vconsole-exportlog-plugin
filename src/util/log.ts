import stringify from 'json-stringify-safe'
import { formatTimestampToHMSMs } from './time'
import type { LogItem, LogType } from '../types/vconsole'

/**
 * Build log text for specific types
 * @param logList log list
 * @param filterTypes filter types
 * @returns log text
 * @example
 * buildLogTextForTypes(logList, ['log', 'error']) // returns log text for log and error types
 * @example
 * buildLogTextForTypes(logList, ['info']) // returns log text for info type
 * @example
 * buildLogTextForTypes(logList, []) // returns empty string
 * @example
 * buildLogTextForTypes(logList, ['log', 'info', 'warn', 'error']) // returns log text for all types
 */
export function buildLogTextForTypes(
  logList: LogItem[],
  filterTypes: LogType[],
): string {
  let content = ''

  logList.forEach((item) => {
    const { date, type, data } = item
    if (!filterTypes.includes(type)) {
      return
    }
    const typeText = formatTypeText(type)
    const timestamp = formatTimestampToHMSMs(date)
    let rowLog = `${typeText} ${timestamp} `

    data.forEach((logCell) => {
      if (typeof logCell.origData === 'string') {
        rowLog += `${logCell.origData} `
      } else {
        rowLog += `${stringify(logCell.origData, null, 2)} `
      }
    })
    content += `${rowLog}\n`
  })

  return content
}

/**
 * Format log type text with padding
 * @param type log type
 * @returns formatted log type text
 * @example
 * formatTypeText('log') // returns '[log  ]'
 * @example
 * formatTypeText('info') // returns '[info ]'
 * @example
 * formatTypeText('warn') // returns '[warn ]'
 * @example
 * formatTypeText('error') // returns '[error]'
 */
function formatTypeText(type: LogType): string {
  const TYPE_TEXT_LENGTH = 5
  const paddedType = type.padEnd(TYPE_TEXT_LENGTH, ' ')
  return `[${paddedType}]`
}
