import { defineComponent, ref, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import uiComponents from '@/components/UIComponents'
import { IFieldProps } from '#/editor'
import { ComponentConfigProps, ComponentConfigType } from '#/components'
import styles from './index.module.scss'

export default defineComponent({
  name: 'PropConfig',
  setup() {
    const activeCollapse = ref('general')

    const jsonConfigStore = useJsonConfigStore()

    const { jsonConfig } = storeToRefs(jsonConfigStore)
    const { currentField } = toRefs(jsonConfig.value)

    const fieldPropsRenderer = (
      propKey: keyof IFieldProps,
      config: ComponentConfigProps,
      propsObj: IFieldProps
    ): JSX.Element => {
      let element
      const { type, label, tips, options } = config
      if (type === ComponentConfigType.INPUT) {
        element = <el-input v-model={propsObj[propKey]} placeholder={tips || label} />
      }
      if (type === ComponentConfigType.INPUT_NUMBER) {
        element = <el-input-number v-model={propsObj[propKey]} placeholder={tips || label} />
      }
      if (type === ComponentConfigType.SELECT) {
        element = (
          <el-select v-model={propsObj[propKey]} placeholder={tips || label}>
            {(options || []).map((option) => {
              return <el-option label={option.label} value={option.value} />
            })}
          </el-select>
        )
      }
      if (type === ComponentConfigType.SWITCH) {
        element = <el-switch v-model={propsObj[propKey]} />
      }

      return <el-form-item label={label}>{element}</el-form-item>
    }

    const FormRenderer = () => {
      const formContent: JSX.Element[] = []

      if (currentField.value) {
        // 通用配置：id 和绑定字段
        formContent.push(
          <>
            <el-collapse-item title="通用配置" name="general">
              <el-form-item label="字段ID">
                <el-input value={currentField.value._id} disabled={true} />
              </el-form-item>
              <el-form-item label="字段key">
                <el-input v-model={currentField.value.fieldCode} />
              </el-form-item>
            </el-collapse-item>
          </>
        )

        // 引入配置 props
        const propsConfig = uiComponents[currentField.value.type]
        if (propsConfig.props) {
          propsConfig.props.forEach((item) => {
            formContent.push(
              <el-collapse-item title={item.groupName} name={item.groupName}>
                {Object.entries(item.children).map(([key, config]) => {
                  return fieldPropsRenderer(
                    key as keyof IFieldProps,
                    config as ComponentConfigProps,
                    currentField.value?.props as IFieldProps
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

    return <FormRenderer />
  }
})
