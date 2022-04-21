<template>
  <el-button :type="$attrs['type']" :loading="loading" :size="$attrs['size']" @click="clickEvent">
    <slot />
  </el-button>
</template>

<script>
export default {
  model: {
    prop: 'loading',
    event: 'loading-change'
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
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
    clickEvent() {
      this.$emit('btnClick')

      if (this.loading) {
        return
      }
      this.$emit('loading-change', this.loadingStop())
    }
  }
}
</script>

