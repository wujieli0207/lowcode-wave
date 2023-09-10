import { IFieldConfig } from '#/editor'

/**
 *
 * @description 返回被选中节点(isFocus = true) 整条链路的节点
 */
export function findFocusedParents(
  tree: IFieldConfig[],
  path: IFieldConfig[] = [],
  focusedId: string | null = null
): IFieldConfig[] {
  const result: IFieldConfig[] = []

  for (const node of tree) {
    const currentPath = [...path, node]
    const currentNodeIsFocus = node._id === focusedId || node.isFocus

    if (currentNodeIsFocus) {
      // 当前节点具有 isFocus 属性为 true，将其信息添加到结果数组中
      result.push(...currentPath)
    }

    if (node.children && node.children.length > 0) {
      // 递归查找子节点
      result.push(
        ...findFocusedParents(node.children, currentPath, currentNodeIsFocus ? node._id : focusedId)
      )
    }
  }

  return result
}
