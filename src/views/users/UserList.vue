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
import { UserType } from "../../apis/user";
import { userListApi } from "../../apis/user";
import type { PaginationProps, PageInfo } from "tdesign-vue-next";
import { onMounted, reactive } from "vue";
import { useAppStore } from "../../store/useAppStore";
const appStore = useAppStore()
const columns = [
  { colKey: "id", title: "ID" },
  { colKey: "username", title: "用户名" },
  { colKey: "nickname", title: "昵称" },
  { colKey: "roles", title: "角色" },
  { colKey: "operation", title: "操作" },
];
const data = reactive<UserType[]>([]);
const pagination = reactive<PaginationProps>({
  current: 1,
  total: 0,
  pageSize: 10,
});
const searchKey = reactive({
  name: "",
});
const fetchData = async () => {
  const response = await userListApi(
    {
      name: searchKey.name,
      page: pagination.current,
      size: pagination.pageSize,
      total: pagination.total,
    },
    {
      _autoLoading: true
    }
  );
  Object.assign(data, response.data.data);
  Object.assign(pagination, response.data.paging);
};
const onPageChange = (pageInfo: PageInfo) => {
  pagination.current = pageInfo.current;
  pagination.pageSize = pageInfo.pageSize;
  fetchData();
};
onMounted(() => {
  fetchData();
});
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
