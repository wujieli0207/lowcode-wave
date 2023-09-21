import { computed, defineComponent, ref } from 'vue'
import styles from './index.module.scss'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import { storeToRefs } from 'pinia'
import uiComponents from '@/components/UIComponents'
import { DraggableTransitionGroup } from '@/components/Drag'
import { EVENT_VL } from '@/constant/eventConstant'
import { isArray } from 'lodash-es'
import { handleAddEvent, handleDeleteEvent, handleEditEvent } from './utils'
import { Plus, Delete } from '@element-plus/icons-vue'
import { IFieldConfig, EventKey, IOperation } from '#/editor'
import { OperationCard } from './components'
import { IVueDraggableSlotParams } from '#/plugin'
import { EditEnum } from '@/constant/commonConstant'

export default defineComponent({
  key: 'EventConfigPlugin',
  label: '事件',
  order: 3,
  setup() {
    const jsonConfigStore = useJsonConfigStore()

    const { currentField } = storeToRefs(jsonConfigStore)
    const { moveFieldEventOperation } = jsonConfigStore

    const acitonList = [
      {
        tips: '新增事件',
        icon: Plus,
        click: (field: IFieldConfig, eventKey: EventKey) => {
          handleEditEvent({ field, eventKey, editType: EditEnum.ADD })
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

        {currentField.value && (
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
        )}

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
                      const actions = computed({
                        get: () => currentField.value?.events[eventKey].actions,
                        set: (value) => {
                          moveFieldEventOperation(currentField.value!, eventKey, value)
                        }
                      })

                      return (
                        actions.value && (
                          <>
                            <DraggableTransitionGroup
                              v-model={actions.value}
                              item-key="type"
                              group={{ name: 'components', put: false }}
                            >
                              {{
                                item: ({ element, index }: IVueDraggableSlotParams<IOperation>) => (
                                  <OperationCard
                                    operation={element}
                                    operationIndex={index}
                                    field={currentField}
                                    eventKey={eventKey as EventKey}
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
