<template>
  <div>
    <div class="basic-help">
      <el-tooltip placement="top" effect="dark">
        <template #content>
          <p v-for="(item, index) in getContentList" :key="item" :style="getTooltipStyle">
            <span v-if="showIndex">
              {{ index + 1 }}
            </span>
            <span>
              {{ item }}
            </span>
          </p>
        </template>

        <el-icon>
          <Warning />
        </el-icon>
      </el-tooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue'
import { isString, isArray } from 'lodash-es'
import { Warning } from '@element-plus/icons-vue'

const props = defineProps({
  content: {
    type: [Array, String] as PropType<string[] | string>,
    default: ''
  },
  placement: {
    type: String,
    default: 'right'
  },
  color: {
    type: String,
    default: ''
  },
  fontSize: {
    type: String,
    default: '14px'
  },
  showIndex: {
    type: Boolean,
    default: false
  }
})

const getTooltipStyle = computed(() => {
  return {
    color: props.color,
    fontSize: props.fontSize
  }
})

const getContentList = computed((): string[] => {
  const textList = props.content

  if (isString(textList)) {
    return [textList]
  }

  if (isArray(textList)) {
    return textList
  }

  return ['']
})
</script>
