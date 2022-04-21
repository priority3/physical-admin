<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <div class="dashboard-title">体测预约管理后台管理端</div>
    <div class="dashboaed-box">
      <div
        v-for="(item, index) in itemCardList"
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
    <el-divider content-position="left" />
    <div class="infobox-container app-container">
      <el-row>
        <el-col :md="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>学期管理</span>
              <el-button
                type="success"
                icon="el-icon-plus"
                circle
                style="float:right;"
                size="mini"
                @click="dialogVisible = true"
              />
            </div>
            <div v-for="(item, index) in semesterDataList" :key="index" class="item-card">
              <div class="card-left-cont">{{ item.value }}</div>
              <div class="card-right-btn">
                <el-popconfirm title="确定删除该学期嘛" @confirm="handleDelSemester(item.value)">
                  <el-button slot="reference">
                    <el-button type="danger" icon="el-icon-delete" circle size="mini" />
                  </el-button>
                </el-popconfirm>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 添加学期 -->
    <el-dialog title="添加学期" :visible.sync="dialogVisible" width="50%">
      <el-input v-model="addsemester" placeholder="请输入添加的学期名称" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddSemester">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { CARD_MAP } from '@/constants'
export default {
  name: 'Dashboard',
  data() {
    return {
      itemCard: [],
      semesterList: [],
      dialogVisible: false,
      addsemester: ''
    }
  },
  computed: {
    semesterDataList(self) {
      return self.semesterList?.map((item, index) => {
        return {
          value: item
        }
      }) ?? []
    },
    itemCardList(self) {
      const { roles } = self.$store.getters
      return CARD_MAP[roles]
    }
  },
  mounted() {
    this.handleGetSemester()
  },
  methods: {
    switchTab(path) {
      this.$router.push({ path })
    },
    handleGetSemester() {
      this.$store.dispatch('list/handleGetSemester').then((res) => {
        this.semesterList = res.data
      })
    },
    handleAddSemester() {
      if (this.addsemester.trim() === '') {
        this.$notify({
          title: '格式错误',
          message: '请输入学期名称',
          type: 'warning'
        })
        return
      }
      this.$store.dispatch('list/handleAddSemester', { semester: this.addsemester }).then((res) => {
        this.$notify({
          title: '操作成功',
          message: '添加学期成功',
          type: 'success'
        })
        this.handleGetSemester()
      }).catch(() => {
        this.$notify({
          title: '操作失败',
          message: '添加失败，请稍后重试！',
          type: 'danger'
        })
      }).finally(() => {
        this.dialogVisible = false
      })
    },
    handleDelSemester(semester) {
      this.$store.dispatch('list/handleDelSemester', { semester }).then((res) => {
        this.$notify({
          title: '操作成功',
          message: '添加学期成功',
          type: 'success'
        })
        this.handleGetSemester()
      }).catch(() => {
        this.$notify({
          title: '操作失败',
          message: '添加失败，请稍后重试！',
          type: 'danger'
        })
      })
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
    // height: inherit;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
    // 加gap在于 在适配响应式可以自动加上间隔 不会出现框挤在一起的情况
    gap: 20px;
    margin-top: 50px;
    .dashboard-item {
      width: 200px;
      height: 200px;
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
.clearfix {
  // display: flex;
  // align-items: center;
  // justify-content: space-evenly;
  // width: inherit;
}
.box-card {
  .item-card {
    position: relative;
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    .card-right-btn {
      opacity: 0;
      transition: all 0.1s;
    }
    &:hover .card-right-btn {
      opacity: 1;
    }
  }
}

@media screen and (max-width: 623px) {
  .dashboard-container {
    height: auto;
    .dashboard-title {
      font-size: 20px;
    }
    .dashboaed-box {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .dashboard-item {
        // width: 250px;
        // height: 250px;
      }
    }
  }
}
</style>
