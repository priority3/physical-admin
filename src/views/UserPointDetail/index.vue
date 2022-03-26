<template>
  <div class="app-container">
    <el-page-header :content="name" @back="goBack" />
    <div style="margin-top:20px;">
      <!-- 搜索内容 -->
      <div>
        <div class="header-box">
          <div class="input-box">
            <el-input v-model="listQuery.userName" placeholder="请输入学号..." />
            <el-input v-model="listQuery.name" placeholder="请输入姓名..." />
          </div>
          <div class="btn-box">
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button type="primary" @click>导出</el-button>
          </div>
        </div>
      </div>
      <!-- 表格数据 -->
      <el-table v-loading="tableLoading" :data="list" style="width: 100%;margin-top: 40px;">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="userName" label="学号" />
        <el-table-column prop="grade" label="年级" />

        <el-table-column prop="specialty" label="专业" />

        <el-table-column prop="schoolClass" label="班级" />
        <el-table-column label="操作">
          <div slot-scope="scope" class="btn-fun-box">
            <el-button
              type="danger"
              size="small"
              :loading="deleLoading"
              @click="deleteListItem(scope.row)"
            >删除</el-button>
          </div>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination
        :style="{ textAlign: 'right' }"
        :total="pagination.total"
        :current-page="pagination.current"
        :page-sizes="pagination.pageSizeOptions"
        @pagination="handlePaginationChanged"
      />
    </div>
  </div>
</template>

<script>
import pagination from '@/components/Pagination/index.vue'
import list from '@/layout/mixin/list.js'
export default {
  name: 'UserPointDetail',
  components: {
    pagination
  },
  mixins: [list],
  data() {
    return {
      listQuery: {
        userName: undefined,
        name: undefined
      },
      value1: '',
      // store 请求
      baseApi: 'list/getStudentListByInfo',
      deleteApi: 'list/handleDelUsedInfo',

      // 手动请求
      isFirstGetlist: false
    }
  },
  computed: {

  },
  created() {
    this.name = sessionStorage.getItem('name')
    this.id = sessionStorage.getItem('id')
    this.getList()
  },
  methods: {
    // 返回上一级页面
    goBack() {
      this.$router.go(-1)
    }

  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/tableHeader.scss";

// 修改 在移动端下 按钮 上下不对成的样式问题
@media screen and (max-width: 768px) {
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
