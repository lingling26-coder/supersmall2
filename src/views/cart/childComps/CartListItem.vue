<template>
   <div  class="shop-item">
       <div class="item-selector">
           <check-button :isChecked="product.checked" @click.native="checkClick"></check-button>
       </div>
       <div class="item-img">
           <img :src="product.image" alt="商品图片">
       </div>
       <div class="item-info">
           <div class="item-title">{{product.title}}</div>
           <div class="item-desc">{{product.desc}}</div>
           <div class="info-bottom">
               <div class="item-price left">￥{{product.price}}</div>
               <div class="item-count right">x{{product.count}}</div>
           </div>
       </div>
   </div>
</template>

<script>
import checkButton from 'components/content/checkButton/checkButton.vue'

export default {
    name:"CartListItem",
    props:{
        product:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods:{
        checkClick(){
            this.product.checked=!this.product.checked
        }
    },
    components:{
        checkButton
        
    }
}
</script>

<style>
.shop-item{
    display: flex;
    width: 100%;
    padding: 5px;
    border-bottom: 1px solid #ccc;
}
.item-selector{
    width: 23px;
    display: flex;
    justify-content: center;
    align-items:center;
}
.item-img img{
    display: block;
    width: 80px;
    height: 100px;
    border-radius: 5px;
}
.item-info{
    flex:1;
    position: relative;
    padding: 5px 10px;
    color: #333;
    font-size: 17px;
    overflow: hidden;
}

.item-info .item-desc{
    margin-top: 10px;
    color: #666;
    font-size: 14px;
    
}
.item-title,.item-desc{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.info-bottom{
    position: absolute;
    margin-top: 10px;
    bottom: -15px;
    left: 10px;
    right: 10px;
}
.item-price{
    color: orangered;
}
</style>