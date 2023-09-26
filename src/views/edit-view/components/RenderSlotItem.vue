<template>
  <draggable-transition-group
    :module-value="slotChildren"
    class="slot-renderer"
    @change="handleOnChange"
  >
    <template #item="{ element: slotElement }">
      <div
        class="edit__drag-group__item"
        :class="{
          focus: !globalConfig.isPreview && slotElement.isFocus,
          overlay: !globalConfig.isPreview && !getIsContainerComponent(slotElement)
        }"
        @mousedown="(payload) => handleSelect(slotElement, payload)"
      >
        <render-comp :element="slotElement" :page-children="pageChildren">
          <template #default>
            <render-slot-item
              :children="slotElement.children"
              :page-children="pageChildren"
              :parrent-element="slotElement"
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
import { computed, PropType } from 'vue'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import { DraggableTransitionGroup } from '@/components/Drag'
import RenderComp from './RenderComp'
import { IFieldConfig } from '#/editor'
import { getIsContainerComponent } from '../utils'
import { VueDraggableChangeEvent } from '#/plugin'
import { useGlobalConfigStore } from '@/stores/modules/globalConfig'

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
  // 父节点
  parrentElement: {
    type: Object as PropType<IFieldConfig>,
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

const { globalConfig } = useGlobalConfigStore()

const jsonConfigStore = useJsonConfigStore()

const { addPageNestChildrenByDrag } = jsonConfigStore

const slotChildren = computed(() => {
  return props.children
})

function handleSelect(element: IFieldConfig, payload: MouseEvent) {
  payload.stopPropagation()

  props.selectComponentFn(element, payload)
}

function handleOnChange(value: VueDraggableChangeEvent) {
  addPageNestChildrenByDrag(value, props.parrentElement)
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
