import { PropType, defineComponent } from 'vue'
import { More } from '@element-plus/icons-vue'
import { IFieldConfig, IPageConfig } from '#/editor'
import { UI_VL } from '@/constant/componentConstant'
import { defaultActions, moreActions } from './actions'
import styles from './index.module.scss'

import { isFunction } from 'lodash-es'

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
                <el-tooltip content="更多">
                  <el-dropdown trigger="click">
                    {{
                      default: () => (
                        <el-icon>
                          <More />
                        </el-icon>
                      ),
                      dropdown: () => (
                        <el-dropdown-menu>
                          {moreActions.map((action) => {
                            return (
                              <el-dropdown-item
                                disabled={
                                  isFunction(action.disabled)
                                    ? action.disabled(props.element, props.pageChildren)
                                    : action.disabled
                                }
                                divided={action.divided}
                                onClick={() => action.click(props.element, props.pageChildren)}
                              >
                                <span class={action.highlight ? styles['highlight'] : ''}>
                                  {action.name}
                                </span>
                              </el-dropdown-item>
                            )
                          })}
                        </el-dropdown-menu>
                      )
                    }}
                  </el-dropdown>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
})
