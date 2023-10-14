/**
 * @author Enéas Almeida <eneas.eng@yahoo.com>
 * @description O algoritmo ler um arquivo txt e transforma para xlsx
 */

const AxiosHttpClient = require('./keepalive');
const axios = AxiosHttpClient.getInstance();

const api = async (id) => {
    return axios
        .get(`https://jsonplaceholder.typicode.com/photos/${id}`)
        .then((res) => res.data)
        .catch((err) => {
            throw err;
        });
};

const cache = async (data) => {
    const startTime = performance.now();

    const aux = [];

    let countResolved = 0;

    for (const id of data) {
        await api(id)
            .then(({ title, url }) => {
                aux.push({ id, title, url });
            })
            .then(() => {
                console.log('id', id, 'resolved', ++countResolved);
            });
    }

    const endTime = performance.now();
    const elapsedTimeInMilliseconds = endTime - startTime;
    const elapsedTimeInSeconds = elapsedTimeInMilliseconds / 1000;

    aux.sort((a, b) => a.id - b.id);

    return {
        data: aux,
        elapsedTime: {
            miliseconds: elapsedTimeInMilliseconds,
            seconds: elapsedTimeInSeconds,
        },
    };
};

(async () => {
    const ids = [];

    const total = 400;

    for (let i = 1; i <= total; i++) ids.push(i);

    const { data, elapsedTime } = await cache(ids);

    console.log('data', data);
    console.log('Elapsed time in miliseconds', elapsedTime.miliseconds);
    console.log('Elapsed time in seconds', elapsedTime.seconds);
})();
