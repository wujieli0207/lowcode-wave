<template>
  <div class="edit">
    {{ jsonConfig }}
    <draggable-transition-group v-model="currentPage.childrens" class="edit__drag-group">
      <template #item="{ element }">
        <div class="edit__drag-group__item" @mousedown="handleSelectComponent(element)">
          <render-comp :element="element" />
        </div>
      </template>
    </draggable-transition-group>
  </div>
</template>

<script lang="ts" setup>
import { DraggableTransitionGroup } from '@/components/Drag'
import RenderComp from './components/RenderComp'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import type { IFieldConfig } from '#/editor'
import { storeToRefs } from 'pinia'
import { toRefs } from 'vue'

const jsonConfigStore = useJsonConfigStore()

const { jsonConfig } = storeToRefs(jsonConfigStore)
const { currentPage } = toRefs(jsonConfig.value)

const { setCurrentFiled } = jsonConfigStore

function handleSelectComponent(element: IFieldConfig) {
  setCurrentFiled(element)
}
</script>

<style scoped lang="scss">
.edit {
  height: calc(100vh - 50px);
  width: 100%;

  .edit__drag-group {
    height: 100%;

    .edit__drag-group__item {
      position: relative;
      cursor: move;

      &::before {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
      }
    }
  }
}
</style>
