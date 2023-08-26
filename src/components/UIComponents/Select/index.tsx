import { IUIComponent } from '#/components'
import { UI_KV, UI_VL, UI_TAG_KV } from '@/constant/componentConstant'

const input: IUIComponent = {
  key: UI_KV.SELECT,
  label: UI_VL[UI_KV.SELECT],
  isBasic: true,
  tags: [UI_TAG_KV.FORM],
  preview: () => <el-select placeholder="请选择"></el-select>,
  render: () => {
    return () => <el-select>下拉选择</el-select>
  }
}

export default input
