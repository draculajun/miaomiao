import axios from 'axios';
import {
    Loading,
    MessageBox,
} from 'element-ui'

// axios.defaults.baseURL = ''; // 配置axios请求的地址
axios.defaults.timeout = 100000; // 超时时间
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers.put['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.crossDomain = true;
// axios.defaults.withCredentials = true;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息

localStorage.setItem('appId', 'WEB');
localStorage.setItem('token', '1f77cd9acf55968cd7b6a44a4c2025f7');

axios.interceptors.request.use(
    config => {
        startLoading();
        if (Object.prototype.toString.call(config.data) != '[object FormData]') { //求参数类型为FormData时，不需要转换为JSON字符串
            config.data = JSON.stringify(config.data);
        }
        if (localStorage.getItem("token")) {
            config.headers.appId = localStorage.getItem("appId");
            config.headers.token = localStorage.getItem("token");
        } else {
            endLoading();
            missToken();
            return Promise.reject('无token');
        }
        return config;
    },
    error => {
        return Promise.reject(error.response);
    });

// 路由响应拦截
// http response 拦截器
axios.interceptors.response.use(
    response => {
        endLoading();
        if (response.data.code == "404") {
            console.log("404")
            return;
        } else {
            return response;
        }
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误(400)';
                    break;
                case 401:
                    this.$router.push('/login');
                    break;
                case 403:
                    error.message = '拒绝访问(403)';
                    break;
                case 404:
                    error.message = '请求出错(404)';
                    break;
                case 408:
                    error.message = '请求超时(408)';
                    break;
                case 500:
                    error.message = '服务器错误(500)';
                    break;
                case 501:
                    error.message = '服务未实现(501)';
                    break;
                case 502:
                    error.message = '网络错误(502)';
                    break;
                case 503:
                    error.message = '服务不可用(503)';
                    break;
                case 504:
                    error.message = '网络超时(504)';
                    break;
                case 505:
                    error.message = 'HTTP版本不受支持(505)';
                    break;
                default:
                    error.message = `连接出错(${error.response.status})!`;
            }
        } else {
            error.message = '连接服务器失败!'
        }
        return Promise.reject(error);
    });

let loadingInstance;

function startLoading() { //使用Element loading-start 方法
    loadingInstance = Loading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(255,255,255,0)',
    })
}

function endLoading() { //使用Element loading-close 方法
    loadingInstance.close();
}

function missToken() {
    MessageBox.alert('请先登录平台', '警告', {
        confirmButtonText: '确定',
        type: 'error'
    }).then(() => {
        window.location.href = 'http://www.baidu.com';
    });
}

export default axios;