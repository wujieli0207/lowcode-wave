<template>
  <div class="edit">
    <div class="edit__page-name">页面：{{ currentPage.pageName }}</div>

    <div class="edit_page-content">
      <draggable-transition-group v-model="currentPage.children" class="edit__drag-group">
        <template #item="{ element }">
          <div
            class="edit__drag-group__item"
            :class="{ focus: element.isFocus }"
            @mousedown="handleSelectComponent(element)"
          >
            <render-comp :element="element">
              <template v-for="key in element.children" :key="key" #[key]>
                <render-slot-item v-model:children="element.children" :slot-key="key" />
              </template>

              <template v-for="slotItem in element.slots" :key="slotItem.key" #[slotItem.key]>
                <render-slot-item v-model:children="element.slots" :slot-key="slotItem.key" />
              </template>
            </render-comp>
          </div>
        </template>
      </draggable-transition-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DraggableTransitionGroup } from '@/components/Drag'
import RenderComp from './components/RenderComp'
import RenderSlotItem from './components/RenderSlotItem.vue'
import { useJsonConfigStore } from '@/stores/modules/jsonConfig'
import type { IFieldConfig } from '#/editor'
import { storeToRefs } from 'pinia'
import { toRefs, ref } from 'vue'
import type { Ref } from 'vue'

let prevSelectComponent: Ref<Nullable<IFieldConfig>> = ref(null)

const jsonConfigStore = useJsonConfigStore()

const { jsonConfig } = storeToRefs(jsonConfigStore)
const { currentPage } = toRefs(jsonConfig.value)

const { setCurrentFiled } = jsonConfigStore

function handleSelectComponent(element: IFieldConfig) {
  setCurrentFiled(element)
  handleSetFocus(element, prevSelectComponent)

  prevSelectComponent.value = element
}

/**
 *
 * @description 设置组件是否被选中，pure
 */
function handleSetFocus(element: IFieldConfig, prevSelectComponent: Ref<Nullable<IFieldConfig>>) {
  element.isFocus = true

  if (prevSelectComponent.value) {
    prevSelectComponent.value.isFocus = false
  }
}
</script>

<style scoped lang="scss">
.edit {
  height: calc(100vh - 50px);
  width: 100%;

  //

  .edit__page-name {
    background: #fff;
    height: 40px;
    margin-left: 16px;
    border-bottom: 1px solid #e8e9eb;
    vertical-align: middle;
    line-height: 40px;
  }

  .edit_page-content {
    height: 100%;
    padding: 16px;
    background: #f2f2f4;

    .edit__drag-group {
      background: #fff;
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

        &.focus {
          border: 1px solid red;
        }
      }
    }
  }
}
</style>
