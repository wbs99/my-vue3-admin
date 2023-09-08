<template>
  <div>
    <t-layout class="h-screen">
      <LayoutAside />
      <t-layout>
        <LayoutHeader />
        <t-content class="p-24px">
          <router-view />
        </t-content>
        <t-footer class="text-center">
          Copyright @ 2021-2022 PandaAdmin.
        </t-footer>
      </t-layout>
    </t-layout>
  </div>
</template>

<script lang="ts" setup>
import LayoutAside from './LayoutAside.vue'
import LayoutHeader from './LayoutHeader.vue'
</script>

<style lang="scss" scoped></style>
