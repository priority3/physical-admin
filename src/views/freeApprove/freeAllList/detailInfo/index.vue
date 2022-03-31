<template>
  <div>
    <el-dialog title="申请详细信息" :visible.sync="outerVisible">
      <el-dialog width="30%" title="申请理由图片" :visible.sync="innerVisible" append-to-body>
        <div v-for="(item, index) in dataList.userImages" :key="index">
          <el-image
            style="width: 200px; height: 200px"
            :src="ipURL + item"
            fit="fit"
            :preview-src-list="getImages"
          />
        </div>
      </el-dialog>

      <el-descriptions>
        <el-descriptions-item label="姓名">{{ dataList.userName }}</el-descriptions-item>
        <el-descriptions-item label="学号">{{ dataList.userId }}</el-descriptions-item>
        <el-descriptions-item label="学院">{{ dataList.userName }}</el-descriptions-item>
        <el-descriptions-item label="学期">
          <el-tag size="mini" type="success">{{ dataList.userSemester }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="班级">{{ dataList.userClass }}</el-descriptions-item>
        <el-descriptions-item label="申请图片">
          <el-button type="primary" size="mini" @click="innerVisible = true">查看</el-button>
        </el-descriptions-item>
        <el-descriptions-item label="申请理由">{{ dataList.userReason }}</el-descriptions-item>
      </el-descriptions>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      outerVisible: false,
      innerVisible: false,
      list: [],
      ipURL: `${process.env.VUE_APP_BASE_API}/images`
    }
  },
  computed: {
    dataList(self) {
      const { list } = self
      return {
        // 姓名
        userName: list['name'],
        // 性别
        userSex: list['sex'],
        // 学号
        userId: list['userName'],
        // 学院
        userCollege: list['college'],
        // 学期
        userSemester: list['semester'],
        // 班级
        userClass: list['specialty'] + list['schoolClass'],
        // 申请理由
        userReason: list['reason'],
        // 申请图片
        userImages: list['images']
      }
    },
    getImages(self) {
      return self.dataList.userImages.map(item => {
        return `${this.ipURL}${item}`
      })
    }
  },
  methods: {
    open(data) {
      console.log(data)
      this.list = data
      this.outerVisible = true
    }
  }
}
</script>
