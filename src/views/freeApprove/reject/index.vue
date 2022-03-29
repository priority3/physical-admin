<template>
  <div>
    <el-dialog title="申请详细信息" :visible.sync="outerVisible">
      <el-form ref="rejectForm" :model="form" label-width="100px" label-position="left">
        <el-form-item
          label="驳回理由"
          prop="reason"
          :rules="{
            required: true, message: '请输入驳回理由', trigger: 'blur'
          }"
        >
          <el-input v-model="form.reason" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleReject($refs['rejectForm'])">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      outerVisible: false,

      form: {
        reason: '',
        id: ''
      }
    }
  },
  methods: {
    open({ id }) {
      this.outerVisible = true
      this.form.id = id
    },
    validForm(form) {
      return new Promise((resolve, reject) => {
        form.validate((valid) => {
          if (valid) {
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    async handleReject(form) {
      await this.validForm(form)
      this.$store.dispatch('student/handleRejectStu', this.form).then((res) => {
        this.$notify({
          title: '操作成功',
          message: '已拒绝该学生的申请'
        })
      }).catch((err) => {
        this.$notify.error({
          title: '操作失败',
          message: err
        })
      })
    }
  }
}
</script>
