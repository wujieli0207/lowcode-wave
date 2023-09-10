import { IUIComponent } from '#/components'
import { UI_KV, UI_VL, UI_TAG_KV } from '@/constant/componentConstant'
import { createProps } from './createProps'
import styles from './index.module.scss'
import { renderSlot, useSlots } from 'vue'

export default {
  label: UI_VL[UI_KV.FORM],
  type: UI_KV.FORM,
  isBasic: true,
  tags: [UI_TAG_KV.CONTAINER],
  preview: () => (
    <el-form class={styles['preivew-container']} label-position="left">
      <el-form-item label="密码:">
        <el-input size="small" />
      </el-form-item>
      <el-button class={styles['btn']} size="small" round>
        提交
      </el-button>
    </el-form>
  ),
  render: ({ styles, props }) => {
    const slots = useSlots()

    return (
      // style={styles}
      <div>
        <el-form {...props}>{renderSlot(slots, 'default')}</el-form>
      </div>
    )
  },
  props: createProps()
} as IUIComponent
