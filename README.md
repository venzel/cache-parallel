# Cache Parallel

Esse script tem como função processar requisições http de forma paralela com estratégias de resiliência, com o objetivo de criar um cache de objetos.

## Exemplo

Deseja-se obter o payload dos ids de 1 até 400 da sequinte requisição:

```bash
const api = async (id) => {
    return axios
        .get(`https://jsonplaceholder.typicode.com/photos/${id}`)
        .then((res) => res.data)
        .catch((err) => {
            throw err;
        });
};

# Objeto resultante da requisição na função api, com id = 1
# {
#     id: 1,
#     title: 'accusamus beatae ad facilis cum similique qui sunt',
#     url: 'https://via.placeholder.com/600/92c952'
# }
```

Agora, imaginemos que necessitamos consultar 400 ids, um a um, se torna custoso esse tipo de requisição,
com isso, se torna interessante o uso de paralelismo de requisições.

## Resultados

-   Sem paralelismo, foi possível processar 400 requisições em ~11.8 segundos;
-   Com paralelismo, 400 requisições em ~1,5 segundos.

## Para executar

```bash
# Sem paralelismo
node cache-without-paralelism.js

# Com paralelismo
node cache-with-paralelism.js
```

<div>
  <img align="left" src="https://imgur.com/k8HFd0F.png" width=35 alt="Profile"/>
  <sub>Made with 💙 by <a href="https://github.com/venzel">Enéas Almeida</a></sub>
</div>
