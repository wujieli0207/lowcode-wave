export interface ILayoutSlotsResult {
  key: string
  span: number // 比例
}

/**
 *
 * @param colRadio col 比例，如 12:12 表示创建两个 col，每个 col 占 12 个格栅
 * @description 创建一个 slot 结构
 */
export function createLayoutSlots(colRadio: string): ILayoutSlotsResult[] {
  const result: ILayoutSlotsResult[] = []
  colRadio.split(':').forEach((item, index) => {
    result.push({
      key: `slot${index}`,
      span: Number(item)
    })
  })
  return result
}
