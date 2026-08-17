English | [简体中文](./README_CN.md)

# vconsole-exportlog-plugin

A [vConsole](https://github.com/Tencent/vConsole) plugin for copying logs and exporting logs to a file.

Support vConsole v3.15.1.

---

## Features

- Copy logs to the clipboard
- Export logs as a local file
- Filter logs by type before copying or exporting

## Installation

```bash
npm i vconsole-exportlog-plugin
```

## Usage

```ts
import VConsole from 'vconsole'
import VConsoleExportLogsPlugin from 'vconsole-exportlog-plugin'

const vConsole = new VConsole()
new VConsoleExportLogsPlugin(vConsole)
```

## Screenshot

> Copy logs and export logs to a file
> ![Plugin screenshot](./screenshots/use_plugin.png)

## Acknowledgements

This project was inspired by the following repositories:

- [vconsole-outputlog-plugin](https://github.com/sunlanda/vconsole-outputlog-plugin)
- [@liuxb001/vconsole-outputlog-plugin](https://github.com/liuxb-tofu/vconsole-outputlog-plugin)
