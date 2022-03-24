import { formatDate, getOriginDate } from '@/utils/formatDate'
export default {
  data() {
    return {
      // 表单数据
      form: {
        day: ''
      },
      // 当前组件状态
      state: {
        // 更改框
        visible: false,
        // 添加框
        dialogFormVisible: false

      },
      // 老师所有列表
      teacherList: [],
      // 选择的具体老师
      teacher: {},
      //
      addForm: {
        name: '',
        day: '',
        hour: '',
        semester: '',
        location: '',
        orderNum: '',
        headid: ''
      }
    }
  },
  methods: {
    // 打开表单
    open(data) {
      console.log(data)
      this.state.visible = true
      // 将传过来的hour字符串改为时间格式
      const hour = getOriginDate(data.hour)
      //
      console.log(hour)
      // 浅拷贝 会造成form更改数据后 影响list当中的数据
      this.form = { ...data, teacher: data.teacherInfo.name, hour }
      // 获取老师列表信息
    },
    // 将具体时间转换为时间戳
    getAppointTime(date) {
      if (date[0] instanceof Date && !isNaN(date[0].getTime())) {
        return date.map((item) => formatDate(item, 'HH:mm')).join('-')
      }
    },

    // 打开新建窗口
    addAppiontInfo() {
      this.state.dialogFormVisible = true
    },
    // 获取责任老师列表信息
    handleGetTeaList() {
      if (this.teacherList.length) return
      this.$store.dispatch('list/getTeachInfo').then((res) => {
        this.teacherList = res.records
      }).catch((err) => {})
    },
    // 更改学期下拉 更改学期信息
    handleGetSemester(e) {
      this.form.semester = this.options.filter((item) => {
        return item.value === e
      })[0].label
    },

    // 修改老师信息 对于id
    handleChangeTeacher(e) {
      this.form.headid = e
    },

    // 更改学期下拉 更改学期信息
    handleaddGetSemester(e) {
      this.addForm.semester = this.options.filter((item) => {
        return item.value === e
      })[0].label
    },
    // 修改老师信息 对于id
    handleaddChangeTeacher(e) {
      this.addForm.headid = e
    },

    // 点击修改信息
    fixedInfo() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          const { id, name, location, store, hour, orderNum, day, semester, headid } = this.form
          delete this.form.teacherInfo
          this.form = {
            id, name, location, hour: hour.join('-'), store, orderNum, semester, headid,
            day
          }
          console.log(this.form)
          this.$store.dispatch('list/fixedAppiontInfo', { ...this.form }).then((res) => {
            console.log(res)
            if (res.code === 200) {
              this.$notify({
                title: '修改成功',
                type: 'success'
              })
              this.state.visible = false
              this.$emit('complete')
            } else {
              this.$notify({
                title: '失败',
                type: 'error'
              })
              this.state.visible = false
            }
          })
        }
      })
    }

  },
  created() {
    this.handleGetTeaList()
    // this.form = this.$store.getters.list[0]
    // console.log(this.form, this.$store.getters.list[0])
  }

}
