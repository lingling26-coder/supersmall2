<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length!==0">
      <div class="info-header">
          <div class="header-title">用户评价</div>
          <div class="header-more">
              更多 >
          </div>
      </div>
      <div class="user-info">
          <img :src="commentInfo.user.avatar" alt="">
          <span>{{commentInfo.user.uname}}</span>
      </div>
      <div class="info-detail">
          <p>{{commentInfo.content}}</p>
          <div class="info-others">
              <span class="date">{{commentInfo.created|showDate}}</span>
              <span>{{commentInfo.style}}</span>
          </div>
      </div>
      <div class="info-image">
          <img v-for="item in commentInfo.images" :src="item" alt="">
      </div>
  </div>
</template>

<script>
import {formatDate} from 'common/utils'
export default {
    namr:'DetailCommentInfo',
    props:{
        commentInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    filters:{
        showDate(value){
            // 1.将时间戳转化为Date对象
            const date=new Date(value*1000)
        //  将date进行格式化
        return formatDate(date,'yyyy-MM-dd')
        }
    }
    
}
</script>

<style scoped>
.comment-info{
    padding: 0 7px;
     border-bottom: 5px solid #f2f5f8;
}
.info-header{
    height: 50px;
    padding: 0 9px;
    line-height: 50px;
    border-bottom: 1px solid rgba(100,100,100,.1);;
}
.info-header .header-title{
    float: left;
}
.info-header .header-more{
    float: right;
    font-size: 13px;
    font-weight: 600;
}
.user-info{
    display: flex;
    vertical-align: middle;
    padding: 5px 0;
    height:60px;
    line-height: 60px;
    font-size: 13px;
}
.user-info img{
    height:100%;
    border-radius: 50%;
}
.info-others{
    line-height: 34px;
    font-size: 13px;
    color:rgb(211, 203, 203)
}
.info-others span{
    margin-right: 7px;
}
.info-image{
 display: flex;
 flex-wrap: wrap;
}
.info-image img{
    height: 200px;
    flex: 1;
}
</style>