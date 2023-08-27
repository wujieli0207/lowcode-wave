import { IUIComponent } from '#/components'
import { UI_KV, UI_VL, UI_TAG_KV } from '@/constant/componentConstant'

const button: IUIComponent = {
  label: UI_VL[UI_KV.BUTTON],
  type: UI_KV.BUTTON,
  isBasic: true,
  tags: [UI_TAG_KV.BASE],
  preview: () => <el-button>提交</el-button>,
  render: () => {
    return <el-button>按钮</el-button>
  }
}

export default button
