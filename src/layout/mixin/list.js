// 去获取tableList数据

export default {
  data() {
    return {
      // 请求接口的基础路径
      baseApi: '',
      // 列表数据
      list: [{
        'id': 2,
        'name': '第一次体测预约',
        'location': '临江操场',
        'day': '2022-03-09',
        'hour': '13:00-15:00',
        'store': 100,
        'orderNum': 5,
        'version': 3,
        'semester': '2020上学期',
        'headid': 1,
        'delFlag': '0',
        'teacherInfo': {
          'id': 1,
          'userId': 2,
          'name': '张三',
          'sex': '男',
          'college': '计算机学院',
          'phoneNum': 12345678900
        }

      }],
      // 列表数据接口
      queryParam: {
        limit: 10,
        total: 10
      },
      // 分页数据
      pagination: {
        // 每页显示条数
        size: 9,
        // 当前为第几页
        current: 1,
        // 总共数据
        total: 20,
        // showSizeChanger: true,
        // 可选的pagesize参数
        pageSizeOptions: [9, 15, 21, 42, 60]
      }

    }
  },
  methods: {
    getList() {
      const { current, size } = this.pagination
      this.$store.dispatch('list/getList', { current, size }).then((res) => {
        const { size, total, records, current } = res
        this.list = records
        this.total = total
        this.current = current
        this.size = size
      }).catch((err) => {
        console.log(err)
      })
    },
    onSearch(listQuery) {
      const fetchParams = this.mergeParams(listQuery)
      console.log(fetchParams)
    },
    // 将列表查询参数和混合参数合并
    mergeParams(params) {
      return Object.assign(this.pagination, this.queryParam, params)
    },
    // 分页改变触发
    handlePaginationChanged() {
      console.log('分页数据改变，发送请求')
    },
    // 详情按钮
    handleClick(row) {
      console.log(row)
    }
  },
  created() {
    this.getList()
  }
}
