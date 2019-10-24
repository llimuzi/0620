import axios from 'axios'
import qs from 'qs'
// import { config } from 'rxjs'

 import {message} from 'antd'
// import NProgress from 'nprogress'
//创建一个instance
const instance=axios.create({
    timeout:1000
})
//添加请求拦截器
instance.interceptors.request.use(config=>{
    console.log('request interceptor onResolved()')
    const {data}=config
    if(data instanceof Object){
        config.data=qs.stringify(data)
    }
    return config
})
//添加响应拦截器
instance.interceptors.response.use(
    response=>{
        console.log('response interceptor onReslved()')
        const result=response.data

        if(result.status===0){
            return result.data||{}
        }else{
            return Promise.reject(result.msg||'操作失败,未知原因')
        }
    },
    error=>{
        console.log('response interceptor onRejected()')
        //显示请求错误提示
        message.error('请求出错'+error.message)
        return  Promise.reject(error)

    }
)

//暴露instance
export default instance