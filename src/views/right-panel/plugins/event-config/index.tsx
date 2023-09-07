import { defineComponent, ref, toRefs } from 'vue'
import styles from './index.module.scss'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import { storeToRefs } from 'pinia'
import uiComponents from '@/components/UIComponents'
import { EVENT_VL } from '@/constant/eventConstant'
import { isArray } from 'lodash-es'
import { handleAddEvent, handleDeleteEvent } from './utils'
import { Plus, Delete } from '@element-plus/icons-vue'
import { IEvent, IFieldConfig } from '#/editor'

export default defineComponent({
  name: 'EventConfig',
  setup() {
    const jsonConfigStore = useJsonConfigStore()

    const { jsonConfig } = storeToRefs(jsonConfigStore)
    const { currentField } = toRefs(jsonConfig.value)

    const acitonList = [
      {
        tips: '新增事件',
        icon: Plus,
        click: () => {}
      },
      {
        tips: '删除事件',
        icon: Delete,
        click: (field: IFieldConfig, event: IEvent) => {
          handleDeleteEvent(field, event)
        }
      }
    ]

    return (
      <div class={styles['event-config-panel']}>
        {/* 添加事件 */}
        <el-dropdown trigger="click">
          {{
            default: () => (
              <el-button type="primary" plain={true} class={styles['add-btn']}>
                添加事件
              </el-button>
            ),
            dropdown: () => {
              if (currentField.value) {
                const fieldConfig = uiComponents[currentField.value.type]

                return (
                  isArray(fieldConfig.events) &&
                  fieldConfig.events.map((event) => {
                    return (
                      <el-dropdown-item
                        disabled={currentField.value?.events?.some(
                          (item) => item.type === event.type
                        )}
                        onClick={() => handleAddEvent(currentField.value!, event)}
                      >
                        {EVENT_VL[event.type]}
                      </el-dropdown-item>
                    )
                  })
                )
              }
            }
          }}
        </el-dropdown>

        {/* 事件面板 */}
        {currentField.value?.events?.map((event) => {
          const activeCollapse = ref(event.type)
          return (
            <el-collapse v-model={activeCollapse.value}>
              <el-collapse-item name={event.type}>
                {{
                  title: () => {
                    return (
                      <div class={styles['event-header']}>
                        <span>{EVENT_VL[event.type]}</span>
                        {acitonList.map((action) => {
                          return (
                            <el-tooltip content={action.tips} placement="top">
                              <el-icon
                                class={styles['event-header__icon']}
                                onClick={() => action.click(currentField.value!, event)}
                              >
                                <action.icon />
                              </el-icon>
                            </el-tooltip>
                          )
                        })}
                      </div>
                    )
                  },
                  default: () => {
                    // TODO 绘制新增的事件
                    // TODO 绘制事件编辑 dialog
                    return <div>123</div>
                  }
                }}
              </el-collapse-item>
            </el-collapse>
          )
        })}
      </div>
    )
  }
})
