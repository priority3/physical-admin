<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <user-card>
              <div>hello</div>
              <div>{{ $store.getters.name }}</div>
            </user-card>
          </div>
          <div class="password-container">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
              <el-form-item label="原密码" prop="prePassword">
                <el-input v-model="form.prePassword" type="password" placeholder="请输入原密码" />
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <el-input v-model="form.newPassword" type="password" placeholder="请输入新密码" />
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input v-model="form.confirmPassword" type="password" placeholder="请输入确认密码" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="fixedSubmit($refs['form'])">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :span="16" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
          </div>
          <activity />
        </el-card>
      </el-col>-->
    </el-row>
  </div>
</template>

<script>
import userCard from './user-card'
// import activity from './activity'
// import { selfConfirm } from '@/utils/notice'
export default {
  components: {
    userCard
    // activity
  },
  data() {
    const checkIsSame = (rule, value, callback) => {
      const { confirmPassword, newPassword } = this.form
      if (confirmPassword !== newPassword) {
        callback(new Error('两次密码必须一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        prePassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        prePassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: checkIsSame, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    valid(form) {
      return new Promise((resolve, reject) => {
        form.validate((valid) => {
          if (valid) {
            resolve()
          } else {
            this.$message({
              message: '请检查表单是否填写有误',
              type: 'error'
            })
            reject()
          }
        })
      })
    },
    async fixedSubmit(form) {
      await this.valid(form)
      this.$confirm('更改密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('user/updatePwd', this.form).then(() => {
          this.$notify({
            message: '密码修改成功',
            type: 'success'
          })
        }).catch((err) => {
          this.$message({
            message: err || '密码修改失败',
            type: 'error'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    }
  }
}
</script>

<style lang='scss' scope>
.box-card {
  text-align: center;
}
</style>
