<template>
  <div class="right-panel">
    <el-tabs v-model="activeTab" class="right-panel__tabs">
      <el-tab-pane
        v-for="item in RightPanel"
        :key="item.value"
        :label="item.label"
        :name="item.value"
      >
        <component :is="item.component.setup" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PropConfig from './plugins/prop-config'
import StyleConfig from './plugins/style-config'
import EventConfig from './plugins/event-config'

const RightPanel = [
  {
    label: '属性',
    value: 'prop',
    component: PropConfig
  },
  {
    label: '样式',
    value: 'style',
    component: StyleConfig
  },
  {
    label: '事件',
    value: 'event',
    component: EventConfig
  }
]

const activeTab = ref(RightPanel[0].value)
</script>

<style scoped lang="scss">
.right-panel {
  height: 100%;
  border-left: 1px solid #e6e6e8;

  .right-panel__tabs {
    height: 100%;
  }
}
</style>
