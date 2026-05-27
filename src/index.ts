import VConsole from 'vconsole'
import copy from 'copy-to-clipboard'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ExportLogPage } from './components/export_log_page'
import { download } from './util/file'
import { buildLogTextForTypes } from './util/log'
import type {
  VConsoleDefaultPluginCtx,
  LogItem,
  LogType,
} from './types/vconsole'

class VConsoleExportLogsPlugin {
  private vConsole: VConsoleDefaultPluginCtx
  private selectedTypes: LogType[] = ['log', 'info', 'warn', 'error']
  private componentRef: {
    current: { updateSelectedTypesLogText: () => void } | null
  } = {
    current: null,
  }

  constructor(vConsole: VConsole) {
    this.vConsole = vConsole as unknown as VConsoleDefaultPluginCtx
    return this.init() as unknown as VConsoleExportLogsPlugin
  }

  private init() {
    const vConsoleExportLogs = new VConsole.VConsolePlugin(
      'ExportLog',
      'ExportLog',
    )

    vConsoleExportLogs.on('renderTab', (callback: (html: string) => void) => {
      const containerId = 'vconsole-exportlog-root'
      const html = `<div id="${containerId}"></div>`
      callback(html)
      const container = document.getElementById(containerId)
      if (container) {
        const root = createRoot(container)
        root.render(
          createElement(ExportLogPage, {
            ref: this.componentRef,
            getSelectedTypesLogText: () => this.getSelectedTypesLogText(),
            onTypesChange: (types: LogType[]) => {
              this.selectedTypes = types
            },
          }),
        )
      }
    })

    vConsoleExportLogs.on(
      'addTool',
      (
        callback: (tools: Array<{ name: string; onClick: () => void }>) => void,
      ) => {
        const buttons = [
          {
            name: 'ExportLogs',
            onClick: this.export,
          },
          {
            name: 'CopyLogs',
            onClick: this.copyText,
          },
        ]
        callback(buttons)
      },
    )

    vConsoleExportLogs.on('show', () => {
      this.componentRef.current?.updateSelectedTypesLogText()
    })

    this.vConsole.addPlugin(vConsoleExportLogs)
    return vConsoleExportLogs
  }

  private getSelectedTypesLogText = (): string => {
    const ctxArr = this.vConsole.pluginList.default.compInstance.$$.ctx
    const logList = (ctxArr.filter((item) => item instanceof Array)[0] ??
      []) as LogItem[]
    return buildLogTextForTypes(logList, this.selectedTypes)
  }

  private export = (): void => {
    const content = this.getSelectedTypesLogText()
    const localeDateString = new Date().toLocaleString()
    const filename = `${localeDateString}.log`
    download(content, filename)
  }

  private copyText = (): void => {
    const content = this.getSelectedTypesLogText()
    copy(content)
  }
}

export default VConsoleExportLogsPlugin
