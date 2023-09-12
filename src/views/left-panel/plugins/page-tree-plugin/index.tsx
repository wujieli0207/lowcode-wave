import { computed, defineComponent, ref, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { ElTree } from 'element-plus'
import { Document } from '@element-plus/icons-vue'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import { find } from 'tree-lodash'
import { ITreeData, getTreeWithLabel } from './utils'
import { IFieldConfig } from '#/editor'

const defaultProps = {
  children: 'children',
  label: 'label'
}

export default defineComponent({
  key: 'pageTreePlugin',
  label: '页面层级',
  order: 2,
  icon: Document,
  setup() {
    const pageTreeRef = ref<InstanceType<typeof ElTree>>()

    const jsonConfigStore = useJsonConfigStore()
    const { jsonConfig } = storeToRefs(jsonConfigStore)
    const { currentPage } = toRefs(jsonConfig.value)
    const { setCurrentFiled, handleSetFocus } = jsonConfigStore

    const treeData = computed((): ITreeData[] => {
      if (!currentPage.value) return []

      // 增加顶层页面
      return [
        {
          id: currentPage.value.pageId,
          label: currentPage.value.pageName,
          children: getTreeWithLabel(currentPage.value.children)
        }
      ]
    })

    function handleNodeClick(selectedNode: ITreeData) {
      // 顶层页面不支持选择
      if (selectedNode.id === currentPage.value.pageId) return

      const result = find(
        currentPage.value.children,
        (item) => (item as unknown as IFieldConfig)._id === selectedNode.id
      ) as unknown as IFieldConfig

      setCurrentFiled(result)
      handleSetFocus(result)
    }

    return () => (
      <>
        <el-tree
          ref={pageTreeRef}
          data={treeData.value}
          props={defaultProps}
          nodeKey="id"
          defaultExpandAll={true}
          expandOnClickNode={false}
          onNodeClick={(selectedNode: ITreeData) => handleNodeClick(selectedNode)}
          onSetCurrentKey={(key: string) => console.log('key: ', key)}
        ></el-tree>
      </>
    )
  }
})
