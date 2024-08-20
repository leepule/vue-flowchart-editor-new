<template>
  <vue-flowchart-editor class="vue-flowchart-editor" ref="flowChart">
    <div class="vfe-chart">
      <!-- Top Menu -->
      <div class="vfe-chart-header">
        <editor-toolbar :chart-data="flowChartData" :read-only="readOnly" />
      </div>
      <div class="vfe-chart-container">
        <!-- Left Items -->
        <div class="vfe-chart-sidebar">
          <editor-item-panel :node-items="flowChartNodeItems" v-if="!readOnly" />
        </div>
        <!-- Main Chart -->
        <div class="vfe-chart-main">
          <flow :data="flowChartData" :onClick="handleClick" :onNodeClick="handleNodeClick" :onNodeDoubleClick="handleNodeDoubleClick" :onNodeMouseLeave="handleNodeMouseLeave" :onAfterChange="handleAfterChange" :graph="graphConfig" />
          <div class="tooltip">
            <p v-for="item in tooltipData" :key="item.name">{{ item.name }}: {{ item.value }}</p>
          </div>
        </div>
        <!-- Right Panel -->
        <div class="vfe-chart-panel">
          <div class="vfe-chart-panel-detail">
            <editor-detail-panel :read-only="readOnly" />
          </div>
          <div class="vfe-chart-panel-minimap">
            <!-- <editor-minimap /> -->
          </div>
        </div>
      </div>
    </div>
    <!-- Mouse Right Button Context Menu -->
    <editor-context-menu v-if="!readOnly" />
    <register-edge name="custom-polyline" extend="flow-polyline" :config="customEdgeConfig" />
    <custom-command :save="saveChartData" :download="downloadImage" />
  </vue-flowchart-editor>
</template>

<script>
import VueFlowchartEditor, { Flow, RegisterEdge } from '../index'
import EditorToolbar from './components/Toolbar'
import EditorItemPanel from './components/ItemPanel'
import EditorDetailPanel from './components/DetailPanel'
// import EditorMinimap from './components/EditorMinimap'
import EditorContextMenu from './components/ContextMenu'
import CustomCommand from './components/CustomCommand'
import { throttle } from 'lodash'

