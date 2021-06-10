<template>
  <div id="home">
    <nav-bar class="home-nav clear-fix">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tabcontrol"
      @TabClick="TabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    >
    </tab-control>
    <scroll
      class="contents"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="scrollPosition"
      @pullingup="pullUpLoad"
    >
      <home-swipper
        :cbanners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swipper>
      <recommend-view :crecommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @TabClick="TabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
//公共的组件
import NavBar from "components/common/navBar/NavBar";
import TabControl from "components/content/TabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";


//非公共的组件
import homeSwipper from "./childrenComponents/homeSwipper";
import RecommendView from "./childrenComponents/RecommendView";
import FeatureView from "./childrenComponents/FeatureView";

//网络请求相关的
import { getHomeMultiData, getHomeGoods } from "network/home";

// 导入mixin
import { itemListenerMixin ,backTopMixin} from "common/mixin";

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
      // isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  mixins: [itemListenerMixin,backTopMixin],
  components: {
    NavBar,
    homeSwipper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop,
  },
  created() {
    //1 请求多个数据
    this.getMultiData();
    //2 请求商品数据
    this.getGoods("pop");
    this.getGoods("new");
    this.getGoods("sell");
  },
  mounted() {},
  activated() {
    this.$refs.scroll.scroll.scrollTo(0, this.scroll, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y;
    // 取消图片加载的事件，因为home.vue有keep-alive，所以在deactived中取消，detail页面需要在destory中取消
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    swiperImageLoad() {
      //获取tabControl的offsetTop
      // 所有的组件都有一个属性$el，用于获取组件中的元素
      this.offsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    // backClick() {
    //   //滚回顶部
    //   this.$refs.scroll.scroll.scrollTo(0, 0, 500);
    // },
    // backtop的显示与隐藏
    scrollPosition(position) {
      // 判断backtop是否显示
      this.isShowBackTop = position.y < -1000;
      // 决定tabControl是否吸顶
      this.isTabFixed = -position.y > this.offsetTop;
    },
    // 上拉加载更多
    pullUpLoad() {
      console.log("上拉加载更多");
      this.getGoods(this.currentType);
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
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
        // console.log(res);
        this.goods[type].list.push(...res.data.data.list);
        //注意：这里多了一组数据，需要将页码加一
        this.goods[type].page += 1;
        this.$refs.scroll.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  position: relative;
  /* padding-top: 44px; */
  /* vh代表视口高度 */
  height: 100vh;
}
.home-nav {
  /* 在使用浏览器原生的滚动时，为了让导航不跟随一起滚动，但是现在不是原生滚动，定位属性不需要 */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99; */
  background-color: pink;
  color: white;
}
.tabcontrol {
  position: relative;
  z-index: 9;
}
.contents {
  position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}
</style>