<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :class="{ active: index == currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      //   把index传出去
      this.$emit("TabClick", index);
    },
  },
};
</script>

<style>
.tab-control {
  display: flex;
  height: 40px;
  /* 设置层级，否则在滚动时会被下面的商品盖住 */
  z-index: 9;
  text-align: center;
  background-color: #fff;
  line-height: 40px;
  font-size: 14px;
}
.tab-control div {
  flex: 1;
}
.tab-control span {
  padding: 3px 5px;
}
.active span {
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-high-text);
}
</style>