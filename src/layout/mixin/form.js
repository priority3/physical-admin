import { formatDate } from '@/utils/formatDate'
import { getTeachInfo } from '@/api/table'
export default {
  data() {
    return {
      // 表单数据
      form: '',
      // 当前组件状态
      state: {
        visible: false
      },
      teacherList: []
    }
  },
  methods: {
    // 打开表单
    open(data) {
      this.state.visible = true
      // 浅拷贝 会造成form更改数据后 影响list当中的数据
      this.form = { ...data }
      // 获取老师列表信息
      this.handleGetTeaList()
    },
    // 获取责任老师列表信息
    handleGetTeaList() {
      this.$store.dispatch('list/getTeachInfo').then((res) => {

      }).catch((err) => {})
    },
    // 学期下拉 更改学期信息
    handleGetSemester(e) {
      this.form.semester = this.options.filter((item) => {
        return item.value === e
      })[0].label
    },
    // 点击修改信息
    fixedInfo() {
      const { day } = this.form
      const newDay = formatDate(day)
      this.form = {
        ...this.form,
        day: newDay
      }
      console.log(this.form)
    }
  }

}
