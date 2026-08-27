[English](./README.md) | 简体中文

# vconsole-exportlog-plugin

一个用于 [vConsole](https://github.com/Tencent/vConsole) 的插件，支持复制日志以及将日志导出为文件。

支持 vConsole v3.15.1。

---

## 类似插件对比

| 插件                                                                                           | 支持 vConsole 最新版本 v3.15.1 | TypeScript |
| ---------------------------------------------------------------------------------------------- | ------------------------------ | ---------- |
| 本插件                                                                                         | ✅                             | ✅         |
| [@liuxb001/vconsole-outputlog-plugin](https://github.com/liuxb-tofu/vconsole-outputlog-plugin) | ✅                             | ❌         |
| [vconsole-outputlog-plugin](https://github.com/sunlanda/vconsole-outputlog-plugin)             | ❌                             | ❌         |

## 功能特性

- 将日志复制到剪贴板
- 将日志导出为本地文件
- 在复制或导出前按日志类型进行筛选

## 前置条件

本插件要求由宿主应用提供 `vconsole`（peer dependency）。先集成 vConsole，参考： [vconsole](https://www.npmjs.com/package/vconsole)。

## 使用本插件

### 在 npm/打包器项目中使用

安装本插件:

```bash
npm i vconsole-exportlog-plugin
```

```ts
import VConsole from 'vconsole'
import VConsoleExportLogsPlugin from 'vconsole-exportlog-plugin'

const vConsole = new VConsole()
new VConsoleExportLogsPlugin(vConsole)
```

### 在 CDN/UMD 场景中使用

```html
<script src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"></script>
<script src="https://unpkg.com/vconsole-exportlog-plugin/dist/vconsole-exportlog-plugin.min.js"></script>
<script>
  var vConsole = new window.VConsole()
  new window.VConsoleExportLogsPlugin(vConsole)
</script>
```

## 截图

> 复制日志并导出日志文件
> ![插件截图](./screenshots/use_plugin.png)

## 致谢

本项目在早期开发过程中参考了以下仓库，在此表示感谢：

- [vconsole-outputlog-plugin](https://github.com/sunlanda/vconsole-outputlog-plugin)
- [@liuxb001/vconsole-outputlog-plugin](https://github.com/liuxb-tofu/vconsole-outputlog-plugin)
