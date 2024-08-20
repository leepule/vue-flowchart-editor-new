# DetailPanel

属性栏

## 使用说明

属性栏会自动根据不同页面状态显示对应面板，例如：选中节点时则只会显示 `NodePanel`。

```html
<template>
  <vue-flowchart-editor>
    <flow />
    <detail-panel>
      <node-panel> // 节点属性面板 something else </node-panel>
      <edge-panel /> // 边线属性面板 
      <group-panel /> // 群组属性面板
      <multi-panel /> // 多选属性面板 
      <canvas-panel /> // 画布属性面板
    </detail-panel>
  </vue-flowchart-editor>
</template>
<script>
  import VueFlowchartEditor, {
    Flow,
    DetailPanel,
    NodePanel,
    EdgePanel,
    GroupPanel,
    MultiPanel,
    CanvasPanel,
  } from 'vue-flowchart-editor'
  export default {
    components: {
      VueFlowchartEditor,
      Flow,
      DetailPanel,
      NodePanel,
      EdgePanel,
      GroupPanel,
      MultiPanel,
      CanvasPanel,
    },
  }
</script>
```
