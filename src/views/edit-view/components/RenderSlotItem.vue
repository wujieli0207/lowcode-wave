<template>
  <draggable-transition-group v-model="slotChildren" v-model:drag="isDrag">
    <template #item="{ element: slotElement }">
      <!-- <render-comp :element="slotElement"> </render-comp> -->
      <drag-slot :name="slotElement.name" />
    </template>
  </draggable-transition-group>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { useVModel } from '@vueuse/core'
import { DraggableTransitionGroup, DragSlot } from '@/components/Drag'
import RenderComp from './RenderComp'
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
