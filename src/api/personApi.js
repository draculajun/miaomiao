import axios from './axios-init'

const PersonApi = {

    page(params) {
        let promise = new Promise((resolve, reject) => {
            axios.post(`http://localhost:8082/person/page/`, params).then(responseBody => {
                if (responseBody.status == 200 && responseBody.data.code == 200) {
                    resolve(responseBody.data.data);
                }
            }).catch(error => {
                console.log(error);
                reject(error);
            })
        });
        return promise;
    },
    person(id) {
        let promise = new Promise((resolve, reject) => {
            axios.get(`http://localhost:8082/person/${id}`).then(responseBody => {
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

export default PersonApi