<template>
  <t-card>
    <div class="action-area">
      <t-button v-permission="PermissionEnum.USER_LIST_CREATE">创建用户 </t-button>
    </div>
    <div class="search-area">
      <t-input class="search-input" v-model="searchKey.name" placeholder="请输入用户名"></t-input>
      <t-button @click="fetchData">
        <template #icon>
          <icon name="search"></icon>
        </template>
      </t-button>
    </div>
    <t-table :loading="appStore.loading" row-key="index" :columns="columns" :data="data" :pagination="pagination"
      @page-change="onPageChange"></t-table>
  </t-card>
</template>

<script lang="ts" setup>
import { Icon } from "tdesign-vue-next";
import { PermissionEnum } from "../../config/permission.config";
import { useAppStore } from "../../store/useAppStore";
import { useSearch } from "../../hooks/useSearch";
import { userListApi, UserType } from "../../apis/user";
import { reactive } from "vue";
const appStore = useAppStore()
const columns = [
  { colKey: "id", title: "ID" },
  { colKey: "username", title: "用户名" },
  { colKey: "nickname", title: "昵称" },
  { colKey: "roles", title: "角色" },
  { colKey: "operation", title: "操作" },
];
const searchKey = reactive({
  name: "",
});
const { data, pagination, fetchData, onPageChange } = useSearch<UserType, typeof searchKey>(userListApi, searchKey)
</script>

<style lang="scss" scoped>
.search-area {
  margin-top: 20px;
  display: flex;
  .search-input {
    width: 200px;
    margin-right: 20px;
  }
}
</style>
