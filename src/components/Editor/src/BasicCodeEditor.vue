<template>
  <div ref="editorRef" :style="getStyles"></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { ref } from 'vue'
import * as monaco from 'monaco-editor'
import IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor
import { onUnmounted } from 'vue'
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: String,
    default: '{}'
  },
  options: {
    type: Object,
    default: () => {}
  },
  width: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:value', 'change'])

const getStyles = computed(() => {
  return {
    width: props.width || '100%',
    height: props.height || '100%'
  }
})

const editorRef = ref<HTMLElement>()
let inputEditor: IStandaloneCodeEditor

onMounted(() => {
  if (editorRef.value) {
    inputEditor = monaco.editor.create(editorRef.value, {
      value: props.value,
      ...props.options
    })
  }

  if (inputEditor) {
    inputEditor.onDidChangeModelContent((event) => {
      const value = inputEditor.getValue()
      if (value !== props.value) {
        emit('change', value, event)
        emit('update:value', value)
      }
    })
  }
})

onUnmounted(() => {
  if (inputEditor) {
    inputEditor.dispose()
  }
})
</script>
