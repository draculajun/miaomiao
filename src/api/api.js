import axios from './axios-init'

const BaseApi = {

    post(url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, params).then(responseBody => {
                if (responseBody.status == 200 && responseBody.data.code == 200) {
                    resolve(responseBody.data.data);
                }
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    },

    put(url, params) {
        return new Promise((resolve, reject) => {
            axios.put(url, params).then(responseBody => {
                if (responseBody.status == 200 && responseBody.data.code == 200) {
                    resolve(responseBody.data.data);
                }
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    },

    get(url) {
        return new Promise((resolve, reject) => {
            axios.get(url).then(responseBody => {
                if (responseBody.status == 200 && responseBody.data.code == 200) {
                    resolve(responseBody.data.data);
                }
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    },

    delete(url) {
        return new Promise((resolve, reject) => {
            axios.delete(url).then(responseBody => {
                if (responseBody.status == 200 && responseBody.data.code == 200) {
                    resolve(responseBody.data.data);
                }
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    },

    formPost(url, formData){
        return new Promise((resolve, reject) => {
            axios.post(url, formData).then(responseBody => {
                console.log(responseBody);
                if (responseBody.status == 200) {
                    resolve(responseBody.data);
                }
            }).catch(error => {
                reject(error);
            });
        })
    }


}

export default BaseApi