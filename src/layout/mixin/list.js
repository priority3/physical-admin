// 去获取tableList数据
export default {
  data() {
    return {
      // 请求接口的基础路径
      baseApi: '',
      // 删除接口的路径
      deleteApi: '',
      // 列表数据
      list: [],

      // 分页数据
      pagination: {
        // 每页显示条数
        size: 5,
        // 当前为第几页
        current: 1,
        // 总共数据
        total: 0,
        // showSizeChanger: true,
        // 可选的pagesize参数
        pageSizeOptions: [5, 15, 21, 42, 60]
      },
      // 是否加载数据
      isFirstGetlist: true,

      params: {},
      // 数据请求状态
      tableLoading: false,
      // 查询按钮的加载状态
      // searchLoading: false,
      // 导出按钮状态
      // exportLoading: false,
      // 删除按钮的loading
      deleLoading: false
    }
  },
  methods: {
    getList() {
      const { size, current } = this.pagination
      const params = this.rebuildParams({ size, current })
      this.tableLoading = true
      this.$store.dispatch(this.baseApi, params).then((res) => {
        const { size, total, records, current } = res.data
        this.list = records
        this.pagination.total = total
        this.pagination.current = current
        this.pagination.size = size
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        this.tableLoading = false
      })
    },
    // 查找
    async onSearch(query, searchLoading) {
      console.log(query)
      if (query) {
        this.params = this.rebuildParams(query)
      }
      this.size = this.pagination.pageSizeOptions[0]
      this.current = 1
      this.params = this.mergeParams()
      await this.getList()
      console.log(searchLoading)
    },
    // 导出
    onExport(id) {
      this.$store.dispatch(this.exportApi, { id }).then((res) => {
        this.$notify({
          title: '导出成功',
          message: '导出学生信息成功',
          type: 'success'
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 将列表查询参数和混合参数合并
    mergeParams() {
      return Object.assign(this.params, this.listQuery)
    },
    // 分页改变触发
    handlePaginationChanged(e) {
      console.log(e)
      const { page, size } = e
      this.pagination.current = page
      this.pagination.size = size
      this.getList()
    },
    // 详情按钮
    handleClick(row) {
      console.log(row)
    },
    // 学期下拉 更改学期信息
    handleGetSemester(e) {
      this.addForm.semester = this.options.filter((item) => {
        return item.value === e
      })[0].label
    },
    // 删除某个预约
    deleteListItem({ id }) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleLoading = true
        this.$store.dispatch(this.deleteApi, { id }).then((res) => {
          if (res.code === 200) {
            this.$notify({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          } else {
            this.$notify({
              type: 'warning',
              message: '删除失败!'
            })
          }
        }
        ).catch((err) => {
          console.log(err)
          this.$notify({
            type: 'warning',
            message: '删除失败!'
          })
        }).finally(() => {
          this.deleLoading = false
        })
      }).catch(() => {
        // this.$notify({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    },
    // 重新构建请求参数
    rebuildParams(curParams) {
      let par = this.params
      if (this.listQuery) {
        par = Object.assign(this.params, this.listQuery)
      }
      par = {
        ...par,
        ...curParams,
        id: this.id
      }
      const newParams = {}
      Object.keys(par).forEach((key) => {
        if (par[key] !== undefined && par[key] !== '') {
          newParams[key] = par[key]
        }
      })
      return newParams
    }

  },
  created() {
    if (!this.isFirstGetlist) return
    this.getList()
  }
}
