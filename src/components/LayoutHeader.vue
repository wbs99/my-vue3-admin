<template>
  <div>
    <t-header class="header">
      <MenuButton v-model:collapse="appStore.menuStatus" class="operation-area" />
      <div class="operation-area">
        <t-dropdown :options="options" @click="clickHandler">
          <t-button variant="text">
            <template #icon>
              <icon name="user"></icon>
            </template>
            {{ userStore.currentUser.nickname }}
          </t-button>
        </t-dropdown>
      </div>
    </t-header>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from 'tdesign-vue-next';
import { useAppStore } from '../store/useAppStore';
import { useRoute, useRouter } from 'vue-router';
import MenuButton from './MenuButton.vue';
import { useUserStore } from '../store/useUserStore';

const userStore = useUserStore()
const appStore = useAppStore()
const route = useRoute()
const router = useRouter()
const options = [
  { content: '退出登录', value: 'logout' },
];
type OptionType = {
  content: string
  value: string
}

const clickHandler = (data: OptionType) => {
  if (data.value === 'logout') {
    console.log('logout')
    appStore.logout()
    router.push(`/login?return_to=${route.fullPath}`)
  }
};
</script>


<style lang="scss" scoped>
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
}
</style>
