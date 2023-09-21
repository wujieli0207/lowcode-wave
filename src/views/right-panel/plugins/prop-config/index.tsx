import { computed, defineComponent, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import uiComponents from '@/components/UIComponents'
import { ComponentConfigProps } from '#/components'
import styles from './index.module.scss'
import FormItemConfigRenderer from '../../components/FormItemConfigRenderer'
import { initActiveCollapse, handleUpdateFieldProps, handleUpdateFieldCode } from './utils'

export default defineComponent({
  key: 'PropConfigPlugin',
  label: '属性',
  order: 1,
  setup() {
    const jsonConfigStore = useJsonConfigStore()

    const { currentField } = storeToRefs(jsonConfigStore)

    const activeCollapse = ref(initActiveCollapse(currentField.value))

    const FormRenderer = () => {
      const formContent: JSX.Element[] = []

      if (currentField.value) {
        const fieldCode = computed({
          get: () => currentField.value?.fieldCode,
          set: (value) => {
            handleUpdateFieldCode(currentField.value!, value!)
          }
        })

        // 通用配置：id 和绑定字段
        formContent.push(
          <>
            <el-collapse-item title="通用配置" name="general">
              <el-form-item label="字段ID">
                <el-input value={currentField.value._id} disabled={true} />
              </el-form-item>
              <el-form-item label="字段key">
                <el-input v-model={fieldCode.value} />
              </el-form-item>
            </el-collapse-item>
          </>
        )

        // 引入配置 props
        const fieldConfig = uiComponents[currentField.value.type]
        if (fieldConfig.props) {
          fieldConfig.props.forEach((item) => {
            formContent.push(
              <el-collapse-item title={item.groupName} name={item.groupName}>
                {Object.entries(item.children).map(([key, config]) => {
                  return FormItemConfigRenderer(
                    key,
                    config as ComponentConfigProps,
                    currentField.value?.props!,
                    currentField.value!,
                    handleUpdateFieldProps
                  )
                })}
              </el-collapse-item>
            )
          })
        }
      }

      return (
        <>
          <el-form label-width="120px" label-position="left" class={styles['prop-config-panel']}>
            <el-collapse v-model={activeCollapse.value}>{formContent}</el-collapse>
          </el-form>
        </>
      )
    }

    return FormRenderer
  }
})
