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
      <el-table-column label="操作" width="250">
        <div slot-scope="scope" class="btn-fun-box">
          <el-button type="primary" size="small" @click="showDetail(scope.row)">详情</el-button>
          <el-button type="danger" size="small" @click="$refs['dialogApply'].open(scope.row, 0)">驳回申请</el-button>
          <el-button type="success" size="small" @click="$refs['dialogApply'].open(scope.row, 1)">通过</el-button>
        </div>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination :style="{ textAlign: 'right' }" :total="pagination.total" :size="pagination.size"
      :current-page="pagination.current" :page-sizes="pagination.pageSizeOptions"
      @pagination="handlePaginationChanged" />
    <el-dialog title="学生信息" :visible.sync="dialogVisible" width="50%">
      <el-descriptions :column="2">
        <el-descriptions-item label="姓名">{{ curList.name }}</el-descriptions-item>
        <el-descriptions-item label="学号">{{ curList.userName }}</el-descriptions-item>
        <el-descriptions-item label="学院">{{ curList.college }}</el-descriptions-item>
        <el-descriptions-item label="性别">
          <el-tag size="small">{{ curList.sex }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item span="2" label="申请理由">{{ curList.reason }}</el-descriptions-item>
        <el-descriptions-item label="图片说明" content-class-name="detail-images-container">
          <div v-for="item in curList.images" :key="item.id">
            <el-image style="width: 150px; height: 150px" :src="baseURL + item" fit="fit"
              :preview-src-list="curList.images | handleGetAllimg(baseURL)" />
          </div>
        </el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <reject-approve ref="dialogApply" @complete="getList" />
  </div>
</template>

<script>
import list from '@/layout/mixin/list'
import pagination from '@/components/Pagination/index.vue'
import rejectApprove from '../components/reject-approve'
export default {
  components: {
    pagination,
    rejectApprove

  },
  filters: {
    handleGetAllimg(value, baseURL) {
      return value?.map((item) => {
        return baseURL + item
      }) ?? []
    }
  },
  mixins: [list],
  props: {

  },
  data() {
    return {
      baseApi: 'student/handleGetFreeStuInfo',
      exportApi: 'student/handlePostExcelFreeStu',

      dialogVisible: false,
      baseURL: process.env.VUE_APP_BASE_API + '/images',
      curList: []
    }
  },
  computed: {
    dataList(self) {
      return self.list?.map((item) => {
        return {
          ...item
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
