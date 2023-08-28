import { App } from 'vue'

import {
  ElButton,
  ElInput,
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
  ElSwitch
} from 'element-plus'

const components = [
  ElButton,
  ElInput,
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
  ElSwitch
]

export function setupElementPlus(app: App) {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}
