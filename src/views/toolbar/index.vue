<template>
  <div class="toolbar">
    <div class="toolbar__title">
      <h2>LowcodeWave</h2>
    </div>

    <!-- 中间操作按钮 -->
    <div class="toolbar__handle">
      <ToolbarHandle />
    </div>

    <!-- 右侧编辑按钮 -->
    <div class="toolbar__action">
      <toolbar-action />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ToolbarHandle from './components/ToolbarHandle'
import ToolbarAction from './components/ToolbarAction'
</script>

<style scoped lang="scss">
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;

  &::before {
    position: fixed;
    height: 50px;
    content: '';
    z-index: -1;
    left: 0;
    right: 0;
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
