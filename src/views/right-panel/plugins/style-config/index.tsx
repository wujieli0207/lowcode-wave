import { computed, defineComponent, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import styles from './index.module.scss'
import { handleUpdateFieldStyles } from './utils'

export default defineComponent({
  key: 'StyleConfigPlugin',
  label: '样式',
  order: 2,
  setup() {
    const activeCollapse = ref('general')

    const FormRenderer = () => {
      const formContent: JSX.Element[] = []

      const jsonConfigStore = useJsonConfigStore()

      const { currentField } = storeToRefs(jsonConfigStore)

      if (currentField.value) {
        // 基础样式：
        formContent.push(
          <>
            <el-collapse-item title="基础样式" name="general">
              <el-form-item label="对齐方式">
                <el-radio-group
                  size="small"
                  value={currentField.value.styles.justifyContent}
                  onChange={(value: string) =>
                    handleUpdateFieldStyles({
                      value,
                      styleKey: 'justifyContent',
                      field: currentField.value!
                    })
                  }
                >
                  <el-radio-button label="flex-start">左对齐</el-radio-button>
                  <el-radio-button label="center">居中对齐</el-radio-button>
                  <el-radio-button label="flex-end">右对齐</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-collapse-item>
          </>
        )
      }

      return (
        <>
          <el-form label-width="70px" label-position="left" class={styles['style-config-panel']}>
            <el-collapse v-model={activeCollapse.value}>{formContent}</el-collapse>
          </el-form>
        </>
      )
    }

    return <FormRenderer />
  }
})
