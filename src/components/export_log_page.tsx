import { forwardRef, useImperativeHandle, useState } from 'react'
import type { LogType } from '../types/vconsole'

const LOG_TYPE_OPTIONS: Array<{ value: LogType; label: string }> = [
  { value: 'log', label: 'Log' },
  { value: 'info', label: 'Info' },
  { value: 'warn', label: 'Warn' },
  { value: 'error', label: 'Error' },
]

export const ExportLogPage = forwardRef<
  { updateSelectedTypesLogText: () => void },
  {
    getSelectedTypesLogText: () => string
    onTypesChange: (types: LogType[]) => void
  }
>(({ getSelectedTypesLogText, onTypesChange }, ref) => {
  const [selectedTypes, setSelectedTypes] = useState<LogType[]>([
    'log',
    'info',
    'warn',
    'error',
  ])
  const [displayText, setDisplayText] = useState<string>('')
  const isAllSelected = selectedTypes.length === LOG_TYPE_OPTIONS.length
  const updateSelectedTypesLogText = () => {
    const logText = getSelectedTypesLogText()
    setDisplayText(logText)
  }

  useImperativeHandle(ref, () => ({
    updateSelectedTypesLogText,
  }))

  const handleTypesChange = (types: LogType[]) => {
    onTypesChange(types)
    updateSelectedTypesLogText()
  }

  const toggleAll = (checked: boolean) => {
    const selected = checked ? LOG_TYPE_OPTIONS.map((item) => item.value) : []
    setSelectedTypes(selected)
    handleTypesChange(selected)
  }

  const toggleType = (type: LogType, checked: boolean) => {
    setSelectedTypes((prev) => {
      const updated = checked
        ? (Array.from(new Set([...prev, type])) as LogType[])
        : prev.filter((item) => item !== type)
      const selected = LOG_TYPE_OPTIONS.map((item) => item.value).filter(
        (item) => updated.includes(item),
      )
      handleTypesChange(selected)
      return selected
    })
  }

  return (
    <div style={{ padding: '10px', fontSize: '13px', lineHeight: 1.5 }}>
      <div style={{ marginBottom: '10px' }}>
        {/* 1. Select log types */}
        <div style={{ fontWeight: 600 }}>
          1. Select the log types you want to export or copy:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 12px' }}>
          <label
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={(event) => toggleAll(event.target.checked)}
            />
            All
          </label>
          {LOG_TYPE_OPTIONS.map((item) => (
            <label
              key={item.value}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <input
                type="checkbox"
                checked={selectedTypes.includes(item.value)}
                onChange={(event) =>
                  toggleType(item.value, event.target.checked)
                }
              />
              {item.label}
            </label>
          ))}
        </div>
      </div>
      {/* 2. Log preview */}
      <div>
        <div style={{ fontWeight: 600 }}> 2. Log preview:</div>
        <div
          style={{
            maxHeight: '180px',
            overflowY: 'auto',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '8px',
            backgroundColor: '#fafafa',
            fontFamily: 'Menlo, Monaco, Consolas, monospace',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {displayText.length > 0
            ? displayText
            : 'No logs available for current selection.'}
        </div>
      </div>
    </div>
  )
})
