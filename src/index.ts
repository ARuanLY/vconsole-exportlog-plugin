import VConsole from 'vconsole'
import copy from 'copy-to-clipboard'
import { renderExportLogPage } from './components/export_log_page'
import { download } from './util/file'
import type {
  VConsoleDefaultPluginCtx,
  LogItem,
  LogType,
} from './types/vconsole'

class VConsoleExportLogsPlugin {
  private vConsole: VConsoleDefaultPluginCtx
  private container: HTMLElement | null = null
  private logList: LogItem[] = []
  private selectedTypes: LogType[] = ['log', 'info', 'warn', 'error']
  private selectedTypesLogContent: string = ''

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
        this.container = container
        this.renderExportLogPage()
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
      this.updateLogList()
    })

    vConsoleExportLogs.on('showConsole', () => {
      this.updateLogList()
    })

    this.vConsole.addPlugin(vConsoleExportLogs)
    return vConsoleExportLogs
  }

  private renderExportLogPage = (): void => {
    if (!this.container) {
      return
    }

    renderExportLogPage({
      container: this.container,
      logList: this.logList,
      selectedTypes: this.selectedTypes,
      onSelectedTypesChange: (types: LogType[]) => {
        this.selectedTypes = types
        this.renderExportLogPage()
      },
      onSelectedTypesLogContentChange: (content: string) => {
        this.selectedTypesLogContent = content
      },
    })
  }

  private updateLogList = (): void => {
    const ctxArr = this.vConsole.pluginList.default.compInstance.$$.ctx
    const logList = (ctxArr.filter((item) => item instanceof Array)[0] ??
      []) as LogItem[]
    this.logList = logList
    this.renderExportLogPage()
  }

  private export = (): void => {
    const content = this.selectedTypesLogContent
    const localeDateString = new Date().toLocaleString()
    const filename = `${localeDateString}.log`
    download(content, filename)
  }

  private copyText = (): void => {
    const content = this.selectedTypesLogContent
    copy(content)
  }
}

export default VConsoleExportLogsPlugin
