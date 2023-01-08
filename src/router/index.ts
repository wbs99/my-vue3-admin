import { useAppStore } from '../store/useAppStore';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { PermissionEnum } from '../config/permission.config';

declare module "vue-router" {
  interface RouteMeta {
    permission?: string;
    icon?: string;
    title?: string;
  }
}

export const routes: RouteRecordRaw[] = [
  {
    path: "/", name: 'menuRoot', redirect: "/dashboard", component: () => import("../components/Layout.vue"),
    children: [
      {
        path: '/dashboard',
        name: "dashboard",
        component: () => import("../views/dashboard.vue"),
        meta: {
          permission: PermissionEnum.DASHBOARD,
          title: "控制台",
          icon: "dashboard",
        },
      },
      {
        name: "user",
        path: "user",
        component: () => import('../components/PageLayout.vue'),
        meta: {
          title: "用户",
          icon: "usergroup",
          permission: PermissionEnum.USER,
        },
        redirect: { name: "user-list" },
        children: [
          {
            name: "user-list",
            path: "list",
            component: () => import("../views/users/UserList.vue"),
            meta: {
              title: "用户管理",
              icon: "user",
              permission: PermissionEnum.USER_LIST,
            },
          },
          {
            name: "role-list",
            path: "roles",
            component: () => import("../views/users/RoleList.vue"),
            meta: {
              title: "角色管理",
              permission: PermissionEnum.USER_ROLES,
              icon: "secured",
            },
          },
        ],
      },
    ]
  },
  {
    path: '/login', component: () => import("../views/Login.vue"),
  },
  {
    path: '/403', component: () => import('../views/NotAllowed.vue'),
  },
  { path: "/:pathMatch(.*)", component: () => import("../views/NotFound.vue") },
]
const history = createWebHashHistory()

export const router = createRouter({ history, routes })

const whiteList: Record<string, 'exact' | 'startsWith'> = {
  '/login': 'startsWith',
  '/first': 'exact',
}

router.beforeEach((to, from) => {
  const appStore = appStore()
  for (const key in whiteList) {
    const value = whiteList[key]
    if (value === 'exact' && to.path === key) {
      return true
    }
    if (value === 'startsWith' && to.path.startsWith(key)) {
      if (appStore.token && to.path === '/login') {
        router.push('/dashboard')
      } else {
        return true
      }
    }
  }
  return appStore.token ? true : `/login?return_to=${to.path}`
})