<template>
  <div>
    <el-form :model="formModel" readonly label-width="80px">
      <div v-if="type === 'canvas'">
        <h2 class="canvas-title">流程</h2>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="常规信息" :name="0">
            <el-form-item label="流程标识">
              <el-input v-model="formModel.key"></el-input>
            </el-form-item>
            <el-form-item label="流程名称">
              <el-input v-model="formModel.name"></el-input>
            </el-form-item>
            <el-form-item label="流程分类">
              <el-select v-model="formModel.type" placeholder="请选择流程分类">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="节点描述">
              <el-input v-model="formModel.document" type="textarea"></el-input>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="执行监听器" :name="1">
            执行监听器
          </el-collapse-item>
        </el-collapse>
      </div>
      <template v-else>
        <h2 class="canvas-title">节点</h2>
        <el-collapse v-model="activeNames">
          <template v-for="(item, index) in formOptions">
            <el-collapse-item :key="item.key" :title="item.label" :name="index" v-if="item.nodeTypes.includes(type) && item.types.includes(formModel.type)">
              <el-form-item v-for="formItem in item.formItems" :key="formItem.key" :prop="formItem.key" :label="formItem.label" :rules="[
                { required: formItem.required || false, message: `${formItem.label}不能为空`, trigger: 'blur' }
              ]" class="canvas-form-item">
                <el-input v-if="formItem.type === 'text'" v-model="formModel[formItem.key]" :placeholder="formItem.placeholder"></el-input>
                <el-input v-if="formItem.type === 'textarea'" type="textarea" v-model="formModel[formItem.key]" :placeholder="formItem.placeholder"></el-input>
                <el-select v-if="formItem.type === 'select'" v-model="formModel[formItem.key]" :placeholder="formItem.placeholder">
                  <template v-if="formItem.source === 'options'">
                    <el-option
                      v-for="item in formItem.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </template>
                </el-select>
                <el-switch v-if="formItem.type === 'switch'" v-model="formModel[formItem.key]" :active-text="formItem.activeText" :inactive-text="formItem.inactiveText">
                </el-switch>
                <el-date-picker v-if="formItem.type === 'datetime'" v-model="formModel[formItem.key]" type="datetime"
                  :placeholder="formItem.placeholder">
                </el-date-picker>
              </el-form-item>
            </el-collapse-item>
          </template>
        </el-collapse>
      </template>
    </el-form>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import {formOptions} from '../formOptions'
export default {
  name: 'EditorDetailForm',
  inject: ['root'],
  props: ['type', 'readOnly'],
  data() {
    return {
      activeNames: [0],
      canvasForm: {
        type: '',
        key: '',
        name: '',
        document: ''
      },
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }
      ],
      formOptions,
      formModel: {},
      maxNodeWidth: 200,
      defaultNodeWidth: 80,
      defaultNodeHeight: 48,
      fontSize: 12
    }
  },
  created() {
    if (this.type !== 'canvas') {
      const formModel = this.root.propsAPI.getSelected()[0].getModel()
      this.formModel = Object.assign(
        {},
        { shape: 'flow-polyline' },
        cloneDeep(formModel) // 防止误编辑
      )
    } else {
      const formModel = {
        ...this.canvasForm,
        key: this.root.propsAPI.editor.id,
        name: this.root.propsAPI.editor.id,
      }
      this.formModel = Object.assign(
        {},
        cloneDeep(formModel)
      )
    }
  },
  methods: {
    handleSubmit() {
      const { getSelected, executeCommand, update } = this.root.propsAPI
      const { formModel } = this
      setTimeout(() => {
        const item = getSelected()[0]
        if (!item) return

        // 自动调整尺寸
        const adjustSize = (model) => {
          if (model.type !== 'node' || model.shape !== 'flow-rect') {
            return model
          }
          const canvas = document.createElement('canvas')
          const canvasContext = canvas.getContext('2d')
          canvasContext.font = this.fontSize + 'px System'
          const maxWidth = this.maxNodeWidth
          let label = model.label.replace('\n', '')
          let sourceWidth = this.defaultNodeWidth
          let sourceHeight = this.defaultNodeHeight
          const spacing = 10
          const widthWithSpacing =
            canvasContext.measureText(label).width + spacing
          model.size = `${sourceWidth}*${sourceHeight}` // 先恢复默认尺寸

          if (widthWithSpacing <= sourceWidth || sourceWidth >= maxWidth) {
            return model
          }

          // 自动撑宽
          if (widthWithSpacing <= maxWidth) {
            return {
              ...model,
              size: `${widthWithSpacing}*${sourceHeight}`,
            }
          }

          // 自动折行
          let multilineText = ''
          let multilineCount = 1
          let multilineTextWidth = 0

          for (const char of label) {
            const { width } = canvasContext.measureText(char)

            if (multilineTextWidth + width + spacing >= maxWidth) {
              multilineText += '\n'
              multilineTextWidth = 0
              multilineCount++
            }

            multilineText += char
            multilineTextWidth += width
          }

          return {
            ...model,
            label: multilineText,
            size: `${maxWidth}*${Math.max(
              sourceHeight,
              this.fontSize * multilineCount * 1.2 + spacing
            )}`,
          }
        }

        const newFormModel = adjustSize(formModel)

        console.log(newFormModel)

        executeCommand(() => {
          update(item, newFormModel)
        })
      }, 0)
    },
  },
}
</script>

<style lang="less">
hr {
  height: 0;
  border: 0;
  border-top: 1px dashed #ccc;
}
.canvas-title{
  font-size: 16px;
  padding: 0;
  margin: 10px 0;
  font-weight: normal;
}
.canvas-form-item{
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: auto;
  }
}
</style>
