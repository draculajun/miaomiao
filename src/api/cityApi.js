import BaseApi from './api'

const CityApi = {

    cities(params) {
        let url = 'http://localhost:8082/cities/';
        return BaseApi.post(url, params);
    }

}

export default CityApi