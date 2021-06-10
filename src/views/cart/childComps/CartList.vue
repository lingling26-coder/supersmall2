<template>
  <div class="cart-list">
  <cart-list-item v-for="(item,index) in cartLists" :product='item' 
  :key="index">
  </cart-list-item>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartListItem from './CartListItem.vue'
export default {
  name: "CartList",
  computed: {
    ...mapGetters(["cartLists"]),
  },
  components: {
      CartListItem
  },
};
</script>

<style scoped>
 
</style>