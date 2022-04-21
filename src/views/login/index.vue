<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-box-title">
        <span>优体测后台管理端登录</span>
        <self-form custom-style="width:80%;margin:50px auto;" />
      </div>
    </div>
  </div>
</template>

<script>
import selfForm from './selfForm/index'
export default {
  components: { selfForm },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  // background-image: url("../../assets/bgc_logo.png");
  background-image: linear-gradient(45deg, #464c7c, #2485a2, #04bfc8);
  height: 100vh;
  width: 100vw;
  position: relative;

  .login-box {
    position: absolute;
    height: 400px;
    width: 500px;
    border-radius: 10px;
    // border: 1px solid #cfcfcf;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    background-color: #f1f1f1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    .login-box-title {
      font-size: 30px;
      font-weight: 520;
      margin: 20px 0;
      color: #4f94e8;
    }
  }
}
</style>
