import BaseApi from './api'

const PersonApi = {

    page(params){
        let url = 'http://localhost:8082/person/page/';
        return BaseApi.post(url, params);
    },

    person(id) {
        let url = `http://localhost:8082/person/${id}`;
        return BaseApi.get(url);
    },

    insert(params){
        let url = 'http://localhost:8082/person/';
        return BaseApi.post(url, params);
    },

    update(params){
        let url = 'http://localhost:8082/person/';
        return BaseApi.put(url, params);
    },

    delete(id) {
        let url = `http://localhost:8082/person/${id}`;
        return BaseApi.delete(url);
    },


}

export default PersonApi