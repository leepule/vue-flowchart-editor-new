export const formOptions = [
  {
    label: '常规信息',
    key: 'general',
    nodeTypes: ['node', 'edge'],
    types: ['start', 'node', 'condition', 'parallel', 'end'],
    formItems: [
      {
        label: '节点名称',
        key: 'name',
        type: 'text',
        placeholder: '请输入节点名称',
        required: true
      },
      {
        label: '节点描述',
        key: 'document',
        type: 'textarea',
        placeholder: '请输入节点描述'
      }
    ]
  },
  {
    label: '表单配置',
    key: 'form',
    nodeTypes: ['node'],
    types: ['start', 'node'],
    formItems: [
      {
        label: '流程表单',
        key: 'formKey',
        type: 'select',
        placeholder: '请选择流程表单',
        required: false
      }
    ]
  },
  {
    label: '任务配置',
    key: 'task',
    nodeTypes: ['node'],
    types: ['node'],
    formItems: [
      {
        label: '异步',
        key: 'async',
        type: 'switch',
        activeText: '是',
        inactiveText: '否'
      },
      {
        label: '用户类型',
        key: 'userType',
        type: 'select',
        placeholder: '请选择用户类型',
        source: 'options',
        options: [
          {
            label: '指定人员',
            value: 'assignee'
          },
          {
            label: '候选人员',
            value: 'candidateUsers'
          },
          {
            label: '候选角色',
            value: 'candidateGroups'
          }
        ]
      },
      {
        label: '指定人员',
        key: 'assignee',
        type: 'ryselect',
        multiple: false,
        placeholder: '请选择指定人员'
      },
      {
        label: '候选人员',
        key: 'candidateUsers',
        type: 'ryselect',
        multiple: true,
        placeholder: '请选择候选人员'
      },
      {
        label: '候选角色',
        key: 'candidateGroups',
        type: 'ryselect',
        multiple: true,
        placeholder: '请选择候选角色'
      },
      {
        label: '优先级',
        key: 'priority',
        type: 'select',
        placeholder: '请选择优先级',
        source: 'options',
        options: [
          {
            label: '普通',
            value: 'normal'
          },
          {
            label: '紧急',
            value: 'urgent'
          }
        ]
      },
      {
        label: '到期时间',
        key: 'dueDate',
        type: 'datetime',
        placeholder: '请选择'
      }
    ]
  },
  {
    label: '执行监听器',
    key: 'executeListener',
    nodeTypes: ['node', 'edge'],
    types: ['start', 'node', 'condition', 'parallel', 'end'],
  },
  {
    label: '任务监听器',
    key: 'taskListener',
    nodeTypes: ['node'],
    types: ['node'],
  }
]
