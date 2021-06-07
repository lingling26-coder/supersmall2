<template>
  <swiper>
    <swiper-item v-for="item in cbanners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
// 导入轮播图相关的组件
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  name: "homeSwipper",
  data() {
    return {
      isLoad: false,
    };
  },
  props: {
    cbanners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imageLoad() {
      // 这里事件只需要发送一次，因为一个图片加载了就有了高度
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>

<style>
</style>