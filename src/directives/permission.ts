import type { Directive, DirectiveBinding } from "vue";
import { useUserStore } from "../store/useUserStore";


const hasNoPermission = (value: string) =>
  useUserStore().currentUser?.permissions.includes(value) === false;


export const permissionDirective: Directive = {
  mounted(el: Element, { value }: DirectiveBinding) {
    hasNoPermission(value) && el.parentNode?.removeChild(el);
  },
};