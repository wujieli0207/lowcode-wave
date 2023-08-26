<template>
  <div class="left-panel">
    <div>
      <template v-for="plugin in pluginsList" :key="plugin.key">
        <el-tabs v-model="activeTab" tab-position="left" class="left-panel__tabs">
          <el-tab-pane :name="plugin.key">
            <template #label>
              <el-tooltip :content="plugin.label" placement="right">
                <el-icon :size="20">
                  <component :is="plugin.icon" />
                </el-icon>
              </el-tooltip>
            </template>

            <component :is="plugin.setup" />
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import plugins from './plugins'

const pluginsList = Object.values(plugins).sort((a, b) => a.order - b.order)
const activeTab = ref(pluginsList[0].key)
</script>

<style scoped lang="scss">
.left-panel {
  height: 100%;
  border-right: 1px solid #e6e6e8;

  .left-panel__tabs {
    // height: 100%;
  }
}
</style>
