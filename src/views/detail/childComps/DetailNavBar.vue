<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          class="title-item"
          @click="itemClick(index)"
          :class="{active:index==currentIndex}"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  components: {
    NavBar,
  },
  methods: {
   itemClick(index) {
        this.currentIndex=index
        // 将点击事件发送出去
        this.$emit('titleClick',index)
    },
    backClick(){
       this.$router.go(-1)
    }
  },
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.back{
    padding-top: 6px;
}
.active{
    color:var(--color-high-text);
}
</style>