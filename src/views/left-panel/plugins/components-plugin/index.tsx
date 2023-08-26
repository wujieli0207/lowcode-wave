import { Edit } from '@element-plus/icons-vue'
import { defineComponent, ref } from 'vue'
import uiComponents from '@/components/UIComponents'
import { DraggableTransitionGroup } from '@/components/Drag'
import styles from './index.module.scss'

export default defineComponent({
  key: 'componentsPlugin',
  label: '组件库',
  order: 1,
  icon: Edit,
  setup() {
    const components = ref(Object.values(uiComponents))
    console.log('components: ', components.value)

    return (
      <>
        <DraggableTransitionGroup
          v-model={components.value}
          item-key="key"
          group={{ name: 'components', pull: 'clone', put: false }}
          class={styles['component-group']}
        >
          {{
            item: ({ element }) => (
              <div class={styles['component-item']} data-label={element.label}>
                {element.preview()}
              </div>
            )
          }}
        </DraggableTransitionGroup>
      </>
    )
  }
})

/**
 * 待完成内容
 * 1. 组件所有
 * 2. 基础组件，自定义组件分类
 * 3. 组件 tags 分类
 */
