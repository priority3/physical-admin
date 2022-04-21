<template>
  <div>
    <el-table v-loading="tableLoading" :data="dataList" border style="width: 100%">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="grade" label="年级" />
      <!-- <el-table-column prop="schoolClass" label="班级" /> -->
      <el-table-column prop="specialtyClass" label="专业班级" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="userName" label="学号" />
      <el-table-column prop="nationality" label="名族代码" />
      <el-table-column prop="birth" label="出生日期" />
      <el-table-column prop="idCard" label="身份证号" />
      <el-table-column prop="phone" label="联系方式" />
      <el-table-column label="预约权限">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.identity" :disabled="identifyLoading" @change="handleIdentity(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click="deleteListItem(scope.row)">删除</el-button>
          <el-button size="small" type="success" @click="fixedInfo(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :style="{ textAlign: 'right' }" :total="pagination.total" :size="pagination.size"
      :current-page="pagination.current" :page-sizes="pagination.pageSizeOptions"
      @pagination="handlePaginationChanged" />
    <el-dialog title="详细信息" :visible.sync="state.editDialogVisible" width="30%">
      <el-form ref="curList" :model="curList" label-width="80px" :rules="fixedRules">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="curList.name" />
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input v-model="curList.grade" />
        </el-form-item>
        <el-form-item label="专业班级" prop="specialtyClass">
          <el-input v-model="curList.specialtyClass" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <template>
            <el-radio v-model="curList.sex" label="男">男</el-radio>
            <el-radio v-model="curList.sex" label="女">女</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="学号" prop="userName">
          <el-input v-model="curList.userName" />
        </el-form-item>
        <el-form-item label="名族代码" prop="nationality">
          <el-input v-model="curList.nationality" />
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker v-model="curList.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="curList.idCard" />
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="curList.phone" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="state.editDialogVisible = false">取 消</el-button>
        <el-button :loading="confirmLoading" type="primary" @click="submitFixed($refs['curList'])">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加学生" :visible.sync="state.addDialogVisible" width="30%">
      <el-form ref="addForm" :model="addForm" label-width="80px" :rules="fixedRules">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" />
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input v-model="addForm.grade" />
        </el-form-item>
        <el-form-item label="专业班级" prop="specialtyClass">
          <el-input v-model="addForm.specialtyClass" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <template>
            <el-radio v-model="addForm.sex" label="男">男</el-radio>
            <el-radio v-model="addForm.sex" label="女">女</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="学号" prop="userName">
          <el-input v-model="addForm.userName" />
        </el-form-item>
        <el-form-item label="名族代码" prop="nationality">
          <el-input v-model="addForm.nationality" />
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker v-model="addForm.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="addForm.idCard" />
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="addForm.phone" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="state.addDialogVisible = false">取 消</el-button>
        <el-button :loading="confirmLoading" type="primary" @click="submitAdd($refs['addForm'])">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import list from '@/layout/mixin/list.js'
import pagination from '@/components/Pagination/index.vue'

// const editFlag = false
export default {
  components: {
    pagination
  },
  filters: {

  },
  mixins: [list],
  data() {
    return {
      baseApi: 'student/handleGetStuInfo',
      deleteApi: 'student/handleDeleteStuInfo',
      exportApi: 'student/handleExcelAllStu',
      state: {
        // 编辑 对话框
        editDialogVisible: false,
        addDialogVisible: false
      },
      // 当前查看的值
      curList: [],
      fixedRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入学号', trigger: 'blur' }
        ],
        grade: [
          { required: true, message: '请输入年级', trigger: 'blur' }
        ],
        idCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { min: 18, max: 18, message: '身份证号长度为18位', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请输入性别', trigger: 'blur' }
        ],
        specialtyClass: [
          { required: true, message: '请输入学院', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号长度位11位数字', trigger: 'blur' }
        ],
        nationality: [
          { required: true, message: '请输入名族代码', trigger: 'blur' }
        ],
        birth: [
          { required: true, message: '请输入名族生日', trigger: 'blur' }
        ]

      },
      addForm: {},
      identifyLoading: false,
      confirmLoading: false
    }
  },
  computed: {
    dataList(self) {
      const { list } = self
      return list.map((item) => {
        return {
          ...item,
          identity: item['identity'] === '班长'
        }
      }) ?? []
    }

  },
  mounted() {
  },
  methods: {
    fixedInfo(data) {
      this.curList = { ...data }
      this.state.editDialogVisible = true
    },
    rebuildFormIdentify(item) {
      return {
        ...item,
        identity: item['identity'] ? '班长' : '学生'
      }
    },
    // 提交修改信息
    submitFixed(form) {
      this.curList = this.rebuildFormIdentify(this.curList)
      form.validate((valid) => {
        if (valid) {
          this.confirmLoading = true
          this.$store.dispatch('student/handleFixedStuInfo', this.curList).then((res) => {
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
            this.state.editDialogVisible = false
            this.confirmLoading = false
          })
        }
      })
    },
    showAddDialog() {
      this.state.addDialogVisible = true
    },
    // 添加学生
    submitAdd(form) {
      console.log(this.addForm)

      form.validate(valid => {
        if (valid) {
          this.confirmLoading = true

          this.$store.dispatch('student/handleAddStuInfo', this.addForm).then((res) => {
            this.$notify({
              title: '操作成功',
              message: '添加成功',
              type: 'success'
            })
            this.getList()
          }).catch(() => {
            this.$notify({
              title: '错误',
              message: '添加失败',
              type: 'error'
            })
          }).finally(() => {
            this.state.addDialogVisible = false
            this.confirmLoading = false
          })
        } else {
          this.$notify({
            title: '错误',
            message: '格式错误',
            type: 'error'
          })
        }
      })
    },
    // 更改权限
    handleIdentity(value) {
      const { identity, id } = value
      // 预约权限
      this.identifyLoading = true
      if (identity) {
        this.$store.dispatch('auth/handleToMonitor', { id }).then((res) => {
          this.$notify({
            title: res || '操作成功',
            message: '权限已修改',
            type: 'success'
          })
        }).catch(() => {
          this.$notify({
            title: '操作失败',
            message: '权限修改失败',
            type: 'error'
          })
        }).finally(() => {
          this.identifyLoading = false
        })
      } else {
        this.$store.dispatch('auth/handleToMonitBack', { id }).then((res) => {
          this.$notify({
            title: res || '操作成功',
            message: '权限已修改',
            type: 'success'
          })
        }).catch(() => {
          this.$notify({
            title: '操作失败',
            message: '权限修改失败',
            type: 'error'
          })
        }).finally(() => {
          this.identifyLoading = false
        })
      }
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
