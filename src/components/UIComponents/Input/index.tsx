import { IUIComponent } from '#/components'
import { UI_KV, UI_VL, UI_TAG_KV } from '@/constant/componentConstant'

const input: IUIComponent = {
  label: UI_VL[UI_KV.INPUT],
  type: UI_KV.INPUT,
  isBasic: true,
  tags: [UI_TAG_KV.FORM],
  preview: () => <el-input placeholder="请输入" />,
  render: () => {
    return <el-input>输入框</el-input>
  }
}

export default input
