import { OP_TYPE_KV } from '@/constant/eventConstant'

interface IOperationGroup {
  groupName: string // 操作分组
  operationList: Ioperation[]
}

export interface Ioperation {
  opType: ValueOf<typeof OP_TYPE_KV> // 操作类型
  args: IoperationArgs // 操作参数
  ignoreError?: boolean // 是否忽略错误
  isFocus: boolean // 是否被选中
}

interface IoperationArgs {
  desc: string // 参数描述
  [key: string]: unknown
}

export const operationConfig: IOperationGroup[] = [
  {
    groupName: '页面操作',
    operationList: [
      {
        opType: OP_TYPE_KV.REDIRECT,
        args: {
          desc: '跳转到制定链接页面'
        },
        isFocus: false
      },
      {
        opType: OP_TYPE_KV.OPEN,
        args: {
          desc: '打开指定页面'
        },
        isFocus: false
      },
      {
        opType: OP_TYPE_KV.REFRESH_PAGE,
        args: {
          desc: '刷新当前页面'
        },
        isFocus: false
      }
    ]
  },
  {
    groupName: '组件操作',
    operationList: [
      {
        opType: OP_TYPE_KV.VISIBLE,
        args: {
          desc: '控制所选组件显示/隐藏'
        },
        isFocus: false
      },
      {
        opType: OP_TYPE_KV.USABLE,
        args: {
          desc: '控制所选组件启用/禁用'
        },
        isFocus: false
      },
      {
        opType: OP_TYPE_KV.REQUIRED,
        args: {
          desc: '控制所选组件必填/非必填'
        },
        isFocus: false
      },
      {
        opType: OP_TYPE_KV.REFRESH_DATA,
        args: {
          desc: '如果所选组件通过远程获取数据，先发送配置到目标组件，再重新请求数据'
        },
        isFocus: false
      },
      {
        opType: OP_TYPE_KV.CLEAR,
        args: {
          desc: '清空所选组件数据'
        },
        isFocus: false
      },
      {
        opType: OP_TYPE_KV.SET_VALUE,
        args: {
          desc: '更新目标组件值或者变量数据值'
        },
        isFocus: false
      }
    ]
  }
]
