/**
 * @author Enéas Almeida <eneas.eng@yahoo.com>
 * @description O algoritmo ler um arquivo txt e transforma para xlsx
 */

const { HttpsAgent } = require('agentkeepalive');
const axios = require('axios');
const axiosRetry = require('axios-retry');

const AGENTKEEPALIVE_MAX_SOCKETS = 2000;
const AGENTKEEPALIVE_MAX_FREE_SOCKETS = 20;
const AGENTKEEPALIVE_TIMEOUT = 60000;
const AGENTKEEPALIVE_FREE_SOCKET_TIMEOUT = 30000;

const AXIOS_RETRY_ATTEMPTS = 3;

class AxiosHttpClient {
    getInstance() {
        const axiosInstance = axios.create({
            httpsAgent: new HttpsAgent({
                maxSockets: AGENTKEEPALIVE_MAX_SOCKETS,
                maxFreeSockets: AGENTKEEPALIVE_MAX_FREE_SOCKETS,
                timeout: AGENTKEEPALIVE_TIMEOUT,
                freeSocketTimeout: AGENTKEEPALIVE_FREE_SOCKET_TIMEOUT,
            }),
        });

        axiosRetry(axiosInstance, {
            retries: AXIOS_RETRY_ATTEMPTS,
            retryDelay: axiosRetry.exponentialDelay,
            retryCondition: axiosRetry.isNetworkOrIdempotentRequestError,
            shouldResetTimeout: true,
        });

        return axiosInstance;
    }
}

module.exports = new AxiosHttpClient();
