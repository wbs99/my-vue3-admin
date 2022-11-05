import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { RouteRecordRaw } from "vue-router";
import { routes as AllRoutes } from "../router";



export const PermissionStore = defineStore(
  "PermissionStore",
  () => {
    const count = ref(1)
    const doubleCount = computed(() => {
      console.log('count')
      return count.value * 2
    })
    const routes: RouteRecordRaw[] = reactive([])
    const menuRoutes = computed(() => {
      if (routes !== undefined) {
        console.log('menuRoutes')

        return routes.find(route => route.name === 'menuRoot')?.children

      }
    })
    const filterRoutes = (routes: RouteRecordRaw[], permissions: string[]) => {
      return routes.filter((route: RouteRecordRaw) => {
        if (route.children) { route.children = filterRoutes(route.children, permissions); }
        // 1. 没有定义meta的路由 ： !route.meta
        // 2. 没有定义meta里面permission !route.meta.permission
        // 3. permission是否存在与当前permissions 里面
        return (
          !route.meta ||
          (route.meta && (!route.meta.permission ||
            (route.meta.permission && permissions.includes(route.meta.permission))))
        );
      });
    };
    const generateRoutes = (permissions: string[], admin = false) => {
      admin === true ?
        Object.assign(routes, AllRoutes) :
        Object.assign(routes, filterRoutes(AllRoutes, permissions))
    }

    return { routes, generateRoutes, menuRoutes, doubleCount, count }
  },
  {
    persist: true,
  }
);