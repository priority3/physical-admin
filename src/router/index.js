import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index'),
        meta: { title: '控制台', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/appoint',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '预约管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'manageList',
        name: 'UserPoint',
        component: () => import('@/views/approintManagement/index'),
        meta: { title: '预约列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/appoint-detail',
    component: Layout,
    redirect: '/example/table',
    name: 'ExampleTable',
    meta: { title: '详细信息', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'user-appoint-detail',
        name: 'UserPointDetail',
        component: () =>
          import('@/views/approintManagement/UserPointDetail/index')
      }
    ]
  },
  {
    path: '/appoint-stu-detail',
    component: Layout,
    redirect: '/example/table',
    name: 'ExampleTable',
    meta: { title: '预约班级信息' },
    children: [
      {
        path: 'user-stu-detail',
        name: 'UserstuPointDetail',
        component: () => import('@/views/approintManagement/stuInfo/index')
      }
    ]
  }
]
// 动态判断权限路由
export const asyncRoutes = [
  {
    path: '/student',
    component: Layout,
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'stu-info',
        name: 'StuInfo',
        component: () => import('@/views/stuInfo/index'),
        meta: { title: '学生信息', icon: 'tree' }
      }
    ]
  },
  {
    path: '/teacher',
    component: Layout,
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'teacher-info',
        name: 'TeacherInfo',
        component: () => import('@/views/teacherInfo/index'),
        meta: { title: '教师信息', icon: 'el-icon-s-open' }
      }
    ]
  },
  {
    path: '/free',
    component: Layout,
    name: 'Free',
    meta: {
      title: '免测管理',
      icon: 'el-icon-s-order',
      roles: ['admin']
    },
    children: [
      {
        path: 'manage-free',
        name: 'freeApprove',
        component: () => import('@/views/freeApprove/index'),
        meta: { title: '普通免测', icon: 'el-icon-s-release' }
      },
      {
        path: 'slowAppoint',
        name: 'SlowAppoint',
        component: () => import('@/views/slowAppoint/index'),
        meta: { title: '缓测管理', icon: 'el-icon-c-scale-to-original' }
      },
      {
        path: 'otherAppoint',
        name: 'OtherAppoint',
        component: () => import('@/views/otherApprove/index'),
        meta: { title: '其他事项', icon: 'el-icon-receiving' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/info',
    children: [
      {
        path: 'info',
        name: 'Userinfo',
        component: () => import('@/views/userinfo/index'),
        meta: { title: '个人信息', icon: 'el-icon-s-custom' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
