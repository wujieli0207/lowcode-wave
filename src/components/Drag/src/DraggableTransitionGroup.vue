<template>
  <Draggable
    v-model="list"
    v-bind="{ ...defaultDragOptions, ...$attrs }"
    :item-key="itemKey"
    :group="group"
    :clone="clone"
    @start="isDrug = true"
    @end="isDrug = false"
    @change="handleChange"
  >
    <template #item="item">
      <div>
        <slot name="item" v-bind="item"></slot>
      </div>
    </template>

    <template #header>
      <slot name="header"></slot>
    </template>
  </Draggable>
</template>

<script lang="ts" setup>
import Draggable from 'vuedraggable'
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'
import { PropType } from 'vue'
import { VueDraggableChangeEvent } from '#/plugin'

defineOptions({
  name: 'DraggableTransitionGroup'
})

const props = defineProps({
  moduleValue: {
    type: Array,
    default: () => []
  },
  drag: {
    type: Boolean,
    default: false
  },
  itemKey: {
    type: String,
    default: '_vid'
  },
  group: {
    type: Object,
    default: () => ({ name: 'components' })
  },
  clone: {
    type: Function as PropType<(original: any) => any>,
    default: () => {}
  }
})

const emit = defineEmits(['update:moduleValue', 'update:drag', 'change'])

const list = useVModel(props, 'moduleValue', emit)
const isDrug = useVModel(props, 'drag', emit)

const defaultDragOptions = computed(() => {
  return {
    animation: 200,
    disabled: false,
    scroll: true,
    ghostClass: 'ghost'
  }
})

function handleChange(value: VueDraggableChangeEvent) {
  emit('change', value, list.value)
}
</script>
