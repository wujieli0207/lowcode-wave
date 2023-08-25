<template>
  <el-container>
    <el-header>
      <toolbar />
    </el-header>

    <el-container>
      <el-aside width="200px">
        <left-panel />
      </el-aside>

      <el-container>
        <edit-view />
        <right-panel />
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Toolbar from './toolbar/index.vue'
import LeftPanel from './left-panel/index.vue'
import EditView from './edit-view/index.vue'
import RightPanel from './right-panel/index.vue'
</script>
