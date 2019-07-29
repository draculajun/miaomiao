import BaseApi from './api'

const PersonApi = {

    page(params){
        let url = 'http://localhost:8082/person/page/';
        return BaseApi.post(url, params);
    },

    person(id) {
        let url = `http://localhost:8082/person/${id}`;
        return BaseApi.get(url);
    }
    

}

export default PersonApi