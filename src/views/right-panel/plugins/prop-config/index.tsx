import { computed, defineComponent, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import uiComponents from '@/components/UIComponents'
import { IFieldConfig, IFieldProps } from '#/editor'
import { ComponentConfigProps, ComponentConfigType } from '#/components'
import styles from './index.module.scss'
import { BasicHelp } from '@/components/Basic'
import { initActiveCollapse, handleUpdateFieldProps, handleUpdateFieldCode } from './utils'

export default defineComponent({
  key: 'PropConfigPlugin',
  label: '属性',
  order: 1,
  setup() {
    const jsonConfigStore = useJsonConfigStore()

    const { currentField } = storeToRefs(jsonConfigStore)

    const activeCollapse = ref(initActiveCollapse(currentField.value))

    const fieldPropsRenderer = (
      propKey: keyof IFieldProps,
      config: ComponentConfigProps,
      propsObj: IFieldProps,
      currentField: IFieldConfig
    ): JSX.Element => {
      let element
      const { type, label, tips, options, defaultValue, labelWidth } = config

      if (defaultValue) {
        // 此处类型定义有问题，暂时忽略
        // @ts-ignore
        propsObj[propKey] = defaultValue
      }

      const modelValue = computed({
        get: () => propsObj[propKey],
        set: (value) => {
          handleUpdateFieldProps({ value, propKey, field: currentField })
        }
      })

      if (type === ComponentConfigType.INPUT) {
        element = <el-input v-model={modelValue.value} placeholder={label} />
      }
      if (type === ComponentConfigType.INPUT_NUMBER) {
        element = <el-input-number v-model={modelValue.value} placeholder={label} />
      }
      if (type === ComponentConfigType.SELECT) {
        element = (
          <el-select v-model={modelValue.value} placeholder={label}>
            {(options || []).map((option) => {
              return <el-option label={option.label} value={option.value} />
            })}
          </el-select>
        )
      }
      if (type === ComponentConfigType.SWITCH) {
        element = <el-switch v-model={modelValue.value} />
      }

      return (
        <el-form-item label-width={labelWidth}>
          {{
            label: () => (
              <div class={styles['prop-config-panel__label']}>
                <span>{label}</span>
                {tips && <BasicHelp content={tips} />}
              </div>
            ),
            default: () => element
          }}
        </el-form-item>
      )
    }

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
                  return fieldPropsRenderer(
                    key as keyof IFieldProps,
                    config as ComponentConfigProps,
                    currentField.value?.props as IFieldProps,
                    currentField.value!
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
