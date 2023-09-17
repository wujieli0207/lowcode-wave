import { ZoomIn, ArrowLeft, ArrowRight, Delete } from '@element-plus/icons-vue'
import {
  handleDelete,
  handleInsertBefore,
  handleInsertAfter,
  handleViewJson,
  handleMoveUp,
  handleMoveDown
} from './utils'
import { IFieldConfig, IPageConfig } from '#/editor'

interface IDefaultAction {
  name: string
  click: (element: IFieldConfig, pageChildren: IPageConfig['children']) => void
  icon: any
}
export const defaultActions: IDefaultAction[] = [
  {
    name: '查看节点',
    click: (element: IFieldConfig) => {
      handleViewJson(element)
    },
    icon: ZoomIn
  },
  {
    name: '向前插入节点',
    click: (element: IFieldConfig) => {
      handleInsertBefore(element)
    },
    icon: ArrowLeft
  },
  {
    name: '向后插入节点',
    click: (element: IFieldConfig) => {
      handleInsertAfter(element)
    },
    icon: ArrowRight
  },
  {
    name: '删除节点',
    click: (element: IFieldConfig) => {
      handleDelete(element)
    },
    icon: Delete
  }
]

interface IMoreAction {
  name: string
  click: (element: IFieldConfig, pageChildren: IPageConfig['children']) => void
  disabled?: ((element: IFieldConfig, pageChildren: IPageConfig['children']) => boolean) | boolean
  divided?: boolean
  highlight?: boolean // 红色高亮
}
export const moreActions: IMoreAction[] = [
  {
    name: '上移节点',
    click: (element: IFieldConfig, pageChildren: IPageConfig['children']) => {
      handleMoveUp(element, pageChildren)
    },
    disabled: (element: IFieldConfig, pageChildren: IPageConfig['children']) => {
      const currentIndex = pageChildren.findIndex((item) => item._id === element._id)
      return currentIndex === 0
    }
  },
  {
    name: '下移节点',
    click: (element: IFieldConfig, pageChildren: IPageConfig['children']) => {
      handleMoveDown(element, pageChildren)
    },
    disabled: (element: IFieldConfig, pageChildren: IPageConfig['children']) => {
      const currentIndex = pageChildren.findIndex((item) => item._id === element._id)
      return currentIndex === pageChildren.length - 1
    }
  },
  {
    name: '向前复制一份',
    click: (element: IFieldConfig) => {
      handleInsertBefore(element)
    },
    divided: true
  },
  {
    name: '向后复制一份',
    click: (element: IFieldConfig) => {
      handleInsertAfter(element)
    }
  },
  {
    name: '删除',
    click: (element: IFieldConfig) => {
      handleDelete(element)
    },
    highlight: true
  }
]
