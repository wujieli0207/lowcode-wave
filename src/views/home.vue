<template>
  <el-container class="container">
    <el-header>
      <toolbar />
    </el-header>

    <el-container>
      <left-panel v-if="!globalConfig.isPreview" />
      <edit-view />
      <right-panel v-if="!globalConfig.isPreview" />
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { useGlobalConfigStore } from '@/stores/modules/globalConfig'
import Toolbar from './toolbar/index.vue'
import LeftPanel from './left-panel/index.vue'
import EditView from './edit-view/index.vue'
import RightPanel from './right-panel/index.vue'

const { globalConfig } = useGlobalConfigStore()
</script>

<style scoped lang="scss">
.container {
  height: 100%;
}
</style>
