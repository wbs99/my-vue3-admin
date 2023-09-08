import type { Directive, DirectiveBinding } from 'vue'
import { useUserStore } from '../store/useUserStore'

const noPermission = (value: string) => useUserStore().currentUser?.permissions.includes(value) === false

export const permissionDirective: Directive = {
  mounted(el: Element, { value }: DirectiveBinding) {
    noPermission(value) && el.parentNode?.removeChild(el)
  },
}
