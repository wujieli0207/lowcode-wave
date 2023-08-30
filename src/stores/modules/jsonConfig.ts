import { IFieldConfig, IPageConfig } from '#/editor'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

interface IJsonConfig {
  currentField: Nullable<IFieldConfig>
  currentPage: IPageConfig // 当前操作的页面
}

export const useJsonConfigStore = defineStore('jsonConfig', () => {
  const currentPage: IPageConfig = {
    pageId: 'temp',
    pageName: 'temp',
    pageRoute: '/temp',
    children: []
  }

  const jsonConfig: IJsonConfig = reactive({
    currentField: null,
    currentPage
  })

  function setCurrentFiled(field: IFieldConfig) {
    jsonConfig.currentField = field
  }

  return {
    jsonConfig,
    setCurrentFiled
  }
})
