import type { IBasePlugin } from '#/plugin'

const modules = import.meta.glob('./**/index.(tsx|vue)', { eager: true })
const plugins: Record<string, IBasePlugin> = {}

for (const key in modules) {
  const module = (modules[key] as any).default
  plugins[module.key] = module
}

export default plugins
