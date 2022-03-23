// 详细信息
<template>
  <div>
    <!-- 详情 -->
    <el-drawer
      :title="form.name"
      :visible.sync="state.visible"
      custom-class="drawer"
      :size="size"
    >
      <el-form ref="dataForm" :rules="fixedRules" :model="form" label-width="100px" label-position="left">
        <el-form-item label="日期" prop="day">
          <el-date-picker
            v-model="form.day"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="具体时间" prop="hour">
          <el-time-picker
            v-model="form.hour"
            is-range
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            value-format="HH:mm"
          />
        </el-form-item>
        <el-form-item label="学期" prop="semester">
          <el-select v-model="form.semester" placeholder="请选择" @change="handleGetSemester">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="地点" prop="location">
          <el-input
            v-model="form.location"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="负责人老师" prop="teacher">

          <el-select v-model="form.teacher" placeholder="请选择" @change="handleChangeTeacher">
            <el-option
              v-for="item in teacherList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="预约人数">
          <el-tag type="warning">{{ form.orderNum }} / {{ form.store }}</el-tag>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="fixedInfo">修改</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

    <!-- 弹出框添加 -->
    <el-dialog title="新建体测预约" :visible.sync="state.dialogFormVisible">
      <el-form ref="dataForm" :rules="fixedRules" :model="addForm" label-width="100px" label-position="left">
        <el-form-item label="体测名称" prop="name">
          <el-input
            v-model="addForm.name"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="体测日期" prop="day">
          <el-date-picker
            v-model="addForm.day"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />

        </el-form-item>
        <el-form-item label="具体时间" prop="hour">

          <el-time-picker
            v-model="addForm.hour"
            is-range
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            value-format="HH:mm"
          />
        </el-form-item>
        <el-form-item label="学期" prop="semester">
          <el-select v-model="addForm.semester" placeholder="请选择" @change="handleaddGetSemester">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="地点" prop="location">
          <el-input
            v-model="addForm.location"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="负责人老师" prop="teacher">

          <el-select v-model="addForm.teacher" placeholder="请选择" @change="handleaddChangeTeacher">
            <el-option
              v-for="item in teacherList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="预约人数" prop="store">
          <el-input
            v-model="addForm.store"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="state.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddAppoint">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import form from '@/layout/mixin/form.js'

export default {
  mixins: [form],
  data() {
    // 自定义校验规则
    return {
      formInline: {
        user: '',
        region: ''
      },
      size: '50%',
      options: [{
        value: '选项1',
        label: '第一学期'
      }, {
        value: '选项2',
        label: '第二学期'
      }, {
        value: '选项3',
        label: '第三学期'
      }, {
        value: '选项4',
        label: '第四学期'
      }],
      fixedRules: {
        name: [
          { required: true, message: '请输入体测名称', trigger: 'blur' },
          { min: 2, max: 10, message: '名称长度3到10个字符', trigger: 'blur' }
        ],
        day: [
          { required: true, message: '请选择体测日期', trigger: 'blur' }
        ],
        hour: [
          { required: true, message: '请选择体测日期', trigger: 'blur' }
        ],
        location: [
          { required: true, message: '请选择体测地点', trigger: 'blur' }
        ],
        teacher: [
          { required: true, message: '请选择体测老师', trigger: 'blur' }
        ],
        semester: [
          { required: true, message: '请选择体测学期', trigger: 'blur' }
        ],
        store: [
          { required: true, message: '请选择体测人数', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur', transform: (value) => Number(value) }

        ]

      }

    }
  },
  created() {
  },
  methods: {
    // 学期下拉 更改学期信息
    handleGetSemester(e) {
      this.form.semester = this.options.filter((item) => {
        return item.value === e
      })[0].label
    },

    // 添加预约
    handleAddAppoint() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          this.addForm.hour = this.addForm.hour.join('-')
          console.log(this.addForm)
          this.$store.dispatch('list/addAppiontInfo', { ...this.addForm }).then((res) => {
            if (res.code === 200) {
              this.$notify({
                title: '添加',
                type: 'success',
                message: '添加成功'
              })
            }
            this.$emit('complete')
          }).catch((err) => {
            this.$notify({
              title: '失败',
              message: `${err}添加失败`,
              type: 'error'
            })
          }).finally(() => {
            this.state.dialogFormVisible = false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .drawer{
  padding-left: 20px;
}

@media screen and (max-width:992){
   .drawer{
    width: 100%;
  }
}
// .el-drawer.rtl {
//         overflow: scroll
//     }

</style>
