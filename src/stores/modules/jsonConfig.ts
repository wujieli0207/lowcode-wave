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

  // ========== page 相关操作 =========
  function updatePage(page: IPageConfig) {
    jsonConfig.currentPage = page
  }

  function clearPage() {
    jsonConfig.currentPage.children = []
  }

  return {
    jsonConfig,
    setCurrentFiled,
    updatePage,
    clearPage
  }
})
