import { defineComponent, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import uiComponents from '@/components/UIComponents'
import { IFieldProps } from '#/editor'
import { ComponentConfigProps, ComponentConfigType } from '#/components'

export default defineComponent({
  name: 'PropConfig',
  setup() {
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
        formContent.push(
          <>
            <el-form-item label="字段ID">
              <el-input value={currentField.value._id} disabled={true} />
            </el-form-item>
          </>
        )

        // 引入配置 props
        const propsConfig = uiComponents[currentField.value.type]
        Object.entries(propsConfig.props).forEach(([key, config]) => {
          formContent.push(
            fieldPropsRenderer(
              key as keyof IFieldProps,
              config as ComponentConfigProps,
              currentField.value?.props as IFieldProps
            )
          )
        })
      }

      return (
        <>
          <el-form label-width="80px" label-position="left">
            {formContent}
          </el-form>
        </>
      )
    }

    return <FormRenderer />
  }
})