import { IUIComponent } from '#/components'
import { EVENT_KV } from '@/constant/eventConstant'
import { UI_KV, UI_VL, UI_TAG_KV } from '@/constant/componentConstant'
import { IButtonPropsConfig, createProps } from './createProps'

export default {
  label: UI_VL[UI_KV.BUTTON],
  type: UI_KV.BUTTON,
  isBasic: true,
  tags: [UI_TAG_KV.BASE],
  preview: () => <el-button>提交</el-button>,
  render: ({ props, styles }) => {
    return (
      <div style={styles}>
        <el-button {...props}>{(props as IButtonPropsConfig).buttonText || '按钮'}</el-button>
      </div>
    )
  },
  props: createProps(),
  events: [
    {
      type: EVENT_KV.CLICK
    },
    {
      type: EVENT_KV.CHANGE
    }
  ]
} as IUIComponent
