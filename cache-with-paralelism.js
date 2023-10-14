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

const cache = async (data, qtePerGroup) => {
    const startTime = performance.now();

    const aux = [],
        groups = [];

    for (let i = 0; i < data.length; i = i + qtePerGroup) {
        groups.push(data.slice(i, i + qtePerGroup));
    }

    let countResolved = 0;

    for (const item of groups) {
        await Promise.all(
            item.map((id) => {
                return new Promise((resolve, reject) => {
                    resolve(
                        api(id)
                            .then(({ title, url }) => {
                                aux.push({ id, title, url });
                            })
                            .then(() => {
                                console.log('id', id, 'resolved', ++countResolved);
                            })
                    );
                });
            })
        );
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

    for (let i = 1; i <= 400; i++) ids.push(i);

    const { data, elapsedTime } = await cache(ids, ids.length / 2);

    console.log('data', data);
    console.log('Elapsed time in miliseconds', elapsedTime.miliseconds);
    console.log('Elapsed time in seconds', elapsedTime.seconds);
})();
