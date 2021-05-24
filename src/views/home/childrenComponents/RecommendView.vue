<template>
  <div class="recommend">
      <div v-for="item in crecommends" class="recommend-item">
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    crecommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommend{
    display: flex;
    width: 100%;
    padding: 10px 0 20px;
    text-align: center;
    font-size: 12px;
    border-bottom: 8px solid #eee;
}
.recommend-item{
    flex: 1;
}
.recommend-item img{
    height: 70px;
    width: 70px;
    margin-bottom: 10px;
}
</style>