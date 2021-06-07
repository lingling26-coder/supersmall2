<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BetterScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    //  创建scroll对象
    this.scroll = new BetterScroll(this.$refs.wrapper, {
      scrollbar: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      // observeDOM:true,
      // observeImage:true,
      click: true,
    });
    // console.log(this.scroll)
    // 监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        // console.log(position)
        this.$emit("scroll", position);
      });
    }

    //监听上拉这个事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingup");
        // setTimeout(this.scroll.,2000)
      });
    }
  },
  methods: {
    refresh() {
      this.scroll.refresh();
    },
  },
};
</script>

<style>
</style>