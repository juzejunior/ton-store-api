const axios = require('axios');

exports.handler = async (event) => {
    let body;
    let statusCode = 200;
    let url = 'https://api.countapi.xyz/get/tonstore.com.br/appAccessCounter';

    axios({
        method:'get',
        url,
    })
    .then(function (response) {
        body = JSON.stringify(response.data);
    })
    .catch(function (error) {
        statusCode = 400;
        body = err.message;
    });

    const response = {
        statusCode: statusCode,
        body: body,
        headers: headers
    };
  
    return response;
};