<template>
  <div class="app-container">
    <el-page-header :content="name" @back="goBack" />
    <div style="margin-top:20px;">
      <!-- 搜索内容 -->
      <div>
        <div class="header-box">
          <div class="input-box">
            <el-input v-model="listQuery.specialtyClass" placeholder="请输入专业班级..." />
            <el-input v-model="listQuery.name" placeholder="请输入姓名..." />
          </div>
          <div class="btn-box">
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button type="primary" @click="onExport({ id }, `${name}预约学生`)">导出</el-button>
          </div>
        </div>
      </div>
      <!-- 表格数据 -->
      <el-table v-loading="tableLoading" :data="dataList" style="width: 100%;margin-top: 40px;">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="grade" label="年级" />
        <el-table-column prop="specialtyClass" label="专业班级" />

        <el-table-column prop="phone" label="联系方式" />
        <el-table-column label="操作">
          <div slot-scope="scope" class="btn-fun-box">
            <self-button type="danger" size="small" @btnClick="deleteListItem(scope.row)">删除</self-button>
          </div>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination :style="{ textAlign: 'right' }" :total="pagination.total" :size="pagination.size"
        :current-page="pagination.current" :page-sizes="pagination.pageSizeOptions"
        @pagination="handlePaginationChanged" />
      <el-dialog title="添加学生" :visible.sync="dialogVisible" width="30%">
        <el-form ref="addForm" :model="addForm" label-width="80px" :rules="fixedRules">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addForm.name" placeholder="请输入学生姓名" />
          </el-form-item>
          <el-form-item label="学号" prop="userName">
            <el-input v-model="addForm.userName" placeholder="请输入学生学号" />
          </el-form-item>
          <el-form-item label="年级" prop="grade">
            <el-input v-model="addForm.grade" placeholder="请输入学生年级" />
          </el-form-item>
          <el-form-item label="专业" prop="specialty">
            <el-input v-model="addForm.specialty" placeholder="请输入学生专业" />
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <template>
              <el-radio v-model="addForm.sex" label="男">男</el-radio>
              <el-radio v-model="addForm.sex" label="女">女</el-radio>
            </template>
          </el-form-item>

          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="addForm.phone" placeholder="请输入学生联系方式" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitFixed($refs['addForm'])">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/Pagination/index.vue'
import list from '@/layout/mixin/list.js'
import SelfButton from '@/components/SelfButton'
export default {
  name: 'UserPointDetail',
  components: {
    pagination,
    SelfButton
  },
  mixins: [list],
  data() {
    return {
      listQuery: {
        userName: undefined,
        name: undefined
      },
      addForm: {

      },
      // 添加的信息框
      dialogVisible: false,
      value1: '',
      // store 请求
      baseApi: 'list/getStudentListByInfo',
      deleteApi: 'list/handleDelUsedInfo',
      exportApi: 'list/exportListStuInfo',
      // 手动请求
      isFirstGetlist: false,
      // name,el-page-heade name
      name: '',
      // id,请求参数
      id: undefined,
      fixedRules: {
        name: [
          { required: true, message: '请输入学生姓名', trigger: 'blur' }
        ],
        grade: [
          { required: true, message: '请输入学生姓名', trigger: 'blur' }
        ],
        specialty: [
          { required: true, message: '请输入学生姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请输入学生姓名', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入学生姓名', trigger: 'blur' }
        ]

      }
    }
  },
  computed: {
    dataList(self) {
      return self.list.map((item) => {
        return {
          ...item,
          id: item['testUserId']
        }
      })
    }
  },
  created() {
    const { id, name } = this.$route.query
    this.name = name
    this.id = id
    this.getList()
  },
  methods: {
    // 返回上一级页面
    goBack() {
      this.$router.go(-1)
    },
    valid(form) {
      form.validate((valid) => {
        if (valid) {
          console.log('@@执行添加')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitFixed(form) {
      console.log(this.addForm)
      this.valid(form)
    }

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

  .btn-fun-box .el-button+.el-button {
    margin-left: 0;
  }
}

.btn-fun-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>
