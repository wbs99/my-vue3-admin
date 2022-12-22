import { CellData, MessagePlugin } from "tdesign-vue-next";
import { ref, reactive } from "vue";
import { createUserApi, editUserApi } from "../apis/user";

export const useEditDialog = <T>(defaultData: T) => {
  const dialogVisible = ref(false)
  const editData = reactive<any>(defaultData);
  const openEditDialog = (item: CellData<T>) => {
    Object.assign(editData, item.row)
    dialogVisible.value = true;
  };
  const openCreateUserDialog = () => dialogVisible.value = true
  const onDialogClose = () => {
    dialogVisible.value = false
    Object.assign(editData, defaultData)
  }
  const onConfirm = async (user: any) => {
    if (editData.value && editData.value.id) {
      await editUserApi(editData.value.id, user);
      MessagePlugin.success(`编辑成功`);
    } else {
      await createUserApi(user);
      MessagePlugin.success(`创建成功`);
    }
    onDialogClose();
  };
  return { dialogVisible, editData, openEditDialog, openCreateUserDialog, onDialogClose, onConfirm }
}