// 详细信息
<template>
  <div>
    <el-drawer
      :title="form.name"
      :visible.sync="state.visible"
      custom-class="drawer"
    >
      <el-form ref="dataForm" label-width="100px" label-position="left">
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.day"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>

        <el-form-item label="学期">
          <el-select v-model="form.semester" placeholder="请选择" @change="handleGetSemester">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="地点">
          <el-input
            v-model="form.location"
            placeholder="请输入内容"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item label="负责人老师">
          <el-input
            v-model="form.teacherInfo.name"
            placeholder="请输入内容"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input
            v-model="form.teacherInfo.phoneNum"
            placeholder="请输入内容"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item label="所在学院">
          <el-input
            v-model="form.teacherInfo.college"
            placeholder="请输入内容"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item label="预约人数">
          <el-tag type="warning">{{ form.orderNum }} / {{ form.store }}</el-tag>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="fixedInfo">修改</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import form from '@/layout/mixin/form.js'
export default {
  mixins: [form],
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
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
      }]

    }
  },
  created() {

  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.drawer{
  padding-left: 20px;
}
// .el-drawer.rtl {
//         overflow: scroll
//     }

</style>
