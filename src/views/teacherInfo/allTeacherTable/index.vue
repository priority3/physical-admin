<template>
  <div>
    <el-table v-loading="tableLoading" :data="list" border style="width: 100%">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="userName" label="学工号" />
      <el-table-column prop="college" label="学院" />
      <el-table-column prop="phone" label="联系方式" />
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click="deleteListItem(scope.row)">删除</el-button>
          <el-button size="small" type="success" @click="fixedInfo(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :style="{ textAlign: 'right' }"
      :total="pagination.total"
      :size="pagination.size"
      :current-page="pagination.current"
      :page-sizes="pagination.pageSizeOptions"
      @pagination="handlePaginationChanged"
    />
    <el-dialog title="详细信息" :visible.sync="dialogVisible" width="30%">
      <el-form ref="curList" :model="curList" label-width="80px" :rules="fixedRules">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="curList.name" />
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <template>
            <el-radio v-model="curList.sex" label="男">男</el-radio>
            <el-radio v-model="curList.sex" label="女">女</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="学工号" prop="userName">
          <el-input v-model="curList.userName" />
        </el-form-item>
        <el-form-item label="学院" prop="college">
          <el-input v-model="curList.college" />
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="curList.phone" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFixed($refs['curList'])">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import list from '@/layout/mixin/list.js'
import pagination from '@/components/Pagination/index.vue'

export default {
  components: {
    pagination
  },
  mixins: [list],
  data() {
    return {
      baseApi: 'list/getTeachInfo',
      deleteApi: 'student/handleDeleteStuInfo',
      exportApi: 'student/handleExcelAllStu',
      dialogVisible: false,
      curList: [],
      fixedRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入学号', trigger: 'blur' }
        ],

        sex: [
          { required: true, message: '请输入性别', trigger: 'blur' }
        ],
        schoolClass: [
          { required: true, message: '请输入班级', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      }
    }
  },
  created() {

  },
  methods: {
    fixedInfo(data) {
      this.curList = { ...data }
      this.dialogVisible = true
    },
    // 提交修改信息
    submitFixed(form) {
      form.validate((valid) => {
        if (valid) {
          this.$store.dispatch('list/handleFixedTeacherInfo', this.curList).then((res) => {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            })
            this.getList()
          }).catch(() => {
            this.$notify({
              title: '错误',
              message: '修改失败',
              type: 'error'
            })
          }).finally(() => {
            this.dialogVisible = false
          })
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
