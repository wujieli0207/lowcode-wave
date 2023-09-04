import { defineComponent, ref, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import styles from './index.module.scss'

export default defineComponent({
  name: 'StyleConfig',
  setup() {
    const activeCollapse = ref('general')

    const FormRenderer = () => {
      const formContent: JSX.Element[] = []

      const jsonConfigStore = useJsonConfigStore()

      const { jsonConfig } = storeToRefs(jsonConfigStore)
      const { currentField } = toRefs(jsonConfig.value)

      if (currentField.value) {
        // 基础样式：
        formContent.push(
          <>
            <el-collapse-item title="基础样式" name="general">
              <el-form-item label="对齐方式">
                <el-radio-group v-model={currentField.value.styles.justifyContent} size="small">
                  <el-radio-button label="flex-start">左对齐</el-radio-button>
                  <el-radio-button label="center">居中对齐</el-radio-button>
                  <el-radio-button label="flex-end">右对齐</el-radio-button>
                </el-radio-group>
              </el-form-item>
              {/* TODO 内外边距方式待优化 */}
              <el-form-item label="内边距">
                <el-input v-model={currentField.value.styles.paddingTop} placeholder="上内边距" />
                <el-input v-model={currentField.value.styles.paddingRight} placeholder="右内边距" />
                <el-input
                  v-model={currentField.value.styles.paddingBottom}
                  placeholder="下内边距"
                />
                <el-input v-model={currentField.value.styles.paddingLeft} placeholder="左外边距" />
              </el-form-item>
              <el-form-item label="外边距">
                <el-input v-model={currentField.value.styles.marginTop} placeholder="上外边距" />
                <el-input v-model={currentField.value.styles.marginRight} placeholder="右外边距" />
                <el-input v-model={currentField.value.styles.marginBottom} placeholder="下外边距" />
                <el-input v-model={currentField.value.styles.marginRight} placeholder="左外边距" />
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