export default {
  name: 'FlowchartEditor',

  components: {
    VueFlowchartEditor,
    Flow,
    EditorToolbar,
    EditorItemPanel,
    EditorDetailPanel,
    // EditorMinimap,
    EditorContextMenu,
    CustomCommand,
    RegisterEdge,
  },

  props: [
    'readOnly',
    'toggleReadOnly',
    'chartData',
    'chartDataNodeItems',
    'saveData',
  ],

  data() {
    return {
      flowChartData: this.chartData,
      flowChartNodeItems: this.chartDataNodeItems,
      graphConfig: {
        mode: 'readOnly',
        edgeDefaultShape: 'flow-polyline'
      },
      customEdgeConfig: {
        getActivedStyle(/*item*/) {
          return {
            lineWidth: 3,
          }
        },
        getSelectedStyle(/*item*/) {
          return {
            lineWidth: 3,
          }
        },
      },
      tooltipDom: null,
      tooltipShow: true,
      tooltipData: [],
    }
  },

  mounted() {
    this.tooltipDom = document.getElementsByClassName('tooltip')[0]
  },

  methods: {
    handleClick(e) {
      console.log(e)
      if (this.readOnly && !e.item) {
        this.tooltipDom.style.display = 'none'
      }
    },

    handleNodeClick(e) {
      console.log(e)
    },

    handleNodeDoubleClick(e) {
      console.log(e.item.model.data)
      if (this.readOnly) {
        this.tooltipData = e.item.model.data
        this.$nextTick(() => {
          this.tooltipDom.style.left = e.domX + 'px'
          this.tooltipDom.style.top = e.domY + 'px'
          this.tooltipDom.style.display = 'block'
        })
      }
    },

    handleNodeMouseLeave: throttle(
      function () {
        // if (this.readOnly) {
        //   console.log(e)
        //   this.tooltipDom.style.display = 'none'
        // }
      },
      1000,
      {
        leading: false,
        trailing: true,
      }
    ),

    handleAfterChange(e) {
      if (!this.readOnly) {
        const { action, item } = e
        console.log(action)
        if (item && item.getModel) {
          const model = item.getModel()
          console.log(model)
        }
        // 可以根据 action 和 model 来决定是否删掉左侧用过的节点
      }
    },

    saveChartData(data) {
      const page = this.$refs['flowChart'].propsAPI
      data.edges = data?.edges?.map((edge) => {
        const cell = page.find(edge.id)
        const points = cell.getPoints()
        const label = cell.getLabel()
        if (label) {
          const bbox = label.getBBox()
          const labelCenterX = bbox.x + bbox.width / 2
          const labelCenterY = bbox.y + bbox.height / 2
        }
        return {
          ...edge,
          points
        }
      })
      console.log(this.updateNodeAndEdgeIds(data))
      this.$emit('save-data', data)
    },
    updateNodeAndEdgeIds(data) {
      const result = JSON.parse(JSON.stringify(data))
      const nodeIdMap = new Map()
      const edgeIdMap = new Map()
      // 更新节点 ID
      result.nodes.forEach(node => {
        const oldId = node.id
        const newId = this.generateCustomID(false, 10)
        if (!oldId.match(/^[A-Za-z]/) || oldId.length !== 10) {
          node.id = newId
          nodeIdMap.set(oldId, newId)
        } else {
          node.id = oldId
          nodeIdMap.set(oldId, oldId)
        }
      })
      // 更新边的 ID 和关联的节点 ID
      result.edges?.forEach(edge => {
        const oldId = edge.id
        const newId = this.generateCustomID(false, 10)
        if (!oldId.match(/^[A-Za-z]/) || oldId.length !== 10) {
          edge.id = newId
          edgeIdMap.set(oldId, newId)
        } else {
          edge.id = oldId
          edgeIdMap.set(oldId, oldId)
        }
        edge.source = nodeIdMap.get(edge.source)
        edge.target = nodeIdMap.get(edge.target)
      })
      console.log(nodeIdMap, edgeIdMap)
      return result
    },

    generateCustomID(randomFlag, min, max) {
      var str = ''
      var range = min - 1
      var arr = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
      ]
      const firstCharPos = Math.floor(Math.random() * 52)
      str += arr[firstCharPos]
      if (randomFlag) {
        range = Math.floor(Math.random() * (max - min)) + min - 1
      }
      for (var i = 0; i < range; i++) {
        const pos = Math.floor(Math.random() * arr.length)
        str += arr[pos]
      }
      return str
    },

    _downloadImage(data, filename = 'flowchart.png') {
      const a = document.createElement('a')
      a.href = data
      a.download = filename
      document.body.appendChild(a)
      a.click()
    },

    downloadImage() {
      const page = this.$refs['flowChart'].propsAPI.editor.getCurrentPage()
      this._downloadImage(page.saveImage().toDataURL('image/png'))
    },
    calculatePath(start, end) {
      class Node {
        constructor(x, y) {
          this.x = x
          this.y = y
          this.g = Infinity // 从起点到当前节点的实际成本
          this.h = 0 // 从当前节点到终点的估计成本
          this.f = Infinity // 总成本
          this.parent = null
        }

        setCosts(g, h) {
          this.g = g
          this.h = h
          this.f = g + h
        }

        setParent(parent) {
          this.parent = parent
        }
      }
      console.log(start, end)
      // 创建起点和终点节点
      const startNode = new Node(start[0], start[1]);
      const endNode = new Node(end[0], end[1]);

      // 定义成本函数
      function heuristic(node) {
        return Math.sqrt(Math.pow(node.x - endNode.x, 2) + Math.pow(node.y - endNode.y, 2));
      }

      function getNeighbors(node) {
        // 根据实际情况定义邻居节点
        // 这里仅作为示例，实际应用中需要根据具体场景定义
        const neighbors = [
          new Node(node.x + 1, node.y),
          new Node(node.x - 1, node.y),
          new Node(node.x, node.y + 1),
          new Node(node.x, node.y - 1)
        ];
        return neighbors.filter(n => n.x >= 0 && n.y >= 0); // 简单过滤
      }

      // A* 算法实现
      function aStar(start, end) {
        const openList = [start];
        const closedList = [];

        while (openList.length > 0) {
          // 找到当前 f 值最小的节点
          let currentNode = openList.reduce((minNode, current) => current.f < minNode.f ? current : minNode, openList[0]);

          // 如果当前节点是终点，重建路径
          if (currentNode === end) {
            const path = [];
            let temp = currentNode;
            while (temp !== null) {
              path.push([temp.x, temp.y]);
              temp = temp.parent;
            }
            return path.reverse();
          }

          // 将当前节点从 openList 移除并加入 closedList
          openList.splice(openList.indexOf(currentNode), 1);
          closedList.push(currentNode);

          // 获取当前节点的所有邻居
          const neighbors = getNeighbors(currentNode);
          for (const neighbor of neighbors) {
            if (closedList.includes(neighbor)) continue; // 忽略已关闭的节点

            const newG = currentNode.g + 1; // 假设每一步的成本为 1
            let isNewPath = false;

            if (!openList.includes(neighbor)) {
              openList.push(neighbor);
              isNewPath = true;
            } else if (newG < neighbor.g) {
              isNewPath = true;
            }

            if (isNewPath) {
              neighbor.setParent(currentNode);
              neighbor.setCosts(newG, heuristic(neighbor));
            }
          }
        }

        return null; // 没有找到路径
      }

      // 使用 A* 算法计算路径
      return aStar(startNode, endNode);
    },
  },
}
</script>

<style lang="less">
.vue-flowchart-editor {
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #fff;
}

.vfe-chart {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .vfe-chart-header {
    border: 1px solid #e6e9ed;
    padding: 8px;
  }

  .vfe-chart-container {
    flex: 1;
    display: flex;

    .vfe-chart-main {
      position: relative;
      flex: 1;
      max-height: ~'calc(100% - 5px)'; // fix scroll show

      .tooltip {
        position: absolute;
        display: none;
        top: 0;
        left: 0;
        width: 100px;
        height: auto;
        padding: 15px;
        border-radius: 10px;
        z-index: 999;
        opacity: 0.8;
        color: #ffffff;
        font-size: 12px;
        background-color: #000;

        p {
          margin: 0;
        }
      }
    }

    .vfe-chart-sidebar {
      position: relative;
      display: flex;
      justify-content: center;
      width: 150px;
      padding-top: 10px;
      background-color: #fafafa;
      border-right: 1px solid #e6e9ed;
    }

    .vfe-chart-panel {
      position: relative;
      width: 300px;
      border-left: 1px solid #e6e9ed;

      .vfe-chart-panel-detail {
        box-sizing: border-box;
        position: fixed;
        top: 45px;
        width: 300px;
        padding: 10px;
        height: ~'calc(100%)';
        overflow-y: auto;
      }

      .vfe-chart-panel-minimap {
        position: fixed;
        bottom: 0;
        width: 300px;
        height: 200px;
        border-top: 1px solid #e6e9ed;
        display: none;
      }
    }
  }
}
</style>
