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
          <el-button type="primary" @click="addAppiontInfo">添加</el-button>
        </div>
      </div>

    </div>
    <!-- 表格数据 -->
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
          <el-button type="danger" size="small" :loading="deleLoading" @click="deleteListItem(scope.row)">删除</el-button>
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
</template>

<script>
import pagination from '@/components/Pagination/index.vue'
import list from '@/layout/mixin/list.js'
import { formatDate } from '@/utils/formatDate'
export default {
  name: 'StuInfo',
  components: {
    pagination
  },
  mixins: [list],
  data() {
    return {
      listQuery: {
        status: '',
        userid: undefined,
        userName: undefined
      },
      value1: '',
      form: {
        name: '',
        day: '',
        hour: '',
        semester: '',
        location: '',
        orderNum: '',
        teacherInfo: {
          name: '',
          phoneNum: '',
          college: ''
        }
      },
      options: [{
        value: '选项1',
        label: '第一学期'
      }, {
        value: '选项2',
        label: '第二学期'
      }, {
        value: '选项3',
        label: '第三学期'
      }, {
        value: '选项4',
        label: '第四学期'
      }],

      // 删除按钮状态
      deleLoading: false,
      // 弹出框的显示状态
      dialogFormVisible: false
    }
  },
  computed: {},
  created() {

  },
  methods: {
    addAppiontInfo() {
      this.dialogFormVisible = true
    },
    // 删除
    deleteListItem({ id }) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleLoading = true
        this.$store.dispatch('list/delListItem', { id }).then((res) => {
          this.$notify({
            type: 'success',
            message: '删除成功!'
          })
        }
        ).catch((err) => {
          console.log(err)
        }).finally(() => {
          this.deleLoading = false
        })
      }).catch(() => {
        // this.$notify({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    },
    // 学期下拉 更改学期信息
    handleGetSemester(e) {
      this.form.semester = this.options.filter((item) => {
        return item.value === e
      })[0].label
    },
    // 日期改变
    getAppointDate(e) {
      this.form.day = formatDate(e)
    },
    // 时间改变
    getAppointTime(e) {
      this.form.hour = e.map((item) => formatDate(item, 'HH:mm')).join('-')
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
