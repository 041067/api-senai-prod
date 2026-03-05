# Manual da API de Produtos

## 1. Introdução

A API de Produtos foi desenvolvida para permitir o gerenciamento de produtos por meio de requisições HTTP.

A aplicação segue o padrão **REST (Representational State Transfer)**, permitindo que sistemas clientes realizem operações de:

* Cadastro de produtos
* Consulta de produtos
* Atualização de produtos
* Exclusão de produtos

As informações são enviadas e recebidas no formato **JSON**, que é amplamente utilizado em aplicações web.

---

# 2. Arquitetura da API

A aplicação utiliza o modelo **Cliente-Servidor**.

Fluxo de funcionamento da aplicação:

Cliente (Browser / Postman)
↓
Requisição HTTP
↓
Servidor Node.js (API)
↓
Processamento da rota
↓
Resposta em JSON

### Explicação do fluxo

1. O cliente envia uma requisição HTTP para a API.
2. O servidor recebe a requisição.
3. O Express identifica qual rota deve ser executada.
4. A aplicação processa a lógica da rota.
5. O servidor retorna uma resposta em formato JSON.

---

# 3. Tecnologias Utilizadas

| Tecnologia | Descrição                               |
| ---------- | --------------------------------------- |
| Node.js    | Ambiente de execução JavaScript         |
| Express    | Framework utilizado para criação da API |
| Swagger    | Ferramenta de documentação da API       |
| JavaScript | Linguagem utilizada no desenvolvimento  |

---

# 4. Estrutura do Projeto

Estrutura básica do projeto:

API-PRODUTOS

node_modules
index.js
package.json
swagger.json
README.md

Descrição dos arquivos:

| Arquivo      | Descrição                                |
| ------------ | ---------------------------------------- |
| index.js     | Arquivo principal onde a API é executada |
| package.json | Gerencia as dependências do projeto      |
| swagger.json | Configuração da documentação da API      |
| README.md    | Manual de utilização da API              |

---

# 5. Instalação do Projeto

## Passo 1 – Baixar o projeto

Faça o download ou copie a pasta do projeto para o computador.

---

## Passo 2 – Abrir o projeto no VS Code

Abra o **Visual Studio Code** e selecione a pasta do projeto.

---

## Passo 3 – Instalar as dependências

Abra o terminal do VS Code e execute o comando:

npm install

Este comando instala todas as bibliotecas necessárias para o funcionamento da aplicação.

---

# 6. Execução da API

Após instalar as dependências, execute o comando:

node index.js

Se tudo estiver correto, o servidor será iniciado.

---

# 7. Acessando a documentação da API

A documentação da API pode ser acessada no navegador através do endereço:

http://localhost:3000/swagger

Nesta página é possível:

* visualizar todos os endpoints
* testar requisições
* visualizar as respostas da API

---

# 8. Endpoints da API

## Listar produtos

Método:

GET /api/produtos

Descrição:

Retorna todos os produtos cadastrados.

Exemplo de resposta:

[
{
"id": 1,
"nome": "Notebook",
"preco": 3500
}
]

---

## Buscar produto por ID

Método:

GET /api/produtos/{id}

Exemplo:

GET /api/produtos/1

Resposta esperada:

{
"id": 1,
"nome": "Notebook",
"preco": 3500
}

---

## Cadastrar produto

Método:

POST /api/produtos

Exemplo de requisição:

{
"id": 2,
"nome": "Mouse",
"preco": 150
}

---

## Atualizar produto

Método:

PUT /api/produtos/{id}

Exemplo:

{
"id": 2,
"nome": "Mouse Gamer",
"preco": 220
}

---

## Excluir produto

Método:

DELETE /api/produtos/{id}

Exemplo:

DELETE /api/produtos/2

---

# 9. Funcionamento do Código (index.js)

O arquivo **index.js** é o responsável por iniciar o servidor e configurar as rotas da API.

### Importação das bibliotecas

Nesta parte são importadas as bibliotecas necessárias para executar a aplicação.

### Criação do servidor

O Express é utilizado para criar o servidor da aplicação.

### Configuração das rotas

As rotas definem quais ações a API deve executar quando uma requisição é recebida.

Exemplo de rota:

app.get("/api/produtos", (req, res) => {
res.json(produtos);
});

Esta rota retorna a lista de produtos cadastrados.

### Inicialização do servidor

O servidor é iniciado utilizando o método `listen`.

Exemplo:

app.listen(3000, () => {
console.log("Servidor rodando na porta 3000");
});

---

# 10. Exemplo de Requisição HTTP

Exemplo de requisição enviada para a API:

POST /api/produtos
Host: localhost:3000
Content-Type: application/json

Corpo da requisição:

{
"id": 3,
"nome": "Monitor",
"preco": 900
}

---

# 11. Limitações da API

Atualmente os dados são armazenados em **memória**, o que significa que:

* os dados não são salvos permanentemente
* ao reiniciar o servidor os dados são apagados

Para aplicações reais recomenda-se utilizar um banco de dados, como:

* MySQL
* PostgreSQL
* MongoDB

---

# 12. Conclusão

A API de Produtos permite realizar operações básicas de gerenciamento de produtos utilizando o padrão REST.

Este projeto demonstra conceitos importantes como:

* desenvolvimento de APIs com Node.js
* utilização do framework Express
* criação de rotas HTTP
* retorno de dados em formato JSON
* documentação de APIs com Swagger
