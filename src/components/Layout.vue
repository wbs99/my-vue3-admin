<template>
  <div>
    <t-layout class="main-layout">
      <LayoutAside />
      <t-layout>
        <LayoutHeader />
        <t-content class="content-layout">
          <router-view></router-view>
        </t-content>
        <t-footer class="footer">Copyright @ 2021-2022 PandaAdmin.</t-footer>
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
.content-layout {
  padding: 24px;
}
.footer{
  text-align: center;
}
</style>
