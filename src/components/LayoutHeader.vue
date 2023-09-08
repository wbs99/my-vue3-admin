<template>
  <t-header class="flex justify-between items-center px-16px">
    <MenuButton v-model:collapse="appStore.menuStatus" />
    <t-dropdown :options="options" @click="clickHandler">
      <t-button variant="text">
        <template #icon>
          <Icon name="user" />
        </template>
        {{ userStore.currentUser.nickname }}
      </t-button>
    </t-dropdown>
  </t-header>
</template>

<script lang="ts" setup>
import { Icon } from 'tdesign-vue-next'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '../store/useAppStore'
import { useUserStore } from '../store/useUserStore'
import MenuButton from './MenuButton.vue'

const userStore = useUserStore()
const appStore = useAppStore()
const route = useRoute()
const router = useRouter()
const options = [
  { content: '退出登录', value: 'logout' },
]
type OptionType = {
  content: string
  value: string
}

const clickHandler = (data: OptionType) => {
  if (data.value === 'logout') {
    appStore.logout()
    router.push(`/login?return_to=${route.fullPath}`)
  }
}
</script>

<style lang="scss" scoped></style>
