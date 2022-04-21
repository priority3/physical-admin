<template>
  <div class="app-container">
    <div>
      <!-- 搜索内容 -->
      <div>
        <div class="header-box">
          <div class="input-box">
            <el-input v-model="listQuery.userName" placeholder="请输入学号..." />
            <el-input v-model="listQuery.name" placeholder="请输入姓名..." />
          </div>
          <div class="btn-box">
            <el-button type="primary" @click="$refs[curtabTable].onSearch(listQuery)">查询</el-button>
          </div>
          <div class="btn-box">
            <el-select v-model="listQuery.semester" placeholder="导出学期选择" clearable>
              <el-option v-for="item in semesterDataList" :key="item.value" :label="item.label" :value="item.label" />
            </el-select>
            <el-button type="primary" @click="$refs[curtabTable].onExport(listQuery, curtabName, tableListQuery)">导出{{
              curtabName
            }}</el-button>
          </div>
        </div>
      </div>
    </div>

    <tabs v-model="curtabTable" :tabspanel="tabspanel">
      <template slot="tab-content">
        <component :is="curtabTable" :ref="curtabTable" :table-list-query="tableListQuery" />
      </template>
    </tabs>
    <excel-import ref="excelDailog" :example-url="exampleUrl" :upload-url="uploadUrl"
      @complete="$refs[curtabTable].getList()" />
  </div>
</template>

<script>
import tabs from '@/components/tabs'
import ExcelImport from '@/components/ExcelImport/index.vue'
import { FREE_REJECT_APPROVE_MAP, FREE_LIST_INFO } from '@/constants/index.js'
export default {
  name: 'FreeApprove',
  components: {
    tabs,
    ExcelImport,
    free_all_list: () => import('./freeAllList/index.vue'),
    free_passed_list: () => import('./freePassedList/index.vue'),
    free_not_pass_list: () => import('./freeNotPassList/index.vue'),
    free_is_passing_list: () => import('./freeIsPassingList/index.vue')
  },
  data() {
    return {
      listQuery: {
        userName: undefined,
        name: undefined,
        semester: undefined
      },
      exampleUrl: '',
      uploadUrl: '',
      semesterList: [],
      curtabTable: 'free_is_passing_list',
      tabspanel: [
        {
          'tab-name': '审批中',
          'tab-key': 'free_is_passing_list'
        }, {
          'tab-name': '已通过',
          'tab-key': 'free_passed_list'
        }, {
          'tab-name': '已驳回',
          'tab-key': 'free_not_pass_list'
        }, {
          'tab-name': '免测申请',
          'tab-key': 'free_all_list'
        }]
    }
  },
  computed: {
    // params 请求参数
    tableListQuery(self) {
      return {
        'isPass': FREE_REJECT_APPROVE_MAP[self.curtabTable],
        'type': FREE_LIST_INFO['slow_free_list']
      }
    },
    tableExportQuery(self) {
      return []
    },
    // 当前列表名字
    curtabName(self) {
      return self.tabspanel.find(item => item['tab-key'] === self.curtabTable)['tab-name'] ?? ''
    },
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
    // 同意免测
    handleApproveFree({ id }) {
      this.$store.dispatch('student/handleApproveFree', id).then((res) => {
        this.$notify({
          title: '操作成功',
          message: '已同意免测申请'
        })
      }).catch((err) => {
        this.$notify({
          title: '操作失败',
          message: err || '未知错误'
        })
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
    text-align: center;
    gap: 10px;
  }

  .btn-fun-box .el-button+.el-button {
    margin-left: 0;
  }
}

.btn-fun-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>
