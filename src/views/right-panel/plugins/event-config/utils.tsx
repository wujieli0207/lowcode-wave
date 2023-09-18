import { EventKey, IFieldConfig } from '#/editor'
import { useModal } from '@/hooks/useModal'
import styles from './index.module.scss'
import { ref } from 'vue'
import { Check } from '@element-plus/icons-vue'
import { ElCollapse, ElCollapseItem, ElIcon } from 'element-plus'
import { IOperationConfig, operationConfig } from './config'
import { OP_TYPE_VL } from '@/constant/eventConstant'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'

const jsonConfigStore = useJsonConfigStore()
const { addFieldEvent, deleteFieldEvent, addFieldEventOperation } = jsonConfigStore

/**
 * @description 添加事件
 */
export function handleAddEvent(field: IFieldConfig, eventKey: EventKey) {
  addFieldEvent(field, {
    [eventKey]: {
      actions: []
    }
  })
}

/**
 * @description 删除事件
 */
export function handleDeleteEvent(field: IFieldConfig, eventKey: EventKey) {
  deleteFieldEvent(field, eventKey)
}

/**
 * @description 编辑事件
 */
export function handleEditEvent(field: IFieldConfig, eventKey: EventKey) {
  function handleSelectOperation(operation: IOperationConfig) {
    prevSelectedOperation.value = selectedOperation.value
    if (prevSelectedOperation.value) {
      prevSelectedOperation.value.isFocus = false
    }

    selectedOperation.value = operation
    selectedOperation.value.isFocus = true
  }

  function handleReset() {
    if (selectedOperation.value) {
      selectedOperation.value.isFocus = false
    }
    selectedOperation.value = null
    prevSelectedOperation.value = null
  }

  const selectedOperation = ref<Nullable<IOperationConfig>>() // 当前选中操作
  const prevSelectedOperation = ref<Nullable<IOperationConfig>>() // 前一个选中操作

  useModal({
    title: '编辑事件',
    content: () => {
      return (
        <div class={styles['edit-event']}>
          {/* 执行动作 */}
          <div class={styles['edit-event__list']}>
            <div class={styles['edit-event__list__operation']}>
              {operationConfig.map((item) => {
                const activeName = ref(item.groupName)
                return (
                  <ElCollapse v-model={activeName.value}>
                    <ElCollapseItem name={item.groupName} title={item.groupName}>
                      {item.operationList.map((operation) => {
                        return (
                          <div
                            class={[
                              styles['edit-event__list__operation__item'],
                              operation.isFocus && styles['operation__item--focus']
                            ]}
                            onClick={() => handleSelectOperation(operation)}
                          >
                            <span>{OP_TYPE_VL[operation.opType]}</span>
                            {operation.isFocus && (
                              <ElIcon class={styles['operation__item_icon']}>
                                <Check />
                              </ElIcon>
                            )}
                          </div>
                        )
                      })}
                    </ElCollapseItem>
                  </ElCollapse>
                )
              })}
            </div>
          </div>

          {/* 具体配置 */}
          <div class={styles['edit-event__config']}>
            {selectedOperation.value && (
              <div>
                <div class={styles['edit-event__config__group']}>
                  <span class={styles['group__title']}>
                    {OP_TYPE_VL[selectedOperation.value.opType]}
                  </span>
                  <span>{selectedOperation.value.args.desc}</span>
                </div>

                <div class={styles['edit-event__config__group']}>
                  <span class={styles['group__title']}>基础配置</span>
                </div>

                <div class={styles['edit-event__config__group']}>
                  <span class={styles['group__title']}>高级配置</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    },
    onComfirm: () => {
      if (!selectedOperation.value) return

      addFieldEventOperation(field, eventKey, {
        type: selectedOperation.value.opType,
        args: selectedOperation.value.args
      })
      handleReset()
      return true
    },
    onCancel: () => {
      handleReset()
      return true
    }
  })
}
