# Command

内置命令

## 使用说明

此组件只能嵌套在 [Toolbar](toolbar.md) 或 [ContextMenu](contextMenu.md) 组件内使用：

```html
<template>
  <vue-flowchart-editor>
    <flow />
    <toolbar>
      <command name="undo">撤销</command>
      <command name="redo">重做</command>
    </toolbar>
    <context-menu>
      <command name="undo">撤销</command>
      <command name="redo">重做</command>
    </context-menu>
  </vue-flowchart-editor>
</template>
<script>
  import VueFlowchartEditor, {
    Flow,
    Command,
    Toolbar,
    ContextMenu,
  } from 'vue-flowchart-editor'
  export default {
    components: {
      VueFlowchartEditor,
      Flow,
      Command,
      Toolbar,
      ContextMenu,
    },
  }
</script>
```

## API

| 属性 | 说明     | 类型     | 默认值 |
| :--- | :------- | :------- | :----- |
| name | 命令名称 | `string` | -      |

## 内置命令

| 命令英文名     | 命令中文名   | 快捷键（Mac） | 快捷键（Win）      | 适用页面 |
| :------------- | :----------- | :------------ | :----------------- | :------- |
| clear          | 清空画布     | -             | -                  | All      |
| selectAll      | 全选         | `⌘A`          | `Ctrl+A`           | All      |
| undo           | 撤销         | `⌘Z`          | `Ctrl + Z`         | All      |
| redo           | 重做         | `⇧⌘Z`         | `Shift + Ctrl + Z` | All      |
| delete         | 删除         | `Delete`      | `Delete`           | All      |
| zoomIn         | 放大         | `⌘=`          | `Ctrl + =`         | All      |
| zoomOut        | 缩小         | `⌘-`          | `Ctrl + -`         | All      |
| autoZoom       | 自适应尺寸   | -             | -                  | All      |
| resetZoom      | 实际尺寸     | `⌘0`          | `Ctrl + 0`         | All      |
| toFront        | 提升层级     | -             | -                  | All      |
| toBack         | 下降层级     | -             | -                  | All      |
| copy           | 复制         | `⌘C`          | `Ctrl + C`         | Flow     |
| paste          | 粘贴         | `⌘V`          | `Ctrl + V`         | Flow     |
| multiSelect    | 多选模式     | -             | -                  | Flow     |
| addGroup       | 成组         | `⌘G`          | `Ctrl + G`         | Flow     |
| unGroup        | 取消组       | `⇧⌘G`         | `Shift + Ctrl + G` | Flow     |
| append         | 添加相邻节点 | `Enter`       | `Enter`            | Mind     |
| appendChild    | 添加子节点   | `Tab`         | `Tab`              | Mind     |
| collaspeExpand | 折叠/展开    | `⌘/`          | `Ctrl + /`         | Mind     |
