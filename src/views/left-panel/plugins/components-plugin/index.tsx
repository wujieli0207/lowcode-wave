import { Edit } from '@element-plus/icons-vue'
import { defineComponent, ref } from 'vue'
import uiComponents from '@/components/UIComponents'
import { DraggableTransitionGroup } from '@/components/Drag'
import styles from './index.module.scss'
import { getGroupComponentsByTag, handleClone } from './utils'
import { UI_TAG_VL } from '@/constant/componentConstant'

export default defineComponent({
  key: 'componentsPlugin',
  label: '组件库',
  order: 1,
  icon: Edit,
  setup() {
    const groupComponents = ref(getGroupComponentsByTag(UI_TAG_VL, Object.values(uiComponents)))
    const activeCollapse = ref(Object.keys(groupComponents.value))
    // TODO 默认展开后不能折叠

    return (
      <>
        <el-collapse v-model={activeCollapse.value}>
          {Object.entries(groupComponents.value).map(([key, components]) => {
            return (
              <el-collapse-item title={UI_TAG_VL[key]} name={key}>
                <DraggableTransitionGroup
                  v-model={components}
                  item-key="key"
                  group={{ name: 'components', pull: 'clone', put: false }}
                  class={styles['component-group']}
                  clone={handleClone}
                >
                  {{
                    item: ({ element }) => (
                      <div class={styles['component-item']} data-label={element.label}>
                        {element.preview()}
                      </div>
                    )
                  }}
                </DraggableTransitionGroup>
              </el-collapse-item>
            )
          })}
        </el-collapse>
      </>
    )
  }
})

/**
 * 待完成内容
 * 1. 组件搜索
 * 2. 基础组件，自定义组件分类
 * 3. 组件 tags 分类
 */
