import { IUIComponent } from '#/components'

import { UI_KV, UI_VL, UI_TAG_KV } from '@/constant/componentConstant'
import { IButtonPropsConfig, createProps } from './createProps'

export default {
  label: UI_VL[UI_KV.BUTTON],
  type: UI_KV.BUTTON,
  isBasic: true,
  tags: [UI_TAG_KV.BASE],
  preview: () => <el-button>提交</el-button>,
  render: (params) => {
    const { props } = params
    return <el-button {...props}>{(props as IButtonPropsConfig).buttonText || '按钮'}</el-button>
  },
  props: createProps()
} as IUIComponent
