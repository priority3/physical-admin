<template>
  <div>
    <el-dialog title="学生信息" :visible.sync="dialogVisible" width="50%">
      <el-descriptions :column="2">
        <el-descriptions-item label="姓名">{{ curList.name }}</el-descriptions-item>
        <el-descriptions-item label="学号">{{ curList.userName }}</el-descriptions-item>
        <el-descriptions-item label="学院">{{ curList.college }}</el-descriptions-item>
        <el-descriptions-item label="性别">
          <el-tag size="small">{{ curList.sex }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="curList.handler" label="审批人">
          <el-tag size="small" type="success">{{ curList.handler }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item span="2" label="申请理由">{{ curList.reason }}</el-descriptions-item>
        <el-descriptions-item label="图片说明" content-class-name="detail-images-container">
          <div v-for="item in curList.images" :key="item.id">
            <el-image
              style="width: 150px; height: 150px"
              :src="baseURL + item"
              fit="fit"
              :preview-src-list="curList.images | handleGetAllimg(baseURL)"
            />
          </div>
        </el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  filters: {
    handleGetAllimg(value, baseURL) {
      return value?.map((item) => {
        return baseURL + item
      }) ?? []
    }
  },
  data() {
    return {
      dialogVisible: false,
      curList: [],
      baseURL: `${process.env.VUE_APP_BASE_API}/images`
    }
  },
  computed: {
    getImages(self) {
      return self.dataList.userImages.map(item => {
        return `${this.ipURL}${item}`
      })
    }
  },
  methods: {
    open(data) {
      console.log(data)
      this.curList = data
      this.dialogVisible = true
    }
  }
}
</script>
