
<template>
  <t-dialog width="900px" :header="role.id ? '编辑角色' : '创建角色'" :visible="dialogVisible" @close="onDialogClose"
    @confirm="handleConfirm">
    <t-form ref="form" :data="role" :rules="rules">
      <t-form-item label="角色名称" name="name">
        <t-input placeholder="请输入角色名称" v-model="role.name" />
      </t-form-item>
      <t-form-item label="用户标识" name="label">
        <t-input placeholder="请输入用户标识" v-model="role.label" />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>


<script lang="ts" setup>
import { computed, reactive, watch } from "vue";
import { RoleType } from "../../apis/types";

interface Props {
  dialogVisible: boolean;
  data: RoleType | null;
}
const props = withDefaults(defineProps<Props>(), {
  dialogVisible: false,
});
const rules = {
  username: [{ required: true, message: "用户名称不能为空", trigger: "blur" }],
};
const defaultData: RoleType = {
  id: "",
  name: "",
  label: "",
  permissions: [],
};
const role = reactive(props.data || defaultData);
watch(props, (newValue: any) => {
  Object.assign(role, newValue.data || defaultData)
});

const emit = defineEmits(["update:dialogVisible", "confirm"]);


const dialogVisible = computed(() => props.dialogVisible);
const onDialogClose = () => emit("update:dialogVisible", false);
const handleConfirm = () => {
  emit("confirm", role);
};
</script>

<style lang="scss" scoped></style>
