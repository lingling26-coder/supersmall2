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
  props:{
    probeType:{
      type:Number,
      default:0
    }
  },
  data() {
    return {
      scroll: null,
    };
  },
 mounted() {
    this.scroll = new BetterScroll(this.$refs.wrapper, {
        scrollbar: true,
      probeType: this.probeType,
      observeDOM:true,
      observeImage:true,
      click: true,
      pullUpLoad: true,
    });
  },
};
</script>

<style>
</style>