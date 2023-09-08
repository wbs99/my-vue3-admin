<template>
  <t-dialog width="900px" :header="role.id ? '编辑角色' : '创建角色'" :visible="dialogVisible" @close="onDialogClose"
    @confirm="handleConfirm">
    <t-form :data="role" :rules="rules">
      <t-form-item label="角色名称" name="name">
        <t-input v-model="role.name" placeholder="请输入角色名称" disabled />
      </t-form-item>
      <t-form-item label="角色标识" name="label">
        <t-input v-model="role.label" placeholder="角色标识" />
      </t-form-item>
      <t-form-item label="权限集" name="permissions">
        <t-tree v-model="role.permissions" :data="permissionsTree" hover expand-all :checkable="true" value-mode="all" />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, watch } from 'vue'
import type { RoleType } from '../../apis/types'
import { permissionsTree } from '../../config/permission.config'

interface Props {
  dialogVisible: boolean
  data: RoleType | null
}
const props = withDefaults(defineProps<Props>(), {
  dialogVisible: false,
})
const emit = defineEmits(['update:dialogVisible', 'confirm'])
const rules = {
  username: [{ required: true, message: '用户名称不能为空', trigger: 'blur' }],
}
const defaultData: RoleType = {
  id: '',
  name: '',
  label: '',
  permissions: [],
}
const role = reactive(props.data || defaultData)
watch(props, (newValue: any) => {
  Object.assign(role, newValue.data || defaultData)
})

const dialogVisible = computed(() => props.dialogVisible)
const onDialogClose = () => emit('update:dialogVisible', false)
const handleConfirm = () => {
  emit('confirm', role)
}
</script>

<style lang="scss" scoped></style>
