import axios from './axios-init'

const BaseApi = {

    post(url, params) {
        let promise = new Promise((resolve, reject) => {
            axios.post(url, params).then(responseBody => {
                if (responseBody.status == 200 && responseBody.data.code == 200) {
                    resolve(responseBody.data.data);
                }
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
        return promise;
    },

    put(url, params) {
        let promise = new Promise((resolve, reject) => {
            axios.put(url, params).then(responseBody => {
                if (responseBody.status == 200 && responseBody.data.code == 200) {
                    resolve(responseBody.data.data);
                }
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
        return promise;
    },

    get(url) {
        let promise = new Promise((resolve, reject) => {
            axios.get(url).then(responseBody => {
                if (responseBody.status == 200 && responseBody.data.code == 200) {
                    resolve(responseBody.data.data);
                }
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
        return promise;
    },

    delete(url) {
        let promise = new Promise((resolve, reject) => {
            axios.delete(url).then(responseBody => {
                if (responseBody.status == 200 && responseBody.data.code == 200) {
                    resolve(responseBody.data.data);
                }
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
        return promise;
    }


}

export default BaseApi