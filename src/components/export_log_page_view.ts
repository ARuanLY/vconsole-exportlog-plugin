import type { LogType } from '../types/vconsole'
import type { ExportLogPageState } from './export_log_page_logic'

type InlineStyleObject = {
  [K in keyof CSSStyleDeclaration as K extends number
    ? never
    : CSSStyleDeclaration[K] extends string
      ? K
      : never]?: string
}

export const LOG_TYPE_OPTIONS: Array<{ value: LogType; label: string }> = [
  { value: 'log', label: 'Log' },
  { value: 'info', label: 'Info' },
  { value: 'warn', label: 'Warn' },
  { value: 'error', label: 'Error' },
]

export const ALL_LOG_TYPES: LogType[] = LOG_TYPE_OPTIONS.map(
  (item) => item.value,
)

const WRAPPER_STYLE = styleObjectToString({
  padding: '10px',
  fontSize: '13px',
  lineHeight: '1.5',
})

const SECTION_STYLE = styleObjectToString({
  marginBottom: '10px',
})

const TITLE_STYLE = styleObjectToString({
  fontWeight: '600',
})

const OPTIONS_STYLE = styleObjectToString({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px 12px',
})

const LABEL_STYLE = styleObjectToString({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
})

const PREVIEW_STYLE = styleObjectToString({
  maxHeight: '180px',
  overflowY: 'auto',
  border: '1px solid',
  borderRadius: '4px',
  padding: '8px',
  fontFamily: 'Menlo, Monaco, Consolas, monospace',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
})

/**
 * Render export-log panel UI and bind checkbox interactions.
 *
 * @param params render parameters
 * @param params.container target DOM container
 * @param params.state computed page state
 * @param params.onToggleAll callback for "All" checkbox
 * @param params.onToggleType callback for single type checkbox
 * @returns no return value
 */
export function renderExportLogPageView({
  container,
  state,
  onToggleAll,
  onToggleType,
}: {
  container: HTMLElement
  state: ExportLogPageState
  onToggleAll: (checked: boolean) => void
  onToggleType: (type: LogType, checked: boolean) => void
}): void {
  container.innerHTML = [
    `<div style="${WRAPPER_STYLE}">`,
    `  <div style="${SECTION_STYLE}">`,
    `    <div style="${TITLE_STYLE}">1. Select the log types you want to export or copy:</div>`,
    `    <div id="vconsole-exportlog-types" style="${OPTIONS_STYLE}"></div>`,
    '  </div>',
    '  <div>',
    `    <div style="${TITLE_STYLE}">2. Log preview:</div>`,
    `    <div style="${PREVIEW_STYLE}">${escapeHtml(state.logText.length > 0 ? state.logText : 'No logs available for current selection.')}</div>`,
    '  </div>',
    '</div>',
  ].join('')

  const optionsContainer = container.querySelector('#vconsole-exportlog-types')
  if (!optionsContainer) {
    return
  }

  optionsContainer.appendChild(
    createCheckboxItem({
      label: 'All',
      value: '__all__',
      checked: state.isAllSelected,
      onChange: onToggleAll,
    }),
  )

  LOG_TYPE_OPTIONS.forEach((option) => {
    optionsContainer.appendChild(
      createCheckboxItem({
        label: option.label,
        value: option.value,
        checked: state.normalizedSelectedTypes.includes(option.value),
        onChange: (checked) => onToggleType(option.value, checked),
      }),
    )
  })
}

/**
 * Create a labeled checkbox element for the filter toolbar.
 *
 * @param params checkbox parameters
 * @param params.label display text
 * @param params.value input value
 * @param params.checked whether checkbox is checked
 * @param params.onChange callback triggered on input change
 * @returns checkbox label wrapper element
 */
function createCheckboxItem({
  label,
  value,
  checked,
  onChange,
}: {
  label: string
  value: string
  checked: boolean
  onChange: (checked: boolean) => void
}): HTMLLabelElement {
  const wrapper = document.createElement('label')
  wrapper.style.cssText = LABEL_STYLE

  const input = document.createElement('input')
  input.type = 'checkbox'
  input.value = value
  input.checked = checked
  input.addEventListener('change', () => {
    onChange(input.checked)
  })

  const textNode = document.createTextNode(label)
  wrapper.appendChild(input)
  wrapper.appendChild(textNode)

  return wrapper
}

/**
 * Escape text before writing it into HTML content.
 *
 * @param rawText raw text content
 * @returns escaped HTML-safe text
 *
 * @example
 * escapeHtml('<div>test</div>') // '&lt;div&gt;test&lt;/div&gt;'
 */
function escapeHtml(rawText: string): string {
  return rawText
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * Convert a camelCase style object into an inline CSS string.
 *
 * @param style style object with camelCase keys
 * @returns inline CSS string
 *
 * @example
 * styleObjectToString({ fontSize: '13px', lineHeight: '1.5' })
 */
function styleObjectToString(style: InlineStyleObject): string {
  return Object.entries(style)
    .map(([key, value]) => `${toKebabCase(key)}:${value};`)
    .join('')
}

/**
 * Convert camelCase property names to kebab-case CSS keys.
 *
 * @param text camelCase text
 * @returns kebab-case text
 *
 * @example
 * toKebabCase('fontSize') // 'font-size'
 */
function toKebabCase(text: string): string {
  return text.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)
}
