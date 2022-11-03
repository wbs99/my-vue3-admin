import { AppStore } from './../store/AppStore';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/login" },
  {
    path: '/login', component: () => import("../views/Login.vue"),
  },
  {
    path: '/first', component: () => import('../views/First.vue'),
  },
  {
    path: '/dashboard', component: () => import('../views/dashboard.vue'),
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
  const appStore = AppStore()
  for (const key in whiteList) {
    const value = whiteList[key]
    if (value === 'exact' && to.path === key) {
      return true
    }
    if (value === 'startsWith' && to.path.startsWith(key)) {
      return true
    }
  }
  return appStore.token ? true : `/login?return_to=${to.path}`
})