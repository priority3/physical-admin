<template>
  <div>
    <el-table v-loading="tableLoading" :data="list" border style="width: 100%">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="grade" label="年级" />
      <el-table-column prop="specialtyClass" label="专业班级" />
      <el-table-column prop="userName" label="学号" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="nationality" label="名族代码" />
      <el-table-column prop="birth" label="出生日期" />
      <el-table-column prop="idCard" label="身份证号" />
      <el-table-column prop="semester" label="申请学期" />
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="$refs['detail'].open(scope.row)">详情</el-button>
          <el-button size="small" type="warning" @click="$refs['dialogApply'].open(scope.row, 0)">驳回申请</el-button>
          <el-button size="small" type="danger" @click="deleteListItem(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :style="{ textAlign: 'right' }" :total="pagination.total" :size="pagination.size"
      :current-page="pagination.current" :page-sizes="pagination.pageSizeOptions"
      @pagination="handlePaginationChanged" />
    <reject-approve ref="dialogApply" @complete="getList" />
    <detail-info ref="detail" />
  </div>
</template>

<script>
import pagination from '@/components/Pagination/index.vue'
import list from '@/layout/mixin/list.js'
import rejectApprove from '@/components/reject-approve'
import detailInfo from '@/components/detailInfo'
export default {
  components: {
    pagination,
    rejectApprove,
    detailInfo

  },
  mixins: [list],
  data() {
    return {
      baseApi: 'student/handleGetFreeStuInfo',
      deleteApi: 'student/handleDeleteFreeInfo',
      exportApi: 'student/handlePostExcelFreeStu'

    }
  },
  computed: {
    listQuery(self) {
      return {
        ...self.$attrs['table-list-query']
      }
    }
  },
  created() {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
</style>
