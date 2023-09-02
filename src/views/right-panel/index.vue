<template>
  <div :class="`right-panel ${isRightPanelOpen ? 'is-open' : ''}`">
    <div class="right-panel__float-btn" @click="handleClickFloatBtn">
      <el-icon>
        <DArrowRight v-if="isRightPanelOpen" />
        <DArrowLeft v-else />
      </el-icon>
    </div>

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
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
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
const isRightPanelOpen = ref(true)

function handleClickFloatBtn() {
  isRightPanelOpen.value = !isRightPanelOpen.value
}
</script>

<style scoped lang="scss">
$--border-left: 1px solid #e6e6e8;
$--box-shadow: -2px 0 4px 0 rgba(0, 0, 0, 0.1);
.right-panel {
  height: 100%;
  width: 0;
  border-left: $--border-left;
  box-shadow: $--box-shadow;
  transform: translateX(100%);

  &.is-open {
    transform: translateX(0%);
    min-width: 280px;
  }

  .right-panel__tabs {
    height: 100%;
    width: 100%;
  }

  .right-panel__float-btn {
    position: absolute;
    top: 50%;
    transform: translateX(-16px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 80px;
    cursor: pointer;
    background-color: #fff;
    border-radius: 10px 0 0 10px;
    box-shadow: $--box-shadow;
    border-left: $--border-left;
  }
}
</style>
