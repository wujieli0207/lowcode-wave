import { IUIComponent } from '#/components'
import { UI_KV, UI_VL, UI_TAG_KV } from '@/constant/componentConstant'
import { createProps } from './createProps'

const select: IUIComponent = {
  label: UI_VL[UI_KV.SELECT],
  type: UI_KV.SELECT,
  isBasic: true,
  tags: [UI_TAG_KV.FORM],
  preview: () => <el-select placeholder="请选择"></el-select>,
  render: () => {
    return <el-select>下拉选择</el-select>
  },
  props: createProps()
}

export default select
