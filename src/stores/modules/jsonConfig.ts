import { IFieldConfig, IPageConfig } from '#/editor'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

interface IJsonConfig {
  currentField: Nullable<IFieldConfig>
  currentPage: IPageConfig // 当前操作的页面
  jsonData: Record<string, unknown> // 完整 json 数据
}

export const useJsonConfigStore = defineStore('jsonConfig', () => {
  const currentPage: IPageConfig = {
    pageId: 'temp',
    pageName: 'temp',
    pageRoute: '/temp',
    childrens: []
  }

  const jsonConfig: IJsonConfig = reactive({
    currentField: null,
    currentPage,
    jsonData: {}
  })

  function setCurrentFiled(field: IFieldConfig) {
    jsonConfig.currentField = field
  }

  return {
    jsonConfig,
    setCurrentFiled
  }
})
