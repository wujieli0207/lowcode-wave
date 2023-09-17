import { enablePatches, applyPatches, produceWithPatches, Patch, Objectish } from 'immer'
import { isFunction } from 'lodash-es'
import { computed, ref } from 'vue'

enablePatches()

interface IUndoStackItem {
  action: string // 操作名称
  actionTime: Date // 操作时间
  patches: Patch[]
  inversePatches: Patch[]
}

interface IUpdateOptions {
  callback?: (patches: Patch[], inversePatches: Patch[]) => void // 回调函数
}

const useHistory = <T extends Objectish>(baseState: T) => {
  // 历史记录
  const undoStack = ref<IUndoStackItem[]>([])
  // 当前索引
  const undoStackPointer = ref(-1)
  // 是否开启记录
  const undoable = ref(false)

  const state = ref(baseState)

  /**
   * @description 撤销任务数量统计
   */
  const undoCount = computed(() => undoStackPointer.value + 1)

  /**
   * @description 重做任务数量统计
   */
  const redoCount = computed(() => undoStack.value.length - undoStackPointer.value - 1)

  /**
   * @description 判断是否禁止撤销
   */
  const undoDisabled = computed(() => undoStackPointer.value < 0)

  /**
   * @description 判断是否禁止重做
   */
  const redoDisabled = computed(() => undoStackPointer.value >= undoStack.value.length - 1)

  /**
   *
   * @param value 是否开启记录
   */
  function enable(value = true) {
    undoable.value = value
  }

  function update(updater: (draft: T) => any, action: string, options: IUpdateOptions = {}) {
    const { callback } = options
    const [nextState, patches, inversePatches] = produceWithPatches(state.value, updater)

    state.value = nextState

    if (undoable.value && patches.length && inversePatches.length) {
      const pointer = ++undoStackPointer.value
      undoStack.value.length = pointer
      undoStack.value.push({
        action,
        actionTime: new Date(),
        patches,
        inversePatches
      })
    }

    if (isFunction(callback)) {
      callback(patches, inversePatches)
    }
  }

  /**
   * @description 撤销操作
   */
  function undo() {
    if (undoDisabled.value) return

    const { inversePatches } = undoStack.value[undoStackPointer.value]
    state.value = applyPatches(state.value, inversePatches)
    undoStackPointer.value--
  }

  /**
   * @description 重做操作
   */
  function redo() {
    if (redoDisabled.value) return

    undoStackPointer.value++
    const { patches } = undoStack.value[undoStackPointer.value]
    state.value = applyPatches(state.value, patches)
  }

  /**
   * @description 跳转到指定的历史记录
   */
  function jumpTo(index: number) {
    if (index < 0 || index > undoStack.value.length - 1 || index === undoStackPointer.value) return

    const result: Patch[] = []
    // 撤销操作
    if (index < undoStackPointer.value) {
      for (let i = index + 1; i <= undoStackPointer.value; i++) {
        const { inversePatches } = undoStack.value[i]
        result.unshift(...inversePatches)
      }
    }
    // 重做操作
    else {
      for (let i = undoStackPointer.value + 1; i <= index; i++) {
        const { patches } = undoStack.value[i]
        result.push(...patches)
      }
    }

    state.value = applyPatches(state.value, result)
    undoStackPointer.value = index
  }

  return {
    state,
    undoCount,
    redoCount,
    undoDisabled,
    redoDisabled,
    undoStack,
    enable,
    update,
    undo,
    redo,
    jumpTo
  }
}

export default useHistory
