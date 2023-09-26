import { useGlobalConfigStore } from '@/stores/modules/globalConfig'
import { ElMessage } from 'element-plus'

const { togglePreview } = useGlobalConfigStore()

/**
 * @description: 返回编辑状态
 */
export function handleGoBackEdit() {
  togglePreview(false)
}

export function handlePreview() {
  togglePreview(true)
}

export function handleSave() {
  console.log('handleSave 待实现: ')
  ElMessage({
    message: '请期待',
    type: 'info'
  })
}
