<template>
  <div class="w-100vw h-screen flex justify-center items-center">
    <div class="flex items-center h-320px">
      <slot name="image" />

      <div class="ml-40px">
        <div class="text-40px font-bold mb-20px">
          {{ title }}
        </div>
        <div class="text-19px text-#525151 mb-50px">
          {{ description }}
        </div>
        <t-button @click="$router.replace({ path: '/' })">
          返回首页
        </t-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title: string
  description: string
}

withDefaults(defineProps<Props>(), {
  title: '未知错误',
  description: '暂时无法找到错误原因',
})
</script>

<style lang="scss" scoped></style>
