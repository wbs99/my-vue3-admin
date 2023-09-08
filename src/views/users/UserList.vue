<template>
  <t-card>
    <div class="action-area">
      <t-button v-permission="PermissionEnum.USER_LIST_CREATE" @click="openCreateUserDialog">
        创建用户
      </t-button>
    </div>
    <div class="search-area">
      <t-input v-model="searchKey.name" class="search-input" placeholder="请输入用户名" />
      <t-button @click="fetchData">
        <template #icon>
          <Icon name="search" />
        </template>
      </t-button>
    </div>
    <t-table :loading="appStore.loading" row-key="index" :columns="columns" :data="data" :pagination="pagination"
      @page-change="onPageChange">
      <template #operation="slotProps">
        <t-button v-permission="PermissionEnum.USER_LIST_EDIT" variant="text" theme="primary"
          @click="openEditDialog(slotProps)">
          <Icon name="edit" />
          编辑
        </t-button>
      </template>
    </t-table>
  </t-card>
  <EditDialog :dialog-visible="dialogVisible" :data="editData" @update:dialog-visible="onDialogClose"
    @confirm="onConfirm" />
</template>

<script lang="ts" setup>
import { Icon } from 'tdesign-vue-next'
import { reactive } from 'vue'
import { PermissionEnum } from '../../config/permission.config'
import { useAppStore } from '../../store/useAppStore'
import { useSearch } from '../../hooks/useSearch'
import { userListApi } from '../../apis/user'
import type { UserType } from '../../apis/types'
import EditDialog from '../../components/EditDialog.vue'
import { useEditDialog } from '../../hooks/useEditDialog'

const appStore = useAppStore()
const columns = [
  { colKey: 'id', title: 'ID' },
  { colKey: 'username', title: '用户名' },
  { colKey: 'nickname', title: '昵称' },
  { colKey: 'roles', title: '角色' },
  { colKey: 'operation', title: '操作' },
]
const searchKey = reactive({
  name: '',
})
const { data, pagination, fetchData, onPageChange } = useSearch<UserType, typeof searchKey>(userListApi, searchKey)
const defaultData: UserType = {
  id: '',
  username: '',
  nickname: '',
  roles: [],
  permissions: [],
}
const { dialogVisible, editData, openCreateUserDialog, onDialogClose, onConfirm } = useEditDialog(defaultData)
const openEditDialog = (item: any) => {
  Object.assign(editData, item.row)
  dialogVisible.value = true
}
</script>

<style lang="scss" scoped></style>
