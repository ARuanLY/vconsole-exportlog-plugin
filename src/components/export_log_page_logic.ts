import { buildLogTextForTypes } from '../util/log'
import type { LogItem, LogType } from '../types/vconsole'

export type ExportLogPageState = {
  normalizedSelectedTypes: LogType[]
  isAllSelected: boolean
  logText: string
}

/**
 * Build derived page state from logs and selected types.
 *
 * @param logList full log list
 * @param selectedTypes selected log types from UI state
 * @param allLogTypes available type options in display order
 * @returns computed page state including normalized types, all-selected flag, and log preview text
 *
 * @example
 * createExportLogPageState(logList, ['log', 'warn'], ['log', 'info', 'warn', 'error'])
 */
export function createExportLogPageState(
  logList: LogItem[],
  selectedTypes: LogType[],
  allLogTypes: LogType[],
): ExportLogPageState {
  const uniqueSelectedTypes = Array.from(new Set(selectedTypes))
  const normalizedSelectedTypes = allLogTypes.filter((item) =>
    uniqueSelectedTypes.includes(item),
  )
  return {
    normalizedSelectedTypes,
    isAllSelected: normalizedSelectedTypes.length === allLogTypes.length,
    logText: buildLogTextForTypes(logList, normalizedSelectedTypes),
  }
}

/**
 * Return next selection when toggling the "All" checkbox.
 *
 * @param checked whether "All" is checked
 * @param allLogTypes available type options in display order
 * @returns all log types when checked, otherwise an empty array
 *
 * @example
 * toggleAllLogTypes(true, ['log', 'info', 'warn', 'error'])
 * toggleAllLogTypes(false, ['log', 'info', 'warn', 'error'])
 */
export function toggleAllLogTypes(
  checked: boolean,
  allLogTypes: LogType[],
): LogType[] {
  return checked ? [...allLogTypes] : []
}

/**
 * Toggle one log type and keep the final result ordered by allLogTypes.
 *
 * @param selectedTypes current selected types
 * @param targetType log type to toggle
 * @param checked whether the target type should be selected
 * @param allLogTypes available type options in display order
 * @returns next selected type array with stable order
 *
 * @example
 * toggleSingleLogType(['log', 'info'], 'warn', true, ['log', 'info', 'warn', 'error'])
 * toggleSingleLogType(['log', 'warn'], 'warn', false, ['log', 'info', 'warn', 'error'])
 */
export function toggleSingleLogType(
  selectedTypes: LogType[],
  targetType: LogType,
  checked: boolean,
  allLogTypes: LogType[],
): LogType[] {
  const nextSet = new Set(selectedTypes)
  if (checked) {
    nextSet.add(targetType)
  } else {
    nextSet.delete(targetType)
  }
  return allLogTypes.filter((item) => nextSet.has(item))
}
