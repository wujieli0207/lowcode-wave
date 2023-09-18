import { PropType, Ref, defineComponent } from 'vue'
import { DCaret, Delete, Edit } from '@element-plus/icons-vue'
import styles from './index.module.scss'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import { EventKey, IFieldConfig, IOperation } from '#/editor'
import { OP_TYPE_VL } from '@/constant/eventConstant'

export const OperationCard = defineComponent({
  name: 'OperationCard',
  props: {
    operation: {
      type: Object as PropType<IOperation>,
      default: () => {}
    },
    field: {
      type: Object as PropType<Ref<Nullable<IFieldConfig>>>,
      default: () => {}
    },
    eventKey: {
      type: String as PropType<EventKey>,
      default: ''
    }
  },
  setup(props) {
    const jsonConfigStore = useJsonConfigStore()
    const { deleteFieldEventOperation } = jsonConfigStore

    function handleDeleteOperation() {
      if (props.field.value) {
        deleteFieldEventOperation(props.field.value, props.eventKey, props.operation)
      }
    }

    return () => (
      <div class={styles['card']}>
        <div class={styles['card__header']}>
          <div class={styles['card__header__title']}>
            <el-icon class={styles['title__icon']}>
              <DCaret />
            </el-icon>
            <span>{OP_TYPE_VL[props.operation.type]}</span>
          </div>

          <div class={styles['card__header__handle']}>
            <el-tooltip content="编辑操作" placement="top">
              <el-icon class={styles['handle__icon']}>
                <Edit />
              </el-icon>
            </el-tooltip>

            <el-tooltip content="删除操作" placement="top">
              <el-icon class={styles['handle__icon']} onClick={() => handleDeleteOperation()}>
                <Delete />
              </el-icon>
            </el-tooltip>
          </div>
        </div>
        <div class={styles['card__desc']}>{props.operation?.args.desc}</div>
      </div>
    )
  }
})
