import {
  createExportLogPageState,
  toggleAllLogTypes,
  toggleSingleLogType,
} from './export_log_page_logic'
import type { LogItem, LogType } from '../types/vconsole'
import { ALL_LOG_TYPES, renderExportLogPageView } from './export_log_page_view'

/**
 * Compose state and view callbacks, then render the export-log panel.
 *
 * @param params render parameters
 * @param params.container target DOM container for the panel
 * @param params.logList full log entries from vConsole
 * @param params.selectedTypes selected log types for filtering
 * @param params.onSelectedTypesChange callback fired when selection changes
 * @param params.onSelectedTypesLogContentChange callback fired with generated log text
 * @returns no return value
 *
 * @example
 * renderExportLogPage({
 *   container,
 *   logList,
 *   selectedTypes: ['log', 'error'],
 *   onSelectedTypesChange: setTypes,
 *   onSelectedTypesLogContentChange: setText,
 * })
 */
export function renderExportLogPage({
  container,
  logList,
  selectedTypes,
  onSelectedTypesChange,
  onSelectedTypesLogContentChange,
}: {
  container: HTMLElement
  logList: LogItem[]
  selectedTypes: LogType[]
  onSelectedTypesChange: (types: LogType[]) => void
  onSelectedTypesLogContentChange: (content: string) => void
}): void {
  const state = createExportLogPageState(logList, selectedTypes, ALL_LOG_TYPES)
  onSelectedTypesLogContentChange(state.logText)

  renderExportLogPageView({
    container,
    state,
    onToggleAll: (checked) => {
      onSelectedTypesChange(toggleAllLogTypes(checked, ALL_LOG_TYPES))
    },
    onToggleType: (type, checked) => {
      onSelectedTypesChange(
        toggleSingleLogType(
          state.normalizedSelectedTypes,
          type,
          checked,
          ALL_LOG_TYPES,
        ),
      )
    },
  })
}
