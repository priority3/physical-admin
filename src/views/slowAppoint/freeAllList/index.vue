<template>
  <div>
    <!-- 表格数据 -->
    <el-table v-loading="tableLoading" :data="dataList" style="width: 100%;margin-top: 40px;">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="grade" label="年级" />
      <el-table-column prop="specialtyClass" label="专业班级" />
      <el-table-column prop="userName" label="学号" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="nationality" label="名族代码" />
      <el-table-column prop="birth" label="出生日期" />
      <el-table-column prop="idCard" label="身份证号" />
      <el-table-column prop="semester" label="申请学期" />
      <el-table-column prop="isPass" label="审核状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.curTag" disable-transitions>{{ scope.row.isPass }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <div slot-scope="scope" class="btn-fun-box">
          <el-button size="small" type="primary" @click="$refs['detail'].open(scope.row)">详情</el-button>
          <el-button size="small" type="danger" :loading="deleLoading" @click="deleteListItem(scope.row)">删除申请
          </el-button>
        </div>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination :style="{ textAlign: 'right' }" :total="pagination.total" :size="pagination.size"
      :current-page="pagination.current" :page-sizes="pagination.pageSizeOptions"
      @pagination="handlePaginationChanged" />
    <detail-info ref="detail" />
  </div>
</template>

<script>
import list from '@/layout/mixin/list'
import pagination from '@/components/Pagination/index.vue'
import detailInfo from '../components/detailInfo'
export default {
  components: {
    pagination,
    detailInfo
  },

  mixins: [list],
  props: {

  },
  data() {
    return {
      baseApi: 'student/handleGetFreeStuInfo',
      exportApi: 'student/handlePostExcelFreeStu',
      deleteApi: 'student/handleDeleteFreeInfo',
      dialogVisible: false,
      baseURL: process.env.VUE_APP_BASE_API + '/images',
      curList: []
    }
  },
  computed: {
    dataList(self) {
      return self.list?.map((item) => {
        let curIspass = ''
        let curTag = ''
        switch (item.isPass) {
          case '0': {
            curIspass = '审核中'
            curTag = 'warning'
            break
          }
          case '1': {
            curIspass = '已通过'
            curTag = 'success'
            break
          }
          case '2': {
            curIspass = '已驳回'
            curTag = 'danger'
            break
          }
          default:
            break
        }
        return {
          ...item,
          isPass: curIspass,
          curTag
        }
      })
    },
    listQuery(self) {
      return {
        ...self.$attrs['table-list-query']
      }
    },
    isImages(self) {
      return self.curList.images.length > 0
    }
  },
  methods: {
    // 驳回申请
    rejectFreeInfo() {

    },
    showDetail(data) {
      this.dialogVisible = true
      this.curList = data
    }
  }
}
</script>

<style lang="scss" >
.detail-images-container {
  width: 100%;
  flex-wrap: wrap;
  gap: 20px;
}

@media screen and (max-width: 768px) {
  .detail-images-container {
    display: flex;
    flex-direction: column;
  }
}
</style>
