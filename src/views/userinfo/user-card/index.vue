<template>
  <div>
    <div slot="header" class="clearfix">
      <pan-thumb
        image="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
        width="100px"
        height="100px"
      >
        <slot />
      </pan-thumb>
    </div>
  </div>
</template>

<script>
import panThumb from '@/components/panThumb/index'
export default {
  components: {
    panThumb
  }
}
</script>

<style lang="scss" scoped>
.password-container {
}
</style>
