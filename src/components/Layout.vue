<template>
  <div>
    <t-layout class="main-layout">
      <LayoutAside />
      <t-layout>
        <LayoutHeader />
        <t-content>
          <router-view></router-view>
        </t-content>
        <t-footer>Footer</t-footer>
      </t-layout>
    </t-layout>
  </div>
</template>

<script lang="ts" setup>
import LayoutAside from './LayoutAside.vue';
import LayoutHeader from './LayoutHeader.vue';

</script>

<style lang="scss" scoped>
.main-layout{
  height: 100vh;
}
</style>
