<template>
  <t-aside :width="appStore.menuStatus ? '64px' : '232px'">
    <t-menu :collapsed="appStore.menuStatus" :defaultValue="$route.name">
      <AsideMenu v-for="menu in permissionStore.menuRoutes" :key="menu.name" :menu="menu" />
    </t-menu>
  </t-aside>
</template>

<script lang="ts" setup>
import { useAppStore } from '../store/useAppStore';
import { usePermissionStore } from '../store/usePermissionStore';
import AsideMenu from './AsideMenu.vue';
const appStore = useAppStore()
const permissionStore = usePermissionStore()


</script>

<style lang="scss" scoped></style>
