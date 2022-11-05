<template>
  <t-menu-item v-if="menu && !menu.children" :value="menu.name" :to="{ name: menu.name }">
    <template #icon>
      <icon :name="menu.meta.icon" />
    </template>
    {{ menu.meta.title }}
  </t-menu-item>
  <t-submenu v-if="menu && menu.children" :value="menu.name" :title="menu.meta.title">
    <template #icon>
      <icon :name="menu.meta.icon" />
    </template>
    <AsideMenu v-for="subItem in menu.children" :key="subItem.name" :menu="subItem" />
  </t-submenu>
</template>

<script lang="ts" setup>
import { Icon } from "tdesign-vue-next";

defineProps({
  menu: {
    type: Object,
    default: null,
  },
});

</script>


<style lang="scss" scoped>

</style>
