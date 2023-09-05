import { IPageConfig } from '#/editor'
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'

export function handleExportJSON(currentPage: IPageConfig) {
  console.log('handleExportJSON 待实现: ')
  const { copy } = useClipboard({ source: JSON.stringify(currentPage) })

  copy()
    .then(() => {
      ElMessage.success('复制成功')
    })
    .catch((error) => {
      ElMessage.error(`复制失败:${error}`)
    })
}
