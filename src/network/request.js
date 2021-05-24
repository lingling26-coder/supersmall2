import axios from 'axios'
//最终的封装方式
export function request(config) {
    //1、创建axios的实例
    const instance1 = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })
    //2、axios的拦截器（拦截实例）
    // instance1.interceptors.request.use(
    //     config => {
    //         console.log(config)
    //         //为什么要进行拦截呢？比如config中的一些信息不符合服务器的要求，
    //         //比如每次发送网络请求时希望有一个图标，请求成功后消失
    //         //比如某些网络请求（比如登录（token）），必须携带一些特殊的信息

    //         //这里如果不返回，就会拦截，那么后面真正的网络请求拿不到数据
    //         return config
    //     },
    //     err => {
    //         console.log(er)
    //     })
    
    instance1.interceptors.response.use(
        res => {
            // console.log(res)
            //这里也要return 不然就是将结构拦截掉了
            return res
        },
        err => {
            console.log(err)
        }
    )

    // 3、发送真正的网络请求
    return instance1(config)
}