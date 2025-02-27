<template>
  <div id="vditor" class="vditor" />
</template>

<script lang="ts" setup>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { saveSvgStr } from '@/views/Question/AddQuestion/save'

import { onMounted, onUnmounted } from 'vue'

const emits = defineEmits(['save-handler'])

const isMobile = window.innerWidth < 960
let vditor: any

const initVditor = () => {
  const options = {
    width: '100%',
    height: 'calc(100vh - 190px)',
    tab: '\t',
    counter: '999999',
    typewriterMode: true,
    mode: 'sv',
    preview: {
      delay: 100,
      show: !isMobile,
      actions: []
    },
    toolbar: [
      'emoji',
      'headings',
      'bold',
      'italic',
      'strike',
      'link',
      '|',
      'list',
      'ordered-list',
      'check',
      'outdent',
      'indent',
      '|',
      'quote',
      'line',
      'code',
      'inline-code',
      'insert-before',
      'insert-after',
      '|',
      'upload',
      'record',
      'table',
      '|',
      'undo',
      'redo',
      '|',
      'fullscreen',
      'edit-mode',
      {
        hotkey: '⇧⌘S',
        name: 'sponsor',
        tipPosition: 's',
        tip: '保存',
        className: 'right',
        icon: saveSvgStr,
        click() {
          const value = vditor.getValue()
          emits('save-handler', value)
        }
      }
    ],
    outline: true
  }

  vditor = new Vditor('vditor', options as any)
  console.log('vditor.value', vditor)
}

onMounted(initVditor)

onUnmounted(() => {
  vditor?.clearCache()
})
</script>

<style lang="less" scoped>
.vditor {
  position: absolute;

  .vditor-toolbar {
    border-left: 1px solid #d1d5da;
    border-right: 1px solid #d1d5da;
  }

  .vditor-content {
    height: auto;
    min-height: auto;
    border: 1px solid #d1d5da;
    border-top: none;
  }
}

.vditor-reset {
  font-size: 14px;
}

.vditor-textarea {
  font-size: 14px;
  height: 100% !important;
}

@media (max-width: 960px) {
  .index-page {
    .vditor {
      height: calc(100vh - 60px);
      padding: 10px;
      margin: 0px auto;
    }
  }
}
</style>
