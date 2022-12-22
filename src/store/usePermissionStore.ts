import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { RouteRecordRaw } from "vue-router";
import { routes as AllRoutes } from "../router";

type PermissionState = {
  routes: RouteRecordRaw[];
};



// export const usePermissionStore = defineStore(
//   "permissionStore",
//   () => {
//     const routes: RouteRecordRaw[] = reactive([])
//     const menuRoutes = computed(() => routes.find(route => route.name === 'menuRoot')?.children)
//     const filterRoutes = (routes: RouteRecordRaw[], permissions: string[]) => {
//       return routes.filter(route => {
//         if (route.children) { route.children = filterRoutes(route.children, permissions); }
//         // 1. 没有定义meta的路由 ： !route.meta
//         // 2. 没有定义meta里面permission !route.meta.permission
//         // 3. permission是否存在与当前permissions 里面
//         return (
//           !route.meta ||
//           (route.meta && (!route.meta.permission ||
//             (route.meta.permission && permissions.includes(route.meta.permission))))
//         );
//       });
//     };
//     const generateRoutes = (permissions: string[], admin = false) => {
//       admin === true ?
//         Object.assign(routes, AllRoutes) :
//         Object.assign(routes, filterRoutes(AllRoutes, permissions))
//     }
//     return { routes, generateRoutes, menuRoutes }
//   },
//   {
//     persist: true,
//   }
// );


const filterRoutes = (routes: RouteRecordRaw[], permissions: string[]) => {
  return routes.filter((route: RouteRecordRaw) => {
    if (route.children) { route.children = filterRoutes(route.children, permissions) }
    // 1. 路由信息中不存在 meta
    // 2. 路由信息中 存在 meta 但是 meta 中没有 permission
    // 3. 路由信息中存在 permission ，并且此路由存在于后端返回数据中的 permissions 数组，即有权限访问该路由
    return (
      !route.meta ||
      (route.meta && (!route.meta.permission ||
        (route.meta.permission && permissions.includes(route.meta.permission))))
    );
  });
};

export const usePermissionStore = defineStore("permissionStore", {
  state: (): PermissionState => {
    return {
      routes: [],
    };
  },
  persist: true,
  actions: {
    generateRoutes(permissions: string[], admin = false) {
      this.routes = admin ? AllRoutes : filterRoutes(AllRoutes, permissions);
    }
  },
  getters: {
    menuRoutes(): RouteRecordRaw[] | undefined {
      return this.routes.find((route: RouteRecordRaw) => route.name === 'menuRoot')?.children;
    }
  },
});