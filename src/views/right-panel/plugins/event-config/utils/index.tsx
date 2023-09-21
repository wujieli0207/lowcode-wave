import { EventKey, IFieldConfig } from '#/editor'
import { useModal } from '@/hooks/useModal'
import styles from '../index.module.scss'
import { ref } from 'vue'
import { Check } from '@element-plus/icons-vue'
import { ElCollapse, ElCollapseItem, ElIcon, ElForm, ElEmpty } from 'element-plus'
import { IOperationConfig, operationConfig } from '../config'
import { OP_TYPE_VL } from '@/constant/eventConstant'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import FormItemConfigRenderer from '../../../components/FormItemConfigRenderer'
import { storeToRefs } from 'pinia'
import { ComponentConfigProps } from '#/components'
import { EditEnum } from '@/constant/commonConstant'
import { cloneDeep } from 'lodash-es'

const jsonConfigStore = useJsonConfigStore()
const { currentField } = storeToRefs(jsonConfigStore)
const { addFieldEvent, deleteFieldEvent, addFieldEventOperation, updateFieldEventOperation } =
  jsonConfigStore

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

interface IHandleEditEventParams {
  field: IFieldConfig
  eventKey: EventKey
  operationIndex?: number
  editType?: EditEnum
}

/**
 * @description 编辑事件
 */
export function handleEditEvent(params: IHandleEditEventParams) {
  const { field, eventKey, operationIndex = 0, editType = EditEnum.ADD } = params

  function handleSelectOperation(operation: IOperationConfig) {
    prevSelectedOperation.value = selectedOperation.value
    if (prevSelectedOperation.value) {
      prevSelectedOperation.value.isFocus = false
    }

    selectedOperation.value = cloneDeep(operation)
    selectedOperation.value.isFocus = true
    console.log('selectedOperation.value: ', selectedOperation.value)
  }

  function handleReset() {
    if (selectedOperation.value) {
      selectedOperation.value.isFocus = false
    }
    selectedOperation.value = null
    prevSelectedOperation.value = null
  }

  function initSelectedOperation() {
    if (editType === EditEnum.EDIT && field.events[eventKey]?.actions[operationIndex]) {
      const operation = field.events[eventKey]!.actions[operationIndex]
      const operationList = operationConfig.map((item) => item.operationList).flat()
      const existOperationConfig = operationList.find((item) => item.opType === operation.type)
      if (existOperationConfig) {
        handleSelectOperation({
          ...existOperationConfig,
          // 设置已存在的默认值
          args: {
            ...existOperationConfig.args,
            ...operation.args
          }
        })
      }
    }
  }

  const selectedOperation = ref<Nullable<IOperationConfig>>() // 当前选中操作
  const prevSelectedOperation = ref<Nullable<IOperationConfig>>() // 前一个选中操作

  initSelectedOperation()

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
                  <ElForm labelPosition="left">
                    {selectedOperation.value.argsConfig ? (
                      Object.entries(selectedOperation.value.argsConfig).map(([key, config]) => {
                        return FormItemConfigRenderer(
                          key,
                          config as ComponentConfigProps,
                          selectedOperation.value?.args!,
                          currentField.value!
                        )
                      })
                    ) : (
                      <ElEmpty description="无配置内容" />
                    )}
                  </ElForm>
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

      const operationConfig = {
        type: selectedOperation.value.opType,
        args: {
          desc: selectedOperation.value.args.desc,
          // 设置默认操作参数为空字符串
          ...(selectedOperation.value.argsConfig && {
            ...Object.keys(selectedOperation.value.argsConfig).reduce((prev, key) => {
              prev[key] = selectedOperation.value?.args[key]
                ? selectedOperation.value.args[key]
                : ''

              return prev
            }, {})
          })
        }
      }

      if (editType === EditEnum.ADD) {
        addFieldEventOperation(field, eventKey, operationConfig)
      }

      if (editType === EditEnum.EDIT) {
        updateFieldEventOperation(
          field,
          eventKey,
          operationIndex,
          selectedOperation.value.opType,
          operationConfig.args
        )
      }

      handleReset()
      return true
    },
    onCancel: () => {
      handleReset()
      return true
    }
  })
}
