<template>
  <div class="form-container" :style="customStyle">
    <el-form ref="loginForm" :model="formInline" label-position="left" label-width="80px" :rules="loginRules">
      <el-form-item label="用户名" prop="userName" class="itemlabel">
        <el-input v-model="formInline.userName" placeholder="请输入用户名..." />
      </el-form-item>
      <el-form-item label="密码" prop="password" class="itemlabel">
        <el-input ref="password" v-model="formInline.password" :type="passwordType" placeholder="请输入密码..." />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
    </el-form>
    <el-button type="primary" style="width:200px;" :loading="btnLoading" @click.native.prevent="handleLogin">登录
    </el-button>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
export default {
  name: 'SlefForm',
  components: {
  },
  props: {
    customStyle: {
      type: String,
      default: ''
    }
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (validUsername(value)) {
        callback(new Error('用户名不能为空！！'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      formInline: {
        userName: '',
        password: ''
      },
      loginRules: {
        userName: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      btnLoading: false,
      passwordType: 'password'
    }
  },
  watch: {
    // 监听路由,每次刷新都是原来的路由
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // console.log(this.$store)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.btnLoading = true
          this.$store
            .dispatch('user/login', this.formInline)
            .then(() => {
              // 保证登录退出 之后登录回到原来的页面
              this.$router.push({ path: this.redirect || '/' }, onComplete => { }, onAbort => { })
              this.btnLoading = false
            })
            .catch(() => {
              this.btnLoading = false
              this.$message({
                message: '登录失败,请稍后重试',
                type: 'error'
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  width: 100%;
}

.itemlabel {
  position: relative;

  ::v-deep .el-input__inner {
    background-color: #f1f1f1;
    border: 0;
    border-bottom: 1px solid #cfcfcf;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 5px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }
}
</style>
