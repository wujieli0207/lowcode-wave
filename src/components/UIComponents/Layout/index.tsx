import { IUIComponent } from '#/components'
import { UI_KV, UI_VL, UI_TAG_KV } from '@/constant/componentConstant'
import { createProps } from './createProps'
import { createLayoutSlots } from './utils'
import { renderSlot, useSlots } from 'vue'

export default {
  label: UI_VL[UI_KV.LAYOUT],
  type: UI_KV.LAYOUT,
  isBasic: true,
  tags: [UI_TAG_KV.CONTAINER],
  preview: () => (
    <el-row gutter={20}>
      <el-col span={12}>span:12</el-col>
      <el-col span={12}>span:12</el-col>
    </el-row>
  ),
  render: () => {
    const slots = useSlots()
    return (
      <el-row gutter={20}>
        {createLayoutSlots('12:12').map((item) => {
          return <el-col span={item.span}>{renderSlot(slots, item.key)}</el-col>
        })}
      </el-row>
    )
  },
  // props: createProps()
  props: createProps()
} as IUIComponent
