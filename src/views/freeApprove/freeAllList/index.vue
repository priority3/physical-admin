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
          <el-button type="primary" size="small" @click>详情</el-button>
          <el-button type="danger" size="small" :loading="item.rejectLoading" @click>驳回申请</el-button>
          <el-button type="success" size="small" :loading="item.approveLoading" @click>通过</el-button>
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
  </div>
</template>

<script>
import list from '@/layout/mixin/list'
import pagination from '@/components/Pagination/index.vue'
export default {
  components: {
    pagination
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
  }
}
</script>

<style lang="scss" scoped>
</style>
