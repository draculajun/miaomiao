import axios from 'axios';

// axios.defaults.baseURL = ''; // 配置axios请求的地址
axios.defaults.timeout = 10000;   // 超时时间
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers.put['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.crossDomain = true;
// axios.defaults.withCredentials = true;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息

localStorage.setItem('appId', 'WEB');
localStorage.setItem('token', 'f97914cfea7458d0871c2d68515528e3');

axios.interceptors.request.use(
    config => {
        if (Object.prototype.toString.call(config.data) != '[object FormData]') {   //求参数类型为FormData时，不需要转换为JSON字符串
            config.data = JSON.stringify(config.data);
        }
        config.headers.appId = localStorage.getItem("appId");
        config.headers.token = localStorage.getItem("token");
        // if (localStorage.getItem("token")) {
        //     config.headers.token = localStorage.getItem("token");
        //     config.headers.appId = localStorage.getItem("appId");
        // } else {
        //     alert('请先登录');
        //     return Promise.reject('无token');
        // }
        return config;
    },
    error => {
        return Promise.reject(error.response);
    });

// 路由响应拦截
// http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.code == "404") {
            console.log("response.data.resultCode是404")
//      window.location.href='http://login.com'
            return
        } else {
            return response;
        }
    },
    error => {
        return Promise.reject(error.response)   // 返回接口返回的错误信息
    });
export default axios;