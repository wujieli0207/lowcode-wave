import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useGlobalConfigStore = defineStore('globalConfig', () => {
  const globalConfig = reactive({
    isPreview: false // 是否是预览模式
  })

  function togglePreview(isPreview: boolean) {
    globalConfig.isPreview = isPreview ?? !globalConfig.isPreview
  }

  return {
    globalConfig,
    togglePreview
  }
})
