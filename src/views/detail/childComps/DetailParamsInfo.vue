<template>
  <div class="params-info" v-if="Object.keys(itemParams).length!==0">

      <table v-for="(table,index) in itemParams.rule.tables" :key="index" class="rule"> 
          <tr v-for="(tr,indey) in table" :key="indey" class="info-size">
              <td v-for="(td,indxz) in tr" :key="indxz">{{td}}</td>
          </tr>
      </table>
      <table class="info" >
          <tr v-for="item in itemParams.info.set">
              <td class="info-param-key">{{item.key}}</td>
              <td class="param-value">{{item.value}}</td>
          </tr>
      </table>
      <div class="info-image" v-if="itemParams.info.images">
          <img :src="itemParams.info.images[0]" alt="">
      </div>
  </div>
</template>

<script>
export default {
 name:'DetailParamsInfo',
 props:{
     itemParams:{
         type:Object,
         default(){
             return {}
         }
     }
 }

}
</script>

<style scoped>
.params-info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }
.params-info table{
    width: 100%;
    border-collapse: collapse;
}
.params-info table tr{
    height: 42px;
    border-bottom: 1px solid rgba(100,100,100,.1);
}

.info {
    border-top: 1px solid rgba(0,0,0,.1);
  }
.info-param-key{
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
}
.param-value {
    color: #eb4868
  }
.info-image img{
    width: 100%;
}
</style>