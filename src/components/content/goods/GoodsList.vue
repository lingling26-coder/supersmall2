<template>
  <div class="goods">
      <goods-list-item v-for="item in goods" :goodsItem='item'>
      </goods-list-item>
  </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components:{
      GoodsListItem
  }
};
</script>

<style>
.goods{
    display: flex;
    /* 如果不设置wrap的话所以元素都会挤在一行里面显示，不管 有多少个 */
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>