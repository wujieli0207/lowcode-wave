<template>
  <draggable-transition-group v-model="slotChildren" v-model:drag="isDrag" class="slot-renderer">
    <template #item="{ element: slotElement }">
      <div
        class="edit__drag-group__item"
        :class="{
          focus: slotElement.isFocus,
          overlay: !getIsContainerComponent(slotElement)
        }"
        @mousedown="(payload) => handleSelect(slotElement, payload)"
      >
        <render-comp :element="slotElement" :page-children="pageChildren">
          <template #default>
            <render-slot-item
              v-model:children="slotElement.children"
              :pageChildren="pageChildren"
              slot-key="default"
              :select-component-fn="selectComponentFn"
            />
          </template>
        </render-comp>
      </div>
    </template>
    <template v-if="slotChildren.length === 0" #header>
      <div class="slot-renderer__tips">组件 （{{ slotKey }}） 拖拽到此处渲染</div>
    </template>
  </draggable-transition-group>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { useVModel } from '@vueuse/core'
import { DraggableTransitionGroup } from '@/components/Drag'
import RenderComp from './RenderComp'
import { IFieldConfig } from '#/editor'
import { getIsContainerComponent } from '../utils'

const props = defineProps({
  // 插槽子节点
  children: {
    type: Array as PropType<IFieldConfig[]>,
    required: true
  },
  // 当前页面的子节点
  pageChildren: {
    type: Array as PropType<IFieldConfig[]>,
    required: true
  },
  drag: {
    type: Boolean,
    default: false
  },
  slotKey: {
    type: [String, Number],
    default: ''
  },
  selectComponentFn: {
    type: Function as PropType<(element: IFieldConfig, payload: MouseEvent) => void>,
    required: true
  }
})

const emit = defineEmits(['update:children', 'update:drag'])

const slotChildren = useVModel(props, 'children', emit)
const isDrag = useVModel(props, 'drag', emit)

function handleSelect(element: IFieldConfig, payload: MouseEvent) {
  payload.stopPropagation()

  props.selectComponentFn(element, payload)
}
</script>

<style scoped lang="scss">
@import '../styles/index.scss';

.slot-renderer {
  min-height: 32px;
  margin: 2px;
  border: 1px dashed #ccc;
  background: #fafafa;

  .slot-renderer__tips {
    font-size: 12px;
    text-align: center;
    line-height: 32px;
    vertical-align: middle;
  }
}
</style>
