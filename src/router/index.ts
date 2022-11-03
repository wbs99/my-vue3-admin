import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/home" },
  {
    path: '/login', component: () => import("../views/Login.vue"),
  },
  {
    path: '/dashboard', component: () => import('../views/dashboard.vue'),
  },
  { path: "/:pathMatch(.*)", component: () => import("../views/NotFound.vue") },
]
const history = createWebHashHistory()

export const router = createRouter({ history, routes })
