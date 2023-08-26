<template>
  <Draggable
    v-model="list"
    v-bind="{ ...defaultDragOptions, ...$attrs }"
    :item-key="itemKey"
    :group="group"
    @start="isDrug = true"
    @end="isDrug = false"
  >
    <template #item="item">
      <div>
        <slot name="item" v-bind="item"></slot>
      </div>
    </template>
  </Draggable>
</template>

<script lang="ts" setup>
import Draggable from 'vuedraggable'
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

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
  }
})

const emit = defineEmits(['update:moduleValue', 'update:drag'])

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
</script>
