<template>
  <div class="bottom-bar">
      <div class="checked-content">
          <check-button class="checked-button" :isChecked="isSelectAll"
          @click.native="checkClick"
          >
          </check-button>
          <span>全选</span>
      </div>
      <div class="price">
          合计：{{totalPrice}}
      </div>
      <div class="calculate" @click="buyClick">
          去计算({{checkLength}})
      </div>
  </div>
</template>

<script>
import checkButton from 'components/content/checkButton/checkButton.vue'

export default {
    name:"CartBottomBar",
    components:{
        checkButton
        
    },
    methods:{
     checkClick(){
         if(this.isSelectAll){
             this.$store.state.cartList.forEach(element => {
                 element.checked=false
             });
         }else{
             this.$store.state.cartList.forEach(element => {
                 element.checked=true
             });
         }
     },
     buyClick(){
         if(this.checkLength==0){
             this.$toast.show('没有选中任何商品哦',1500)
         }
     }
    },
    computed:{
        // 合计
        totalPrice(){
            return '￥' + this.$store.state.cartList.filter(item=>{
               return item.checked
            }).reduce((preValue,item)=>{
                return  preValue+item.price*item.count
            },0).toFixed(2)
        },
        // 去结算
        checkLength(){
            return this.$store.state.cartList.filter(item=>item.checked).length
        },
        // 全选状态
        isSelectAll(){
            //  return !(this.$store.state.cartList.filter(item=>{
            //     return !item.checked
            // }).length)
            if(this.$store.state.cartList.length==0){
                return false
            }
          return  !this.$store.state.cartList.find(item=>!item.checked)
        }
    }
}
</script>

<style scoped>
.bottom-bar{
    display: flex;
    justify-content: space-between;
    position: relative;
    bottom: 40px;
    height: 40px;
    background-color:#eee;
   
}
.checked-content{
 height: 40px;
 display: flex;
 align-items: center;
 margin-left: 10px;
}
.checked-button{
    width: 20px;
    height: 20px;
    margin-right: 3px;
}
.price{
    margin-left: 30px;
    line-height: 40px;
}
.calculate{
    padding: 0 8px;
    line-height: 40px;
    background-color: red;
}
</style>