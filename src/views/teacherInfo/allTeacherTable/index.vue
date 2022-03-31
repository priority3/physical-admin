<template>
  <div>
    <el-table v-loading="tableLoading" :data="list" border style="width: 100%">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="userName" label="学工号" />
      <el-table-column prop="college" label="学院" />
      <el-table-column prop="phone" label="联系方式" />
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click="deleteListItem(scope.row)">删除</el-button>
          <el-button size="small" type="danger" @click="deleteListItem(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
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
import list from '@/layout/mixin/list.js'
import pagination from '@/components/Pagination/index.vue'

export default {
  components: {
    pagination
  },
  mixins: [list],
  data() {
    return {
      baseApi: 'list/getTeachInfo',
      deleteApi: 'student/handleDeleteStuInfo',
      exportApi: 'student/handleExcelAllStu'
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
