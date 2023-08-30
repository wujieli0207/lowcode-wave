<template>
  <draggable-transition-group
    v-model="slotChildren"
    v-model:drag="isDrag"
    :data-slot="`插槽拖拽组件到此处`"
  >
    <template #item="{ element: slotElement }">
      {{ slotElement }}
    </template>
  </draggable-transition-group>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { useVModel } from '@vueuse/core'
import { DraggableTransitionGroup } from '@/components/Drag'
import { IFieldConfig } from '#/editor'

const props = defineProps({
  children: {
    type: Array as PropType<IFieldConfig[]>,
    required: true
  },
  drag: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:children', 'update:drag'])

const slotChildren = useVModel(props, 'children', emit)
console.log('slotChildren: ', slotChildren.value)
const isDrag = useVModel(props, 'drag', emit)
</script>
