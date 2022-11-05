<template>
  <t-aside :width="appStore.menuStatus ? '64px' : '232px'">
    <t-menu :collapsed="appStore.menuStatus">
      <AsideMenu v-for="menu in permissionStore.menuRoutes" :key="menu.name" :menu="menu" />
    </t-menu>
  </t-aside>
</template>

<script lang="ts" setup>
import { AppStore } from '../store/useAppStore';
import { PermissionStore } from '../store/usePermissionStore';
import AsideMenu from './AsideMenu.vue';
const appStore = AppStore()
const permissionStore = PermissionStore()


</script>


<style lang="scss" scoped>

</style>
