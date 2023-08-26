import type { IBasePlugin } from '#/plugin'

const modules = import.meta.glob('./**/*.(tsx|vue)', { eager: true })
const plugins: Record<string, IBasePlugin> = {}

for (const key in modules) {
  const module = (modules[key] as any).default
  console.log('module: ', module)
  plugins[module.key] = module
}

export default plugins
