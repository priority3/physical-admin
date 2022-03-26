<template>
  <div>
    <el-table v-loading="tableLoading" :data="list" border style="width: 100%">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="grade" label="年级" />
      <el-table-column prop="schoolClass" label="班级" />
      <el-table-column prop="college" label="学院" />
      <el-table-column prop="specialty" label="专业" />
      <el-table-column prop="userName" label="学号" />
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click="deleteListItem(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import list from '@/layout/mixin/list.js'
export default {

  mixins: [list],
  data() {
    return {
      baseApi: 'student/handleGetFreeStuInfo',
      deleteApi: 'student/handleDeleteFreeInfo',
      exportApi: 'student/handleExportFreeInfo'
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
