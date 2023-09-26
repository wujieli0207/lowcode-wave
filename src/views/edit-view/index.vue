<template>
  <div class="edit">
    {{ currentField }}
    <div class="edit__page-name">
      <editor-header />
    </div>

    <div class="edit_page-content">
      <draggable-transition-group
        :module-value="currentPage.children"
        class="edit__drag-group"
        @change="handleOnChange"
      >
        <template #item="{ element }">
          <!-- 非容器组件，需要添加遮罩避免点击组件 -->
          <div
            class="edit__drag-group__item"
            :class="{
              focus: !globalConfig.isPreview && element.isFocus,
              overlay: !globalConfig.isPreview && !getIsContainerComponent(element)
            }"
            @mousedown="(payload) => handleSelectComponent(element, payload)"
          >
            <render-comp :element="element" :page-children="currentPage.children">
              <template #default>
                <render-slot-item
                  :children="element.children"
                  :page-children="currentPage.children"
                  :parrent-element="element"
                  slot-key="default"
                  :select-component-fn="handleSelectComponent"
                />
              </template>
            </render-comp>
          </div>
        </template>
      </draggable-transition-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { DraggableTransitionGroup } from '@/components/Drag'
import RenderComp from './components/RenderComp'
import RenderSlotItem from './components/RenderSlotItem.vue'
import EditorHeader from './components/EditorHeader'
import { useGlobalConfigStore } from '@/stores/modules/globalConfig'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import type { IFieldConfig } from '#/editor'
import { getIsContainerComponent } from './utils'
import { VueDraggableChangeEvent } from '#/plugin'

const { globalConfig } = useGlobalConfigStore()

const jsonConfigStore = useJsonConfigStore()
const { currentPage, currentField } = storeToRefs(jsonConfigStore)
const { setCurrentFiled, addPageChildrenByDrag } = jsonConfigStore

function handleSelectComponent(element: IFieldConfig, payload: MouseEvent) {
  // 如果不是 div 元素，说明点击的是 toolbar 的操作按钮，一般是 svg，不需要处理
  // 如果是预览模式，也不需要处理
  if (!(payload.target instanceof HTMLDivElement) || globalConfig.isPreview) {
    return
  }

  setCurrentFiled(element)
}

function handleOnChange(value: VueDraggableChangeEvent) {
  addPageChildrenByDrag(value)
}
</script>

<style scoped lang="scss">
@import './styles/index.scss';

.edit {
  height: calc(100vh - 50px);
  width: 100%;

  .edit__page-name {
    display: flex;
    align-items: center;
    background: #fff;
    height: 40px;
    margin-left: 16px;
    border-bottom: 1px solid #e8e9eb;
  }

  .edit_page-content {
    height: 100%;
    padding: 24px 16px;
    background: #f2f2f4;

    .edit__drag-group {
      background: #fff;
      height: 100%;
    }
  }
}
</style>
