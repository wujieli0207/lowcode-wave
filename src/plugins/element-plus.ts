import { App } from 'vue'

import {
  ElButton,
  ElInput,
  ElInputNumber,
  ElContainer,
  ElHeader,
  ElAside,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElTooltip,
  ElSelect,
  ElOption,
  ElForm,
  ElFormItem,
  ElSwitch,
  ElCollapse,
  ElCollapseItem,
  ElRow,
  ElCol,
  ElDivider,
  ElDialog,
  ElRadioGroup,
  ElRadioButton,
  ElAlert
} from 'element-plus'

const components = [
  ElButton,
  ElInput,
  ElInputNumber,
  ElContainer,
  ElHeader,
  ElAside,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElTooltip,
  ElSelect,
  ElOption,
  ElForm,
  ElFormItem,
  ElSwitch,
  ElCollapse,
  ElCollapseItem,
  ElRow,
  ElCol,
  ElDivider,
  ElDialog,
  ElRadioGroup,
  ElRadioButton,
  ElAlert
]

export function setupElementPlus(app: App) {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}
