<template>
  <div class="drag-slot">
    {{ name }}
  </div>
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    default: '内容区'
  }
})
</script>

<style scoped lang="scss">
.drag-slot {
  width: 100%;
  height: 100%;
  padding: 1px;
  text-align: center;
  vertical-align: middle;
  background: #928c8c;
}
</style>
