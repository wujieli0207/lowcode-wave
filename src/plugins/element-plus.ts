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
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElBreadcrumb,
  ElBreadcrumbItem
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
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElBreadcrumb,
  ElBreadcrumbItem
]

export function setupElementPlus(app: App) {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}
