<template>
  <div :class="`left-panel`">
    <div class="left-panel__float-btn" @click="handleClickFloatBtn">
      <el-icon>
        <DArrowLeft v-if="isLeftPanelOpen" />
        <DArrowRight v-else />
      </el-icon>
    </div>

    <el-tabs
      v-model="activeTab"
      tab-position="left"
      :class="`left-panel__tabs ${isLeftPanelOpen ? 'is-open' : ''}`"
    >
      <el-tab-pane v-for="plugin in pluginsList" :key="plugin.key" :name="plugin.key">
        <template #label>
          <el-tooltip :content="plugin.label" placement="right">
            <el-icon :size="20">
              <component :is="plugin.icon" />
            </el-icon>
          </el-tooltip>
        </template>

        <component :is="plugin.setup()" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import plugins from './plugins'

const pluginsList = Object.values(plugins).sort((a, b) => a.order - b.order)
const activeTab = ref(pluginsList[0].key)
const isLeftPanelOpen = ref(true)

function handleClickFloatBtn() {
  isLeftPanelOpen.value = !isLeftPanelOpen.value
}
</script>

<style scoped lang="scss">
$--border: 1px solid #e6e6e8;
$--box-shadow: 2px 0 4px 0 rgba(0, 0, 0, 0.1);

.left-panel {
  height: 100%;
  position: relative;
  border-right: $--border;
  box-shadow: $--box-shadow;

  .left-panel__tabs {
    height: calc(100vh - 50px); // 50px 的 toolbar
    width: 40px;

    &.is-open {
      width: 400px;
    }
  }

  .left-panel__float-btn {
    position: absolute;
    top: 50%;
    right: -16px;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 80px;
    cursor: pointer;
    background-color: #fff;
    border-radius: 0 10px 10px 0;
    border-right: $--border;
    box-shadow: $--box-shadow;
  }
}
</style>
