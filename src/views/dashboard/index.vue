<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <div class="dashboard-title">
      体测预约管理后台管理端
    </div>
    <div class="dashboaed-box">
      <div class="dashboard-item">
        <div class="item-cont">
          <span>学生预约</span>
          <i class="el-icon-right" />
        </div>
      </div>
      <div class="dashboard-item">
        <div class="item-cont">
          <span>学生信息</span>
          <i class="el-icon-right" />
        </div>
      </div>
      <div class="dashboard-item">
        <div class="item-cont">
          <span>个人信息</span>
          <i class="el-icon-right" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container{
  height:calc(100vh - 70px);
  .dashboard-title{
    font-size:30px;
    font-weight:bold;
    color:rgb(58, 71, 71);
    text-align:center;
    margin-top:20px;
  }
  .dashboaed-box{
    height:inherit;
    display:flex;
    justify-content:space-around;
    align-items:center;
    flex-wrap: wrap;
    // 加gap在于 在适配响应式可以自动加上间隔 不会出现框挤在一起的情况
    gap:20px;
    .dashboard-item{
      width:300px;
      height:300px;
      cursor: pointer;
      border-radius:15px;
      background: linear-gradient(45deg, #ccf1ee 0%, #aff394 100%);
      box-shadow: 5px 5px 10px #ccc;
      // margin-left: -50px;
      transition:all .3s;
      position: relative;
      .item-cont{
        position: absolute;
        top: 50%;
        left:50%;
        transform: translate(-50%,-50%);
        font-size: 20px;
        font-weight: 600;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        color: rgb(70, 70, 70);
        display:flex;
        width:70%;
        justify-content:space-between;
        align-items: center;
        .el-icon-right{
          transition:all .3s;
        }
      }
  }
  .dashboard-item:hover{
    transform:translateX(50px) rotate(3deg);
    .el-icon-right{
      transform:scale(3);
    }
  }

  }
  }

@media screen and (max-width:623px){
  .dashboard-container{
    height:auto;
  }
}

</style>
