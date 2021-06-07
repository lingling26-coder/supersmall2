<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>
    <scroll
      ref="scroll"
      class="contents"
      @scroll="contentScroll"
      :probeType="3"
    >
      <detail-swipper :topImages="topImages"></detail-swipper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @detailImageLoad="detailImageLoad"
      ></detail-goods-info>
      <detail-params-info
        :itemParams="itemParams"
        ref="params"
      ></detail-params-info>
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backClick"></back-top>
    <detail-bottom-bar></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwipper from "./childComps/DetailSwipper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from './childComps/DetailBottomBar.vue';

import GoodsList from "components/content/goods/GoodsList";
import { getDetail, Goods, Shop, getRecommend } from "network/detail";

// 导入mixin
import { itemListenerMixin } from "common/mixin";

import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { debounce } from "common/utils";


export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommends: [],
      // 记录标题对应的滚动位置
      themeTopYs: [],
      getThemeTop: null,
      currentIndex:0,
      isShowBackTop: false,
    };
  },
  mixins: [itemListenerMixin],
  created() {
    // 保存传入的iid
    this.iid = this.$route.params.id;
    // 根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      const data = res.data.result;
      // 1.获取顶部的轮播数据
      // console.log(res);
      this.topImages = data.itemInfo.topImages;
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.取出店铺信息
      this.shop = new Shop(data.shopInfo);
      //  4.取出详情信息
      this.detailInfo = data.detailInfo;
      // 5.取出商品的参数信息
      this.itemParams = data.itemParams;

      // 给getThemeTop 赋值
      this.getThemeTop = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);
      },50);

      // 6 获取评论信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 请求推荐数据
    getRecommend().then((res) => {
      // console.log(res)
      this.recommends = res.data.data.list;
    });
  },
  mounted() {
    // console.log('mounted')
  },
  desoryed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    detailImageLoad() {
      this.refreshs();
      this.getThemeTop();
    },
    // navbar的标题点击事件
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    // scroll滚动事件
    contentScroll(position) {
      // 获取y值
      const positionnY = -position.y;
      // positionnY的值和themeTopYs中的值进行比较
      /*
      [0, 5051, 5896, 6287, __ob__: Observer]
      positionY的值在0-5051之间，index=0
      positionY的值在5051-5896之间，index=1
       positionY的值在5896-6287之间，index=2
    .....
      */
     let length=this.themeTopYs.length
      for(var i=0;i<length-1;i++){
        if((this.currentIndex!==i)&&((i<length-1)&&positionnY>=this.themeTopYs[i]&&positionnY<this.themeTopYs[i+1])){
          this.currentIndex=i
          this.$refs.nav.currentIndex=this.currentIndex
        }
      }

      // 判断backtop是否显示
      this.isShowBackTop = position.y < -1000;
    },
    backClick() {
      //滚回顶部
      this.$refs.scroll.scroll.scrollTo(0, 0, 500);
    },
  },
  components: {
    DetailNavBar,
    DetailSwipper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
    DetailBottomBar,
    BackTop,
 
  },
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 999;
  background-color: #fff;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.contents {
  /* 这里需要减去- 44px-54px，分别是顶部和顶部nav的高度 
  注意：calc()里面运算符两边必须要有空格
  */
  height: calc(100% - 88px);
  overflow: hidden;
}
</style>