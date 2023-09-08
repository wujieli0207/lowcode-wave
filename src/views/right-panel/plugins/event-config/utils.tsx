import { IFieldConfig, IEvent } from '#/editor'
import { useModal } from '@/hooks/useModal'
import styles from './index.module.scss'
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElInput, ElCollapse, ElCollapseItem } from 'element-plus'
import { Ioperation, operationConfg } from './config'
import { OP_TYPE_VL } from '@/constant/eventConstant'

/**
 * @description 添加事件
 */
export function handleAddEvent(field: IFieldConfig, event: IEvent) {
  field.events.push({
    type: event.type,
    args: {}
  })
}

/**
 * @description 删除事件
 */
export function handleDeleteEvent(field: IFieldConfig, event: IEvent) {
  field.events = field.events.filter((item) => item.type !== event.type)
}

/**
 * @description 编辑事件
 */
export function handleEditEvent(field: IFieldConfig, event: IEvent) {
  function handleSelectOperation(operation: Ioperation) {
    selectedOperation.value = operation
  }

  const selectedOperation = ref<Nullable<Ioperation>>()

  useModal({
    title: '编辑事件',
    content: () => {
      const searchValue = ref('')
      return (
        <div class={styles['edit-event']}>
          {/* 执行动作 */}
          <div class={styles['edit-event__list']}>
            <div class={styles['edit-event__list__filter']}>
              <div class={styles['edit-event__title']}>执行动作</div>
              <ElInput
                v-model={searchValue.value}
                placeholder="请搜索执行动作"
                suffix-icon={Search}
              />
            </div>

            <div class={styles['edit-event__list__operation']}>
              {operationConfg.map((item) => {
                const activeName = ref(item.groupName)
                return (
                  <ElCollapse v-model={activeName.value}>
                    <ElCollapseItem name={item.groupName} title={item.groupName}>
                      {item.operationList.map((operation) => {
                        return (
                          <div
                            class={styles['edit-event__list__operation__item']}
                            onClick={() => handleSelectOperation(operation)}
                          >
                            {OP_TYPE_VL[operation.opType]}
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
                <div class={styles['edit-event__title']}>
                  {OP_TYPE_VL[selectedOperation.value.opType]}
                </div>

                <div class={styles['edit-event__config_args']}>{selectedOperation.value.args}</div>
              </div>
            )}
          </div>
        </div>
      )
    },
    onComfirm: () => {
      return true
    },
    onCancel: () => {
      return true
    }
  })
}
