<template>
  <basic-code-editor :value="editorValue" :options="options" @change="handleChange" />
</template>

<script lang="ts" setup>
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import BasicCodeEditor from './BasicCodeEditor.vue'
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

self.MonacoEnvironment = {
  getWorker(workerId, label) {
    if (label === 'json') {
      return new JsonWorker()
    }
    return new EditorWorker()
  }
}

const props = defineProps({
  value: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:value', 'change'])
const editorValue = useVModel(props, 'value', emit)
const options = computed(() => {
  return {
    language: 'sql',
    theme: 'vs-light',
    formatOnType: true,
    formatOnPaste: true,
    automaticLayout: true,
    selectOnLineNumbers: true,
    scrollBeyondLastLine: false,
    minimap: {
      enabled: false
    },
    folding: true,
    bracketPairColorization: {
      enabled: true
    }
  }
})

function handleChange(value: string, event) {
  emit('change', value, event)
}
</script>
