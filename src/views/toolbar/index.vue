<template>
  <div class="toolbar">
    <div class="toolbar__title">
      <h2>Toolbar</h2>
    </div>

    <div>
      <el-button type="primary" @click="handlePreview">预览</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
function handlePreview() {
  console.log('待实现: ')
}
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
