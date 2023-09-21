import { computed } from 'vue'
import { ElInput, ElInputNumber, ElSelect, ElOption, ElSwitch, ElFormItem } from 'element-plus'
import { BasicHelp } from '@/components/Basic'
import { ComponentConfigProps, ComponentConfigType } from '#/components'
import { IFieldConfig } from '#/editor'
import styles from './index.module.scss'
import { isFunction } from 'lodash-es'

export interface IUpdateValueFnParams {
  value: string | number | boolean
  key: string
  field: IFieldConfig
}

/**
 *
 * @param key 属性key
 * @param config
 * @param propsObj
 * @param currentField
 * @description 右侧面板属性转换为 formItem 渲染器
 */
const FormItemConfigRenderer = (
  key: string,
  config: ComponentConfigProps,
  propsObj: Record<string, unknown>,
  currentField: IFieldConfig,
  updateValueFn?: (value: IUpdateValueFnParams) => void
): JSX.Element => {
  let element
  const { type, label, tips, options, defaultValue, labelWidth } = config

  if (defaultValue) {
    // 此处类型定义有问题，暂时忽略
    // @ts-ignore
    propsObj[key] = defaultValue
  }

  const modelValue = computed({
    get: () => propsObj[key],
    set: (value) => {
      if (isFunction(updateValueFn)) {
        const params: IUpdateValueFnParams = {
          value: value as string | number | boolean,
          key,
          field: currentField
        }

        updateValueFn(params)
      } else {
        propsObj[key] = value
      }
    }
  })

  if (type === ComponentConfigType.INPUT) {
    element = <ElInput v-model={modelValue.value} placeholder={label} />
  }
  if (type === ComponentConfigType.INPUT_NUMBER) {
    element = <ElInputNumber v-model={modelValue.value} placeholder={label} />
  }
  if (type === ComponentConfigType.SELECT) {
    element = (
      <ElSelect v-model={modelValue.value} placeholder={label}>
        {(options || []).map((option) => {
          return <ElOption label={option.label} value={option.value} />
        })}
      </ElSelect>
    )
  }
  if (type === ComponentConfigType.SWITCH) {
    const { activeText = '', inactiveText = '' } = config
    element = (
      <ElSwitch
        v-model={modelValue.value}
        inline-prompt={true}
        activeText={activeText}
        inactiveText={inactiveText}
      />
    )
  }

  return (
    <ElFormItem label-width={labelWidth}>
      {{
        label: () => (
          <div class={styles['label']}>
            <span>{label}</span>
            {tips && <BasicHelp content={tips} />}
          </div>
        ),
        default: () => element
      }}
    </ElFormItem>
  )
}

export default FormItemConfigRenderer
