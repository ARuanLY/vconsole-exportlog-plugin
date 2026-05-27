type LogCell = {
  origData: unknown
}

export type LogType = 'log' | 'info' | 'warn' | 'error'

export type LogItem = {
  date: number
  data: LogCell[]
  type: LogType
}

export type VConsoleDefaultPluginCtx = {
  pluginList: {
    default: {
      compInstance: {
        $$: {
          ctx: unknown[]
        }
      }
    }
  }
  addPlugin: (plugin: unknown) => void
  $: unknown
}
