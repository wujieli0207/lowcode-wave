import { Edit, Search } from '@element-plus/icons-vue'
import { defineComponent, ref } from 'vue'
import uiComponents from '@/components/UIComponents'
import { DraggableTransitionGroup } from '@/components/Drag'
import styles from './index.module.scss'
import { getGroupComponentsByTag, handleClone } from './utils'
import { UI_TAG_VL } from '@/constant/componentConstant'
import { IUIComponent } from '#/components'

const totalComponents = getGroupComponentsByTag(UI_TAG_VL, Object.values(uiComponents))

const groupComponents = ref(getGroupComponentsByTag(UI_TAG_VL, Object.values(uiComponents)))
const activeCollapse = ref(Object.keys(groupComponents.value))
const search = ref('')

export default defineComponent({
  key: 'componentsPlugin',
  label: '组件库',
  order: 1,
  icon: Edit,
  setup() {
    function handleSearch(value: string) {
      // 分组标题搜索
      const groupResult = {}
      Object.keys(UI_TAG_VL).forEach((key) => {
        const label = UI_TAG_VL[key]
        if (label.includes(value) && value !== '') {
          groupResult[key] = totalComponents[key]
        }
      })
      if (Object.keys(groupResult).length) {
        groupComponents.value = groupResult
        return
      }

      // 组件名称搜索
      const result = {}
      Object.keys(totalComponents).forEach((key) => {
        result[key] = totalComponents[key].filter((item) => item.label.includes(value))
      })
      groupComponents.value = result
    }

    return () => (
      <>
        {/* 组件搜索 */}
        <div>
          <el-input
            v-model={search.value}
            placeholder="输入组件名或分组标题搜索"
            suffix-icon="Search"
            onChange={(value: string) => handleSearch(value)}
          >
            {{
              prefix: () => (
                <el-icon>
                  <Search />
                </el-icon>
              )
            }}
          </el-input>
        </div>

        {/* 组件模块 */}
        <el-collapse v-model={activeCollapse.value}>
          {Object.keys(groupComponents.value).map((key) => {
            const components = groupComponents.value[key] as IUIComponent[]
            return (
              components.length > 0 && (
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
 */
