import { PropType, defineComponent } from 'vue'
import { ZoomIn, More, ArrowLeft, ArrowRight, Delete } from '@element-plus/icons-vue'
import { IFieldConfig, IPageConfig } from '#/editor'
import { UI_VL } from '@/constant/componentConstant'
import styles from './index.module.scss'
import { handleDelete, handleInsertBefore, handleInsertAfter, handleViewJson } from './utils'

export default defineComponent({
  name: 'FieldToolbar',
  props: {
    element: {
      type: Object as PropType<IFieldConfig>,
      default: () => {}
    },
    pageChildren: {
      type: Array as PropType<IPageConfig['children']>,
      default: () => {}
    }
  },
  setup(props) {
    const defaultActions = [
      {
        name: '查看节点',
        click: (element: IFieldConfig) => {
          handleViewJson(element)
        },
        icon: ZoomIn
      },
      {
        name: '向前插入节点',
        click: (element: IFieldConfig, pageChildren: IPageConfig['children']) => {
          handleInsertBefore(element, pageChildren)
        },
        icon: ArrowLeft
      },
      {
        name: '向后插入节点',
        click: (element: IFieldConfig, pageChildren: IPageConfig['children']) => {
          handleInsertAfter(element, pageChildren)
        },
        icon: ArrowRight
      },
      {
        name: '删除节点',
        click: (element: IFieldConfig, pageChildren: IPageConfig['children']) => {
          handleDelete(element, pageChildren)
        },
        icon: Delete
      }
    ]

    return () => {
      return (
        <div class={styles['field-toolbar']}>
          <div class="field-toolbar__left">{UI_VL[props.element.type]}</div>

          <el-divider direction="vertical" />

          <div class="field-toolbar__right">
            <div class={styles['field-toolbar__actions']}>
              {/* 默认操作 */}
              {defaultActions.map((action) => {
                return (
                  <div
                    class={styles['field-toolbar__action']}
                    onClick={() => action.click(props.element, props.pageChildren)}
                  >
                    <el-tooltip content={action.name}>
                      <el-icon>
                        <action.icon />
                      </el-icon>
                    </el-tooltip>
                  </div>
                )
              })}

              <el-divider direction="vertical" />

              {/* 更多操作 */}
              <div class={styles['field-toolbar__action']}>
                <el-icon>
                  <More />
                </el-icon>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
})
