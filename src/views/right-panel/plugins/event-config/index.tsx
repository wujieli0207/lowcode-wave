import { defineComponent, ref, toRefs, watch } from 'vue'
import styles from './index.module.scss'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import { storeToRefs } from 'pinia'
import uiComponents from '@/components/UIComponents'
import { DraggableTransitionGroup } from '@/components/Drag'
import { EVENT_VL, OP_TYPE_VL } from '@/constant/eventConstant'
import { isArray } from 'lodash-es'
import { handleAddEvent, handleDeleteEvent, handleEditEvent } from './utils'
import { Plus, Delete } from '@element-plus/icons-vue'
import { IFieldConfig, EventKey } from '#/editor'
import { EventCard } from './components'

export default defineComponent({
  key: 'EventConfigPlugin',
  label: '事件',
  order: 3,
  setup() {
    const jsonConfigStore = useJsonConfigStore()

    const { jsonConfig } = storeToRefs(jsonConfigStore)
    const { currentField } = toRefs(jsonConfig.value)

    const acitonList = [
      {
        tips: '新增事件',
        icon: Plus,
        click: (field: IFieldConfig, eventKey: EventKey) => {
          handleEditEvent(field, eventKey)
        }
      },
      {
        tips: '删除事件',
        icon: Delete,
        click: (field: IFieldConfig, eventKey: EventKey) => {
          handleDeleteEvent(field, eventKey)
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
                        disabled={Object.keys(currentField.value?.events!).includes(event.type)}
                        onClick={() => handleAddEvent(currentField.value!, event.type)}
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
        {currentField.value?.events &&
          Object.keys(currentField.value?.events).map((eventKey) => {
            const activeCollapse = ref(eventKey)

            return (
              <el-collapse v-model={activeCollapse.value}>
                <el-collapse-item name={eventKey}>
                  {{
                    title: () => {
                      return (
                        <div class={styles['event-header']}>
                          <span>{EVENT_VL[eventKey]}</span>
                          {acitonList.map((action) => {
                            return (
                              <el-tooltip content={action.tips} placement="top">
                                <el-icon
                                  class={styles['event-header__icon']}
                                  onClick={(e) => {
                                    action.click(
                                      currentField.value!,
                                      eventKey as unknown as EventKey
                                    )
                                    e.stopPropagation()
                                  }}
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
                      // TODO 拖动排序功能未实现
                      const actions = ref(currentField.value?.events[eventKey].actions)

                      return (
                        actions.value && (
                          <>
                            <DraggableTransitionGroup
                              v-model={actions.value}
                              item-key="type"
                              group={{ name: 'components', put: false }}
                            >
                              {{
                                item: ({ element }) => (
                                  <EventCard
                                    title={OP_TYPE_VL[element.type]}
                                    desc={element.args.desc}
                                  />
                                )
                              }}
                            </DraggableTransitionGroup>
                          </>
                        )
                      )
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
