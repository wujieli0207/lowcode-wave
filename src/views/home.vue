<template>
  <el-container class="container">
    <el-header>
      <toolbar />
    </el-header>

    <el-container>
      <left-panel />

      <edit-view />

      <right-panel />
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Toolbar from './toolbar/index.vue'
import LeftPanel from './left-panel/index.vue'
import EditView from './edit-view/index.vue'
import RightPanel from './right-panel/index.vue'
</script>

<style scoped lang="scss">
.container {
  height: 100%;
}
</style>
