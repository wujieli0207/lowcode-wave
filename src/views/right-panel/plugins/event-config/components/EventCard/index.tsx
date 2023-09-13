import { defineComponent } from 'vue'
import { DCaret, Delete, Edit } from '@element-plus/icons-vue'
import styles from './index.module.scss'

export const EventCard = defineComponent({
  name: 'EventCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    return () => (
      <div class={styles['card']}>
        <div class={styles['card__header']}>
          <div class={styles['card__header__title']}>
            <el-icon class={styles['title__icon']}>
              <DCaret />
            </el-icon>
            <span>{props.title}</span>
          </div>

          <div class={styles['card__header__handle']}>
            <el-tooltip content="编辑操作" placement="top">
              <el-icon class={styles['handle__icon']}>
                <Edit />
              </el-icon>
            </el-tooltip>

            <el-tooltip content="删除操作" placement="top">
              <el-icon class={styles['handle__icon']}>
                <Delete />
              </el-icon>
            </el-tooltip>
          </div>
        </div>
        <div class={styles['card__desc']}>{props.desc}</div>
      </div>
    )
  }
})
