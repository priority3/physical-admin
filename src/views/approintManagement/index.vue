<template>
  <div class="app-container">
    <!-- 搜索内容 -->
    <div>
      <div class="header-box">
        <div class="input-box">
          <el-input v-model="listQuery.name" placeholder="请输入名称..." clearable />
          <el-date-picker v-model="listQuery.day" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
          <el-select v-model="listQuery.semester" placeholder="选择学期" clearable>
            <el-option v-for="item in semesterDataList" :key="item.value" :label="item.label" :value="item.label" />
          </el-select>
        </div>
        <div class="btn-box">
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="primary" @click="$refs.form.addAppiontInfo()">新建</el-button>
        </div>
      </div>
    </div>
    <el-table v-loading="tableLoading" :data="list" style="width: 100%;margin-top: 40px;">
      <el-table-column prop="name" label="体测项目" />
      <el-table-column prop="day" label="体测时间" />

      <el-table-column prop="location" label="体测地点" />

      <el-table-column prop="teacherInfo.name" label="责任老师" />

      <el-table-column label="操作" width="250">
        <div slot-scope="scope" class="btn-fun-box">
          <el-button type="success" size="small" @click="$refs.form.open(scope.row)">编辑</el-button>
          <el-button type="success" size="small" @click="openUserInfo(scope.row)">预约列表</el-button>
          <el-button type="danger" size="small" :loading="deleLoading" @click="deleteListItem(scope.row)">删除</el-button>
        </div>
      </el-table-column>
    </el-table>

    <pagination :style="{ textAlign: 'right' }" :total="pagination.total" :size="pagination.size"
      :current-page="pagination.current" :page-sizes="pagination.pageSizeOptions"
      @pagination="handlePaginationChanged" />
    <detail-form ref="form" @complete="getList" />
  </div>
</template>

<script>
import pagination from '@/components/Pagination/index.vue'
import detailForm from './form.vue'
import list from '@/layout/mixin/list.js'
export default {
  name: 'UserAppoint',
  components: {
    pagination,
    detailForm
  },
  mixins: [list],
  data() {
    return {
      listQuery: {
        name: undefined,
        day: undefined,
        semester: undefined
      },
      baseApi: 'list/getList',
      deleteApi: 'list/delListItem',
      semesterList: []
    }
  },
  computed: {
    semesterDataList(self) {
      return self.semesterList?.map((item, index) => {
        return {
          value: index,
          label: item
        }
      }) ?? []
    }
  },
  created() {
    this.handleGetSemesterList()
  },
  methods: {
    // 打开预约列表
    openUserInfo(data) {
      const { name, id } = data
      // vuex 页面刷新 数据会刷新
      // this.$store.commit('list/SET_PARAMS_INFO', { name, id })
      sessionStorage.setItem('name', name)
      sessionStorage.setItem('id', id)
      this.$router.push({
        path: `/appoint-detail/user-appoint-detail?name=${name}&id=${id}`
      })
    },
    // 获得学期列表
    handleGetSemesterList() {
      this.$store.dispatch('list/handleGetSemester').then((res) => {
        this.semesterList = res.data
      })
    }

  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/tableHeader.scss";

// 修改 在移动端下 按钮 上下不对成的样式问题
@media screen and (max-width: 768px) {
  .app-container {
    .cell {
      .el-button {
        margin-left: 0;
      }
    }
  }

  .btn-fun-box {
    gap: 10px;
  }
}

@media screen and (max-width: 1134px) {
  .btn-fun-box {
    flex-direction: column;
    justify-content: center;
    gap: 10px;

    .el-button {
      width: 30%;
    }
  }

  .btn-fun-box .el-button+.el-button {
    margin-left: 0;
  }
}

.btn-fun-box {
  display: flex;
  flex-wrap: wrap;
}
</style>
