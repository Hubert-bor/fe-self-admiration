<template>
  <div class="flex flex-col items-center justify-center">
    <div class="m-3">Foo</div>
    <div>
      <RouterLink class="text-sm btn btn-red" to="/hoist">Back</RouterLink>
      <button class="btn" @click="enlarge">Enlarge</button>
      <button class="btn" @click="reset">Reset</button>
    </div>

    <div class="m-10 flex sm:flex-col gap-4 items-center">
      <FloatProxy
        class="w-[60px] h-[60px] rounded-full shrink-0"
        :style="{ width: size + 'px', height: size + 'px' }"
      />
      <p class="text-center">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FloatProxy from '@/views/hoist/components/FloatProxy.vue'
import { useStorage } from '@vueuse/core'
import { ref } from 'vue'

const size = ref(useStorage('size', 100))

const enlarge = () => {
  size.value += 10
}

const reset = () => {
  size.value = 100
}
</script>

<style lang="less" scoped></style>
