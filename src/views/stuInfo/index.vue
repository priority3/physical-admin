<template>
  <div class="app-container">
    <!-- 搜索内容 -->
    <div>
      <div class="header-box">
        <div class="input-box">
          <el-input v-model="listQuery.userName" placeholder="请输入学号..." />
          <el-input v-model="listQuery.name" placeholder="请输入姓名..." />
        </div>
        <div class="btn-box">
          <el-button type="primary" @click="$refs[curtabTable].onSearch(listQuery)">查询</el-button>
          <el-button type="primary" @click="$refs[curtabTable].onExport()">导出</el-button>
          <el-button type="primary">导入</el-button>
        </div>
      </div>
    </div>
    <tabs v-model="curtabTable" :tabspanel="tabspanel">
      <template slot="tab-content">
        <component :is="curtabTable" :ref="curtabTable" />
      </template>
    </tabs>
    <!-- 分页 -->
  </div>
</template>

<script>
import pagination from '@/components/Pagination/index.vue'
import tabs from '@/components/tabs'
// import { formatDate } from '@/utils/formatDate'
export default {
  name: 'StuInfo',
  components: {
    pagination,
    tabs,
    // 切换组件
    allStuTable: () => import('./allStuTable/index.vue'),
    freeStuTable: () => import('./freeStuTable/index.vue')

  },
  data() {
    return {
      listQuery: {
        name: undefined,
        userName: undefined
      },
      curtabTable: 'allStuTable',
      // 删除按钮状态
      deleLoading: false,
      // tabs
      tabspanel: [{
        'tab-name': '所有学生',
        'tab-key': 'allStuTable'
      }, {
        'tab-name': '免测学生',
        'tab-key': 'freeStuTable'
      }]
    }
  },
  computed: {},
  created() {
  },
  methods: {
    // 获取api信息 查询

  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/tableHeader.scss";
.btn-box {
  margin-left: 20px;
}

// 修改 在移动端下 按钮 上下不对成的样式问题
@media screen and (max-width: 768px) {
  .btn-box {
    margin-left: 0;
  }
  .app-container {
    .cell {
      .el-button {
        margin-left: 0;
      }
    }
  }
  .btn-fun-box {
    gap: 10px;
  }
}
@media screen and (max-width: 1134px) {
  .btn-fun-box {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 10px;
  }
  .btn-fun-box .el-button + .el-button {
    margin-left: 0;
  }
}
.btn-fun-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>
