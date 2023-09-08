<template>
  <t-card>
    <div class="action-area">
      <t-button v-permission="PermissionEnum.USER_ROLES_CREATE" @click="openCreateUserDialog">
        创建角色
      </t-button>
    </div>
    <div class="search-area">
      <t-input v-model="searchKey.name" class="search-input" placeholder="请输入角色名称" />
      <t-input v-model="searchKey.label" class="search-input" placeholder="请输入角色标识" />
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
    <RoleEditDialog :dialog-visible="dialogVisible" :data="editData" @update:dialog-visible="onDialogClose"
      @confirm="onConfirm" />
  </t-card>
</template>

<script lang="ts" setup>
import { Icon } from 'tdesign-vue-next'
import { reactive } from 'vue'
import { roleListApi } from '../../apis/roles'
import type { RoleType } from '../../apis/types'
import { useEditDialog } from '../../hooks/useEditDialog'
import { useSearch } from '../../hooks/useSearch'
import { PermissionEnum } from '../../config/permission.config'
import { useAppStore } from '../../store/useAppStore'
import RoleEditDialog from './RoleEditDialog.vue'

const appStore = useAppStore()

const columns = [
  { colKey: 'id', title: 'ID' },
  { colKey: 'username', title: '角色名' },
  { colKey: 'nickname', title: '昵称' },
  { colKey: 'roles', title: '角色' },
  { colKey: 'operation', title: '操作' }
]
const searchKey = reactive({
  name: '',
  label: '',
})
const defaultData: RoleType = {
  id: '',
  name: '',
  label: '',
  permissions: []
}
const { data, pagination, fetchData, onPageChange } = useSearch<RoleType, typeof searchKey>(roleListApi, searchKey)
const { dialogVisible, editData, openCreateUserDialog, onDialogClose, onConfirm } = useEditDialog(defaultData)

const openEditDialog = (item: any) => {
  Object.assign(editData, item.row)
  dialogVisible.value = true
}
</script>

<style lang="scss" scoped></style>
