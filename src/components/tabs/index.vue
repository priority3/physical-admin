<template>
  <!-- 自定义tabs -->
  <div>
    <div class="tab-header">
      <div
        v-for="item in tabspanel"
        :key="item['tab-key']"
        :class="['tabs-item', { 'active': item['tab-key'] === curTab }]"
        @click="tabClick(item)"
      >
        <p v-waves>{{ item['tab-name'] }}</p>
      </div>
    </div>
    <div class="tab-content">
      <slot name="tab-content" />
    </div>
    <div class="tab-footer">
      <slot name="tab-footer" />
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'curTab',
    event: 'tab-click'
  },
  props: {
    tabspanel: {
      type: Array,
      default: () => {
        return []
      }
    },
    defaultKey: {
      type: String,
      default: () => {
        return null
      }
    },
    curTab: {
      type: String,
      default() {
        return this.defaultKey || this.tabspanel?.[0]?.['tab-key']
      }
    }
  },
  methods: {
    tabClick(item) {
      if (item['tab-key'] === this.curTab) {
        return
      }
      this.$emit('tab-click', item['tab-key'])
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;

  .tabs-item {
    font-weight: 700;
    font-size: 16px;
    /* identical to box height */

    /* Primary */
    color: #37609c;
    position: relative;
    margin: 0 12px;
    cursor: pointer;
    user-select: none;

    &:hover {
      transition: width 1s;
      color: #0e7ae2;
    }
  }
  .active::after {
    content: "";
    position: absolute;
    height: 7px;
    width: 82.7%;
    left: 50%;
    transform: translate(-50%);
    bottom: -5px;
    background: #222bad;
    border-radius: 12px;
    animation: scale-x 0.2s linear;
  }
}
@keyframes scale-x {
  from {
    width: 0;
  }
  to {
    width: 82.7%;
  }
}
</style>
