English | [简体中文](./README_CN.md)

# vconsole-exportlog-plugin

A [vConsole](https://github.com/Tencent/vConsole) plugin for copying logs and exporting logs to a file.

Support vConsole v3.15.1.

---

## Similar Plugin Comparison

| Plugin                                                                                         | Supports the latest vConsole v3.15.1 | TypeScript |
| ---------------------------------------------------------------------------------------------- | ------------------------------------ | ---------- |
| This plugin                                                                                    | ✅                                   | ✅         |
| [@liuxb001/vconsole-outputlog-plugin](https://github.com/liuxb-tofu/vconsole-outputlog-plugin) | ✅                                   | ❌         |
| [vconsole-outputlog-plugin](https://github.com/sunlanda/vconsole-outputlog-plugin)             | ❌                                   | ❌         |

## Features

- Copy logs to the clipboard
- Export logs as a local file
- Filter logs by type before copying or exporting

## Prerequisite

This plugin requires `vconsole` provided by your app (peer dependency). Setup vConsole first. Reference: [vconsole](https://www.npmjs.com/package/vconsole)

## Use This Plugin

### With npm/bundler

Install this plugin:

```bash
npm i vconsole-exportlog-plugin
```

```ts
import VConsole from 'vconsole'
import VConsoleExportLogsPlugin from 'vconsole-exportlog-plugin'

const vConsole = new VConsole()
new VConsoleExportLogsPlugin(vConsole)
```

### With CDN/UMD

```html
<script src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"></script>
<script src="https://unpkg.com/vconsole-exportlog-plugin/dist/vconsole-exportlog-plugin.min.js"></script>
<script>
  var vConsole = new window.VConsole()
  new window.VConsoleExportLogsPlugin(vConsole)
</script>
```

## Screenshot

> Copy logs and export logs to a file
> ![Plugin screenshot](./screenshots/use_plugin.png)

## Acknowledgements

This project was inspired by the following repositories:

- [vconsole-outputlog-plugin](https://github.com/sunlanda/vconsole-outputlog-plugin)
- [@liuxb001/vconsole-outputlog-plugin](https://github.com/liuxb-tofu/vconsole-outputlog-plugin)
