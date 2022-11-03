<template>
  <div>
    <t-layout class="main-layout">
      <t-aside>Aside</t-aside>
      <t-layout>
        <t-header>Header</t-header>
        <t-content>
          <router-view></router-view>
        </t-content>
        <t-footer>Footer</t-footer>
      </t-layout>
    </t-layout>
  </div>
</template>

<script lang="ts" setup>

</script>


<style lang="scss" scoped>
.main-layout{
  height: 100vh;
}

</style>
