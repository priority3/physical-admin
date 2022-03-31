<template>
  <div>
    <el-dialog title="填写理由" :visible.sync="outerVisible">
      <el-form ref="rejectForm" :model="form" label-width="100px" label-position="left">
        <el-form-item
          :label="modelMap['dialog-title']"
          prop="reason"
          :rules="{
            required: true, message: modelMap['dialog-message'], trigger: 'blur'
          }"
        >
          <el-input v-model="form.reason" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="btnLoading"
          @click="handleReject($refs['rejectForm'])"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      outerVisible: false,
      // 驳回 or 同意
      delOrApr: 0,
      form: {
        reason: '',
        id: ''
      },
      btnLoading: false
    }
  },
  computed: {
    modelMap(self) {
      return self.delOrApr
        ? {
          'dialog-title': '同意理由',
          'dialog-message': '请输入理由'
        } : {
          'dialog-title': '驳回理由',
          'dialog-message': '请输入理由'
        }
    },
    handleApi(self) {
      return self.delOrApr ? 'student/handleApproveFree' : 'student/handleRejectStu'
    }
  },
  methods: {
    open({ id }, delOrApr) {
      this.delOrApr = delOrApr
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
      this.btnLoading = true
      this.$store.dispatch(this.handleApi, this.form).then((res) => {
        this.$notify({
          title: '操作成功',
          type: 'success'
        })
      }).catch((err) => {
        this.$notify.error({
          title: '操作失败',
          message: err,
          type: 'error'
        })
      }).finally(() => {
        this.btnLoading = false
      })
    }
  }
}
</script>
