<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span>客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span>店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods:{
      addToCart(){
         this.$emit('addCart')
      }
  }
};
</script>

<style scoped>
.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: 54px;
  text-align: center;
background-color: #fff;
}
.bar-item {
    flex: 1;
    display: flex;
}
.bar-item>div{
    flex:1;
}
.bar-left .text{
    font-size: 13ppx;
}
.bar-left .icon{
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto 3px;
    background: url('~assets/img/detail/detail_bottom.png') 0 0/100%;
}
.bar-left .service{
    background-position: 0 -54px;
}
.bar-left .shop{
    background-position: 0 -98px;
}

.bar-right>div{
    flex: 1;
    line-height: 54px;
}
.bar-right .cart{
    background-color: rgb(255, 196, 0);
    color: black;
}
.bar-right .buy{
    color: white;
    background-color: rgb(247, 131, 150);
}
</style>