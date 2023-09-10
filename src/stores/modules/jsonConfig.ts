import { IFieldConfig, IPageConfig } from '#/editor'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

interface IJsonConfig {
  currentField: Nullable<IFieldConfig>
  currentPage: IPageConfig // 当前操作的页面
}

export const useJsonConfigStore = defineStore('jsonConfig', () => {
  const prevSelectComponent = ref<Nullable<IFieldConfig>>(null)

  const currentPage: IPageConfig = {
    pageId: 'home',
    pageName: '首页',
    pageRoute: '/home',
    children: []
  }

  const jsonConfig: IJsonConfig = reactive({
    currentField: null,
    currentPage
  })

  // ========== field 相关操作 =========
  function setCurrentFiled(field: IFieldConfig) {
    jsonConfig.currentField = field
  }

  /**
   *
   * @description 设置组件是否被选中
   */
  function handleSetFocus(element: IFieldConfig) {
    // 如果两个 id 相同，说明是同一个组件，直接取反
    // 如果两个 id 不同，说明是不同组件，需要把上一个组件的 isFocus 设置为 false
    element.isFocus = !element.isFocus

    if (prevSelectComponent.value && prevSelectComponent.value._id !== element._id) {
      prevSelectComponent.value.isFocus = false
    }
    prevSelectComponent.value = element
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
    handleSetFocus,
    updatePage,
    clearPage
  }
})
