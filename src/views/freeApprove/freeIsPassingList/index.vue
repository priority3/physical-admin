<template>
  <div class="app-container">免测审核中</div>
</template>

<script>
import pagination from '@/components/Pagination/index.vue'
import list from '@/layout/mixin/list.js'
export default {
  components: {
    pagination
  },
  mixins: [list],
  data() {
    return {
      baseApi: 'student/handleGetFreeStuInfo'

    }
  },
  computed: {
    listQuery(self) {
      return self.$attrs['table-list-query']
    }
  },
  created() {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
</style>
