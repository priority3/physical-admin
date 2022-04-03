<template>
  <div>
    <!-- 表格数据 -->
    <el-table v-loading="tableLoading" :data="tableList" style="width: 100%;margin-top: 40px;">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="userName" label="学号" />
      <el-table-column prop="grade" label="年级" />
      <el-table-column prop="specialty" label="专业" />
      <el-table-column prop="schoolClass" label="班级" />
      <el-table-column label="操作" width="250">
        <div slot-scope="scope" class="btn-fun-box">
          <el-button type="primary" size="small" @click="dialogVisible = true">详情</el-button>
          <el-button
            type="danger"
            size="small"
            :loading="item.rejectLoading"
            @click="$refs['dialogApply'].open(scope.row, 0)"
          >驳回申请</el-button>
          <el-button
            type="success"
            size="small"
            :loading="item.approveLoading"
            @click="$refs['dialogApply'].open(scope.row, 1)"
          >通过</el-button>
        </div>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination
      :style="{ textAlign: 'right' }"
      :total="pagination.total"
      :size="pagination.size"
      :current-page="pagination.current"
      :page-sizes="pagination.pageSizeOptions"
      @pagination="handlePaginationChanged"
    />
    <el-dialog title="用户信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-descriptions>
        <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
        <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
        <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
        <el-descriptions-item label="备注">
          <el-tag size="small">学校</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
    <reject-rpprove ref="dialogApply" />
  </div>
</template>

<script>
import list from '@/layout/mixin/list'
import pagination from '@/components/Pagination/index.vue'
import rejectRpprove from './reject-approve'
export default {
  components: {
    pagination,
    rejectRpprove
  },
  mixins: [list],
  props: {

  },
  data() {
    return {
      baseApi: 'student/handleGetFreeStuInfo'
    }
  },
  computed: {
    tableList(self) {
      return self.list?.map((item) => {
        return {
          ...item
        }
      })
    },
    listQuery(self) {
      return self.$attrs['table-list-query']
    }
  },
  methods: {
    // 驳回申请
    rejectFreeInfo() {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
