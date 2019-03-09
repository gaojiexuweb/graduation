import axios from 'axios'
// 引入 Loading 服务：
import { Message ,Loading } from 'element-ui';  //引入

let Loading;
// 开始加载动画
function startLoading(){
    // 在需要调用时：
    Loading = this.$loading({
        lock:true,   //是否锁定
        text:'拼命加载中...',   //显示命令
        background:'rgba(0,0,0,0.7)'  //背景颜色
    })
}

// 结束加载动画
function endLoading(){
    Loading.close()    //结束当前加载动画
}
//请求拦截 
axios.interceptors.request.use(
    config=>{   //如果正确
        startLoading();    // 加载动画
        return config;
    },
    error=>{   //如果错误
        return Promise.reject(error)  //返回错误
    }
)
// 响应拦截
axios.interceptors.response.use(
    response=>{   //如果正确
        endLoading();    //结束动画
        return response
    },
    error=>{
        endLoading()
        Message.error(error.response.data);   //错误提醒
        return Promise.reject(error)   //返回错误
    }
)
export default axios