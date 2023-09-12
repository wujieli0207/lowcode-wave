import { IFieldConfig } from '#/editor'
import { UI_VL } from '@/constant/componentConstant'

export interface ITreeData {
  label: string
  children: ITreeData[]
}

/**
 * @description 获取属性结构数据,增加树形结构数据 label 名称
 */
export function getTreeWithLabel(treeData: IFieldConfig[]) {
  const result: ITreeData[] = []

  treeData.forEach((item) => {
    result.push({
      label: UI_VL[item.type],
      children: item.children && item.children.length > 0 ? getTreeWithLabel(item.children) : []
    })
  })

  return result
}
