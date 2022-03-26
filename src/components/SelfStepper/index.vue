<template>
  <div>
    <el-input-number v-model="curNum" :min="0" :max="100" :label="description" />
  </div>
</template>

<script>
export default {
  prop: {
    description: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      num: 0
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
