import { debounce } from "common/utils";
import BackTop from "components/content/backTop/BackTop";
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            refreshs:null
        }
    },
    mounted() {
        //监听item中图片加载完成,防抖函数
        this.refreshs = debounce(this.$refs.scroll.refresh, 200);
        this.itemImgListener = () => {
            this.refreshs()
            // this.$refs.scroll.scroll.refresh()
        }
        this.$bus.$on("itemImageLoad", this.itemImgListener);
        // console.log('mixin')
    }
}

export const backTopMixin = {
    components: {
        BackTop 
    },
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backClick() {
            //滚回顶部
            this.$refs.scroll.scroll.scrollTo(0, 0, 500);
          },
    }
}