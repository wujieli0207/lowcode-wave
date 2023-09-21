import { computed, defineComponent, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { ArrowRight } from '@element-plus/icons-vue'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import { findFocusedParents } from '@/utils/helper/tree'
import { UI_VL } from '@/constant/componentConstant'
import styles from './index.module.scss'

export default defineComponent({
  name: 'EditorHeader',
  setup() {
    const jsonConfigStore = useJsonConfigStore()

    const { jsonConfig, currentPage } = storeToRefs(jsonConfigStore)
    const { currentField } = toRefs(jsonConfig.value)
    const { setCurrentFiled } = jsonConfigStore

    const breadcrumbList = computed(() => {
      const result = findFocusedParents(currentPage.value.children, [], currentField.value?._id)
      return result
    })

    return () => (
      <el-breadcrumb separator-icon={ArrowRight}>
        {/* 当前页面路径 */}
        <el-breadcrumb-item key={currentPage.value.pageId}>
          {currentPage.value.pageName}
        </el-breadcrumb-item>

        {breadcrumbList.value.map((item) => (
          <el-breadcrumb-item
            key={item._id}
            class={styles['breadcrumb-item']}
            onClick={() => setCurrentFiled(item)}
          >
            {UI_VL[item.type]}
          </el-breadcrumb-item>
        ))}
      </el-breadcrumb>
    )
  }
})
