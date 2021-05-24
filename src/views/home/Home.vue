<template>
  <div id="home">
    <nav-bar class="home-nav clear-fix">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="contents" ref="scroll">
      <home-swipper :cbanners="banners"></home-swipper>
      <recommend-view :crecommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @TabClick="TabClick"
      ></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="backClick"></back-top>
  </div>
</template>

<script>
//公共的组件
import NavBar from "components/common/navBar/NavBar";
import TabControl from "components/content/TabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop"

//非公共的组件
import homeSwipper from "./childrenComponents/homeSwipper";
import RecommendView from "./childrenComponents/RecommendView";
import FeatureView from "./childrenComponents/FeatureView";

//网络请求相关的
import { getHomeMultiData, getHomeGoods } from "network/home";



export default {
  name: "Name",
  data() {
    return {
      // result:null,
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
    };
  },
  components: {
    NavBar,
    homeSwipper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  
  },
  created() {
    //1 请求多个数据
    this.getMultiData();
    //2 请求商品数据
    this.getGoods("pop");
    this.getGoods("new");
    this.getGoods("sell");
  },
  methods: {
    backClick(){
      //滚回顶部
      this.$refs.scroll.scroll.scrollTo(0,0,500)
    },
    //事件监听相关的方法
    TabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    // 网络请求相关的方法
    getMultiData() {
      //请求多个数据
      getHomeMultiData()
        .then((res) => {
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getGoods(type) {
      //请求商品数据
      //page是动态的
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        console.log(res);
        this.goods[type].list.push(...res.data.data.list);
        //注意：这里多了一组数据，需要将页码加一
        this.goods[type].page += 1;
      });
    },
  },
};
</script>

<style scoped>
#home {
  position: relative;
  padding-top: 44px;
  /* vh代表视口高度 */
  height: 100vh;
}
.home-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background-color: pink;
  color: white;
}
.tab-control {
  position: sticky;
  top: 44px;
}
.contents{
position: absolute;
top: 44px;
bottom: 49px;
  overflow: hidden;
}
</style>