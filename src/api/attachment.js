import axios from './axios-init'

const attachmentUrl = 'http://172.16.0.170:5006/file';

const AttachmentApi = {

    upload(formData, ownerTable, docType, ownerId) {
        // let config = {
        //     headers: {
        //         'Content-Type': 'application/json; charset=UTF-8'
        //     }
        // }
        return new Promise((resolve, reject) => {
            // axios.post('http://localhost:8082/upload', formData, config).then(responseBody => {
            //     if (responseBody.status == 200 && responseBody.data.code == 200) {
            //         resolve(responseBody.data.data);
            //     }
            // });
            axios.post(`${attachmentUrl}/upload/${ownerTable}/${docType}/${ownerId}`, formData).then(responseBody => {
                if (responseBody.status == 200 && responseBody.data.code == 'OK') {
                    resolve(responseBody.data.list);
                }
            }).catch(error => {
                reject(error);
            });
        });
    },

    downloadList(ownerTable, ownerId) {
        return new Promise((resolve, reject) => {
            axios.get(`${attachmentUrl}/${ownerTable}/${ownerId}`).then(responseBody => {
                if (responseBody.status == 200 && responseBody.data.code == 'OK') {
                    let attachmentArr = [];
                    responseBody.data.list.forEach(element => {
                        let url = element.contextPath + element.URL + "&appId=WEB" + "&token=" + localStorage.getItem("token");
                        attachmentArr.push({
                            'name': element.description,
                            'url': url,
                            'docLinkSid': element.docLinkSid
                        });
                    });
                    resolve(attachmentArr);
                }
            }).catch(error => {
                reject(error);
            });
        });
    },

    delete(docLinkSid) {
        return new Promise((resolve, reject) => {
            axios.delete(`${attachmentUrl}/${docLinkSid}`).then(responseBody => {
                if (responseBody.status == 200 && responseBody.data.code == 'OK') {
                    resolve(responseBody);
                }
            }).catch(error => {
                reject(error);
            });
        });
    },

}

export default AttachmentApi