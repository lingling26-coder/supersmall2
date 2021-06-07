<template>
  <div>
    <swiper>
        <swiper-item v-for="item in topImages" class="swipper-height">
            <img :src="item" alt="" >
        </swiper-item>
    </swiper>
  </div>
</template>

<script>

import Swiper from 'components/common/swiper/Swiper'
import SwiperItem from 'components/common/swiper/SwiperItem'

export default {
    name:'DetailSwipper',
    props:{
        topImages:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components:{
         Swiper,
         SwiperItem

    },
    methods:{
       
    }
}
</script>

<style>
.swipper-height{
    height: 300px;
}
</style>