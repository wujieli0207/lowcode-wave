import { enablePatches, applyPatches, produceWithPatches, Patch, Objectish } from 'immer'
import { computed, ref, shallowRef } from 'vue'

enablePatches()

interface IUndoStackItem {
  patches: Patch[]
  inversePatches: Patch[]
}

export const useHistory = <T extends Objectish>(baseState: T) => {
  // 历史记录
  const undoStack = ref<IUndoStackItem[]>([])
  // 当前索引
  const undoStackPointer = ref(-1)
  // 是否开启记录
  const undoable = ref(false)

  const state = shallowRef(baseState)

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

  function undate(updater: (draft: T) => any) {
    const [nextState, patches, inversePatches] = produceWithPatches(state.value, updater)

    state.value = nextState

    if (undoable.value && patches.length && inversePatches.length) {
      const pointer = ++undoStackPointer.value
      undoStack.value.length = pointer
      undoStack.value.push({ patches, inversePatches })
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

  return {
    undoCount,
    redoCount,
    undoDisabled,
    redoDisabled,
    enable,
    undate,
    undo,
    redo
  }
}
