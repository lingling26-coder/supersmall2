<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <scroll class="contents" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navBar/NavBar.vue'
import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'
import {mapGetters} from 'vuex'

// 导入better-scroll
import Scroll from "components/common/scroll/Scroll.vue";

export default {
  name: "Cart",
  components:{
    NavBar,
    CartList,
     Scroll,
     CartBottomBar
  },
  computed:{
    ...mapGetters(['cartLength'])
  },
  activated(){
    this.$refs.scroll.scroll.refresh()
  }
};
</script>

<style scoped>
.cart{
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color:#ffff;
}
.contents{
     height: calc(100% - 93px);
     z-index:22;
     overflow: hidden;
 }
</style>