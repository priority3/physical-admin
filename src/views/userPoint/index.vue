<template>
  <div class="app-container">
    <!-- 搜索内容 -->
    <div>
      <div class="header-box">
        <div class="input-box">
          <el-input v-model="listQuery.userid" placeholder="请输入学号..." />
          <el-input v-model="listQuery.userName" placeholder="请输入姓名..." />
        </div>
        <div class="btn-box">
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="primary">导出</el-button>
        </div>
      </div>

    </div>
    <el-table
      :data="list"
      style="width: 100%;margin-top: 40px;"
    >
      <el-table-column
        prop="name"
        label="体测项目"
      />
      <el-table-column
        prop="day"
        label="体测时间"
      />

      <el-table-column
        prop="location"
        label="体测地点"
      />

      <el-table-column
        prop="teacherInfo.name"
        label="责任老师"
      />

      <el-table-column
        label="操作"
      >
        <div slot-scope="scope" class="btn-fun-box">
          <el-button type="success" size="small" @click="$refs.form.open(scope.row)">编辑</el-button>
          <el-button type="success" size="small" @click="$refs.form.open(scope.id)">学生信息</el-button>

          <el-button type="danger" size="small">删除</el-button>
        </div></el-table-column>
    </el-table>

    <pagination
      :style="{ textAlign: 'right' }"
      :total="pagination.total"
      :current-page="pagination.current"
      :page-sizes="pagination.pageSizeOptions"
      @pagination="handlePaginationChanged"
    />
    <detail-form ref="form" @complete="getList" />
  </div>
</template>

<script>
import pagination from '@/components/Pagination/index.vue'
import detailForm from './form.vue'
import list from '@/layout/mixin/list.js'
export default {
  name: 'UserAppoint',
  components: {
    pagination,
    detailForm
  },
  mixins: [list],
  data() {
    return {

      listQuery: {
        name: '',
        status: '',
        userid: undefined,
        userName: undefined
      }
    }
  },
  created() {},
  methods: {
    seesee() {
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tableHeader.scss';

// 修改 在移动端下 按钮 上下不对成的样式问题
@media screen and (max-width: 768px) {

  .app-container{
    .cell {
      .el-button{
        margin-left: 0;
      }
    }
  }
  .btn-fun-box{
    gap: 10px;
  }
}
@media screen and (max-width: 1134px) {

  .btn-fun-box{
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 10px;
  }
  .btn-fun-box .el-button+.el-button{
    margin-left: 0;
  }
}
.btn-fun-box{
  display:flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>
