export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            // payload是新添加的商品
        let oldProduct =context.state.cartList.find(item => item.iid == payload.iid)
        if (oldProduct) {
            context.commit('addCounter', oldProduct)
            resolve('当前商品数量加1')
        } else {
            payload.count=1
            context.commit('addToCart', payload)
            resolve('添加了新的商品')
        }
        })
        
    }
}