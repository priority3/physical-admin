<template>
  <div class="item-container">
    <el-form :inline="true" :model="formInline" label-position="left" label-width="80px">
      <el-form-item :label="placeholder" class="itemlabel">
        <el-input v-model="formInline.user" :placeholder="inplaceholder" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'FormItem',
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formInline: {
        user: ''
      }
    }
  },
  computed: {
    inplaceholder() {
      return `请输入${this.placeholder}...`
    }
  }

}
</script>

<style lang="scss" scoped>
.item-container {
  width: 100%;

  .itemlabel {
    ::v-deep .el-input__inner {
      background-color: #f1f1f1;
      border: 0;
      border-bottom: 1px solid #cfcfcf;
    }
  }
}
</style>
