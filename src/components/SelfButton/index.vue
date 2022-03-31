<template>
  <el-button
    :type="$attrs['type']"
    :loading="loading"
    :size="$attrs['size']"
    btn-click-click="$emit('btnClick')"
  >
    <slot />
  </el-button>
</template>

<script>
export default {
  model: {
    prop: 'loading',
    event: 'loading-change'
  },
  data() {
    return {
      loading: false
    }
  },

  methods: {
    // loading 加载
    loadingStart() {
      this.loading = true
    },
    // loading 结束
    loadingStop() {
      this.loading = false
    },
    click() {
      this.loadingStart()
      if (this.loading) {
        return
      }
      this.$emit('loading-change', this.loadingStop)
    }
  }
}
</script>

