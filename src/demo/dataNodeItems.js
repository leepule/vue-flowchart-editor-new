export default [
  {
    shape: 'flow-circle',
    size: '72*72',
    model: {
      label: '开始',
      color: '#FA8C16', // 橙色
      type: 'start',
      data: {
        name: '',
        document: '',
        formKey: '',
        listenerType: ''
      }
    }
  },
  {
    shape: 'flow-rect',
    size: '80*48',
    model: {
      label: '节点',
      color: '#1890FF', // 蓝色
      type: 'node'
    },
  },
  {
    shape: 'flow-rhombus',
    size: '80*48',
    model: {
      label: '条件',
      color: '#13C2C2', // 青色
      type: 'condition'
    },
  },
  {
    shape: 'flow-circle',
    size: '72*72',
    model: {
      label: '结束',
      color: '#E65100', // 深橙色
      type: 'end'
    },
  }
];