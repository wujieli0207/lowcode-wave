import { computed, defineComponent, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { Document } from '@element-plus/icons-vue'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import { ITreeData, getTreeWithLabel } from './utils'

export default defineComponent({
  key: 'pageTreePlugin',
  label: '页面层级',
  order: 2,
  icon: Document,
  setup() {
    const jsonConfigStore = useJsonConfigStore()
    const { jsonConfig } = storeToRefs(jsonConfigStore)
    const { currentPage } = toRefs(jsonConfig.value)

    const defaultProps = {
      children: 'children',
      label: 'label'
    }

    const treeData = computed((): ITreeData[] => {
      if (!currentPage.value) return []

      // 增加顶层页面
      return [
        {
          label: currentPage.value.pageName,
          children: getTreeWithLabel(currentPage.value.children)
        }
      ]
    })

    return () => (
      <>
        <el-tree data={treeData.value} props={defaultProps} defaultExpandAll={true}></el-tree>
      </>
    )
  }
})
