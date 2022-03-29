<template>
  <div>
    <el-dialog title="申请详细信息" :visible.sync="outerVisible">
      <el-dialog width="30%" title="申请理由图片" :visible.sync="innerVisible" append-to-body />

      <el-descriptions title="用户信息">
        <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
        <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
        <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
        <el-descriptions-item label="备注">
          <el-tag size="small">学校</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
      </el-descriptions>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
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
      list: []
    }
  },
  computed: {

  },
  methods: {
    open(data) {
      this.list = data
      this.outerVisible = true
    }
  }
}
</script>
