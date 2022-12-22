
<template>
  <t-dialog width="900px" :header="user.id ? '编辑用户' : '创建用户'" :visible="dialogVisible" @close="onDialogClose"
    @confirm="handleConfirm">
    <t-form ref="form" :data="user" :rules="rules">
      <t-form-item label="用户名称" name="username">
        <t-input placeholder="请输入用户名称" v-model="user.username" />
      </t-form-item>
      <t-form-item label="用户昵称" name="nickname">
        <t-input placeholder="请输入用户昵称" v-model="user.nickname" />
      </t-form-item>
      <t-form-item label="角色" name="roles">
        <t-select v-model="user.roles" :options="options" clearable multiple> </t-select>
      </t-form-item>
    </t-form>
  </t-dialog>
</template>


<script lang="ts" setup>
import { computed, reactive } from "vue";
import { UserType } from "../apis/user";

interface Props {
  dialogVisible: boolean;
  data: UserType | null;
}
const props = withDefaults(defineProps<Props>(), {
  dialogVisible: false,
});
const emit = defineEmits(["update:dialogVisible", "confirm"]);

const defaultData: UserType = {
  id: "",
  username: "",
  nickname: "",
  roles: [],
  permissions: [],
};
const dialogVisible = computed(() => props.dialogVisible);
const onDialogClose = () => emit("update:dialogVisible", false);

const user = reactive(props.data || defaultData);
const rules = {
  username: [{ required: true, message: "用户名称不能为空", trigger: "blur" }],
  nickname: [{ required: true, message: "用户昵称不能为空", trigger: "blur" }],
};

const options = computed(() => {
  return [
    { label: "管理员", value: "ROLE_ADMIN" },
    { label: "普通用户", value: "ROLE_USER" },
  ];
});
const handleConfirm = () => {
  emit("confirm", user);
};
</script>

<style lang="scss" scoped></style>
