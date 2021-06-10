export default {
    addCounter(state,payload) {
        payload.count++
    },
    addToCart(state, payload) {
        // 商品加入购物车后默认是选中的
        payload.checked=true
        state.cartList.push(payload)
        
    }
}