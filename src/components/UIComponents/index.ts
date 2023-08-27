import type { IUIComponent } from '#/components'

const modules = import.meta.glob('./**/*.(tsx|vue)', { eager: true })
const uiComponents: Record<string, IUIComponent> = {}

for (const key in modules) {
  const module = (modules[key] as any).default
  uiComponents[module.type] = module
}

export default uiComponents
