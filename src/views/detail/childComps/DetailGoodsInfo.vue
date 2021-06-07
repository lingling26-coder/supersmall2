<template>
  <div class="goods-info" v-if="Object.keys(detailInfo).length!==0">
      <div class="info-desc">
          <div class="start"></div>
          <div class="desc">{{detailInfo.desc}}</div>
          <div class="end"></div>
      </div>
    <div v-for="item in detailInfo.detailImage ">
        <div class="innfo-key">{{item.key}}</div>
        <div class="info-list">
            <img v-for="item in item.list"   :src="item" alt="" @load="imageLoad">
        </div>
    </div>
  </div>
</template>
<script>
export default {
    name:'DetailGoodsInfo',
    props:{
        detailInfo:{
            type:Object,
            default(){
                return { }
            }
        }
    },
    methods:{
      imageLoad(){
        // console.log('图片加载')
        this.$emit('detailImageLoad')
      }
    }

}
</script>

<style scoped>
 .goods-info {
    padding: 20px 0;
     text-align: left;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-desc{
    padding: 0 15px;
  }
.info-desc .start,.info-desc .end{
    position: relative;
    width: 100px;
    height: 1px;
    background-color: black;
}
.info-desc .start{
 float: left;
}
.info-desc .end{
 float: right;
}
 .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }
   .info-desc .start ::before {
    left: 0;
  }
  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }
.info-list img {
    width: 100%;
  }
.innfo-key{
    margin-bottom: 5px;
}
</style>