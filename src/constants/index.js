// 对话框显示常量 ref
export const FREE_DETAIL_INFO = 'detail'
export const FREE_REJECT_APPROVE = 'reject_approve'
// 驳回 or 同意
export const FREE_REJECT_APPROVE_MAP = {
  // 免测审核中
  'free_is_passing_list': 0,
  // 免测审核通过
  'free_passed_list': 1,
  // 免测审核驳回
  'free_not_pass_list': 2
}

// 免测分类
export const FREE_LIST_INFO = {
  // 普通免测
  'normal_free_list': 0,
  // 缓测
  'slow_free_list': 1,
  // 其他事项
  'other_free_list': 2
}

// 表格信息对应常量表
export const TABLE_INGO_MAP = {
  'name': 'USER_NAME',
  'usernmae': 'USER_ID',
  'semester': 'USER_SEMESTER',
  'college': 'USER_COLLEGE'
}

// 权限名称
export const ROLES_MAP = {
  '管理员': 'admin',
  '老师': 'teacher',
  '学生': 'student'
}

// 主页card 权限
export const CARD_MAP = {
  'admin': [{
    name: '预约列表',
    path: '/appoint/manageList'
  }, {
    name: '学生信息',
    path: '/student/stu-info'
  }, {
    name: '个人信息',
    path: '/user/info'
  }],
  'teacher': [{
    name: '预约列表',
    path: '/appoint/manageList'
  }, {
    name: '个人信息',
    path: '/user/info'
  }]
}
