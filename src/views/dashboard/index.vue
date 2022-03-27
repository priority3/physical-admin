<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <div class="dashboard-title">体测预约管理后台管理端</div>
    <div class="dashboaed-box">
      <div
        v-for="(item, index) in itemCard"
        :key="index"
        class="dashboard-item"
        @click="switchTab(item.path)"
      >
        <div class="item-cont">
          <span>{{ item.name }}</span>
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
      itemCard: [{
        name: '学生预约',
        path: '/appoint/user-appoint'
      }, {
        name: '学生信息',
        path: '/appoint/stu-info'
      }, {
        name: '个人信息',
        path: '/user/info'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    switchTab(path) {
      this.$router.push({ path })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  height: calc(100vh - 70px);
  .dashboard-title {
    font-size: 30px;
    font-weight: bold;
    color: rgb(58, 71, 71);
    text-align: center;
    margin-top: 20px;
  }
  .dashboaed-box {
    height: inherit;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    // 加gap在于 在适配响应式可以自动加上间隔 不会出现框挤在一起的情况
    gap: 20px;
    .dashboard-item {
      width: 300px;
      height: 300px;
      cursor: pointer;
      border-radius: 15px;
      background: linear-gradient(45deg, #43a2d4, #f2fcfe);
      box-shadow: 5px 5px 10px #ccc;
      // margin-left: -50px;
      transition: all 0.3s;
      position: relative;
      .item-cont {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 20px;
        font-weight: 600;
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
          "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
        color: #ffffff;
        display: flex;
        width: 70%;
        justify-content: space-between;
        align-items: center;
        .el-icon-right {
          transition: all 0.3s;
        }
      }
    }
    .dashboard-item:hover {
      transform: translateX(50px) rotate(3deg);
      .el-icon-right {
        transform: scale(3);
      }
    }
  }
}

@media screen and (max-width: 623px) {
  .dashboard-container {
    height: auto;
    .dashboard-title {
      font-size: 25px;
    }
    .dashboaed-box {
      margin-top: 20px;
      display: flex;
      flex-direction: column;

      .dashboard-item {
        width: 250px;
        height: 250px;
      }
    }
  }
}
</style>
