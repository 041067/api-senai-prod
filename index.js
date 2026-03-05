// ====================================
// IMPORTAÇÕES - Carregando as bibliotecas que vamos usar
// ====================================

// Express é um framework (ferramenta) que facilita criar servidores e APIs em Node.js
// Uma API (Application Programming Interface) é como um "garçom" que recebe pedidos HTTP
// e retorna dados em formato JSON
const express = require('express');

// Importe para criar documentação automática da API usando Swagger
// Swagger é uma ferramenta que gera uma página interativa mostrando como usar a API
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// ====================================
// CONFIGURAÇÃO DO SWAGGER
// ====================================
// Aqui estou dizendo ao Swagger como documentar minha API
// Swagger vai gerar uma página visual onde você pode testar as rotas
const swaggerOptions = {
    definition: {
        // OpenAPI 3.0.0 é um padrão internacional para descrever APIs
        openapi: '3.0.0',
        // Informações básicas sobre a API
        info: {
            title: 'API de Produtos', // Nome da API
            version: '1.0.0', // Versão em desenvolvimento
            description: 'API para gerenciamento de produtos' // O que a API faz
        },
        // Onde a API está rodando (servidor local na porta 3000)
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ]
    },
    // Aqui dizemos ao Swagger onde encontrar os comentários que documentam as rotas
    apis: ['./index.js']
};

// Gera o documento Swagger baseado nas configurações acima
const swaggerDocument = swaggerJsdoc(swaggerOptions);

// ====================================
// INICIALIZAÇÃO DO EXPRESS
// ====================================

// Cria a aplicação Express - este é nosso servidor
const app = express();

// Permite que a aplicação receba e envie dados em formato JSON
// JSON é um formato de texto simples que organiza dados de forma estruturada
app.use(express.json());

// ====================================
// BANCO DE DADOS EM MEMÓRIA
// ====================================
// Um array (lista) que vai guardar todos os produtos
// Em uma aplicação real, usaríamos um banco de dados como PostgreSQL ou MongoDB
// Mas aqui usamos uma variável simples para fins de aprendizado
let produtos = [];

// ====================================
// ROTAS DA API
// ====================================
// Uma rota é um "caminho" que o navegador ou cliente pode acessar
// Cada rota tem um método HTTP (GET, POST, PUT, DELETE)
// GET = obter/ler dados
// POST = criar dados
// PUT = atualizar dados
// DELETE = deletar dados

/**
 * ROTA 1: LISTAR TODOS OS PRODUTOS
 * 
 * Descrição: Quando alguém acessa GET /api/produtos, 
 *           essa função retorna a lista completa de produtos
 * @swagger
 * /api/produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     description: Retorna todos os produtos cadastrados
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 */
app.get('/api/produtos', (req, res) => {
    // req = request (pedido do cliente)
    // res = response (resposta que vamos enviar)
    res.json(produtos); // Envia a lista de produtos em formato JSON
});

/**
 * ROTA 2: BUSCAR UM PRODUTO ESPECÍFICO
 * 
 * Descrição: Busca um único produto pelo seu ID
 * Exemplo: GET /api/produtos/1 retorna o produto com ID=1
 * @swagger
 * /api/produtos/{id}:
 *   get:
 *     summary: Busca um produto pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
app.get('/api/produtos/:id', (req, res) => {
    // Pega o ID da URL e converte para número inteiro
    // :id é um parâmetro dinâmico da rota
    const id = parseInt(req.params.id);
    
    // Procura na lista de produtos um que tenha o mesmo ID
    // find() percorre o array e retorna o primeiro que atender a condição
    const produto = produtos.find(p => p.id === id);

    // Se não encontrou o produto, retorna erro 404
    // 404 é o código para "Não encontrado"
    if (!produto) {
        return res.status(404).send('Produto não encontrado');
    }

    // Se encontrou, envia o produto como resposta
    res.json(produto);
});

/**
 * ROTA 3: CRIAR UM NOVO PRODUTO
 * 
 * Descrição: Recebe dados de um novo produto e adiciona à lista
 * O cliente envia os dados em formato JSON no corpo da requisição
 * @swagger
 * /api/produtos:
 *   post:
 *     summary: Cria um novo produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 */
app.post('/api/produtos', (req, res) => {
    // req.body contém os dados enviados pelo cliente
    // Exemplo: { "id": 1, "nome": "Notebook", "preco": 2500 }
    const produto = req.body;
    
    // Adiciona o novo produto à lista
    // push() adiciona um elemento no final do array
    produtos.push(produto);
    
    // Retorna o produto criado com código 201
    // 201 significa "Criado com sucesso"
    res.status(201).json(produto);
});

/**
 * ROTA 4: ATUALIZAR UM PRODUTO
 * 
 * Descrição: Substitui os dados de um produto existente
 * Exemplo: PUT /api/produtos/1 com dados novos atualiza o produto ID=1
 * @swagger
 * /api/produtos/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *     responses:
 *       204:
 *         description: Produto atualizado
 *       404:
 *         description: Produto não encontrado
 */
app.put('/api/produtos/:id', (req, res) => {
    // Pega o ID e converte para número
    const id = parseInt(req.params.id);
    
    // Procura o índice (posição) do produto na lista
    // findIndex() retorna a posição, não o objeto
    const index = produtos.findIndex(p => p.id === id);

    // Se não encontrou (retorna -1), produto não existe
    if (index === -1) {
        return res.status(404).send('Produto não encontrado');
    }

    // Substitui o produto antigo pelo novo
    // Usa o índice para acessar a posição correta no array
    produtos[index] = req.body;
    
    // Retorna 204 (No Content) - sucesso, mas sem conteúdo na resposta
    res.sendStatus(204);
});

/**
 * ROTA 5: DELETAR UM PRODUTO
 * 
 * Descrição: Remove um produto da lista
 * Exemplo: DELETE /api/produtos/1 remove o produto com ID=1
 * @swagger
 * /api/produtos/{id}:
 *   delete:
 *     summary: Remove um produto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Produto removido
 */
app.delete('/api/produtos/:id', (req, res) => {
    // Pega o ID e converte para número
    const id = parseInt(req.params.id);
    
    // filter() cria uma nova lista com apenas os produtos que NÃO têm esse ID
    // Assim, o produto com esse ID é removido
    // Exemplo: Se temos [1, 2, 3] e removemos ID=2, fica [1, 3]
    produtos = produtos.filter(p => p.id !== id);
    
    // Retorna 204 (No Content) - sucesso!
    res.sendStatus(204);
});

// ====================================
// CONFIGURAÇÃO DO SWAGGER (DOCUMENTAÇÃO)
// ====================================
// Adiciona a rota /swagger que mostra a documentação interativa da API
// Você pode acessar em http://localhost:3000/swagger para testar as rotas
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ====================================
// INICIANDO O SERVIDOR
// ====================================
// Inicia o servidor na porta 3000
// Porta é como um "endereço" dentro do computador para acessar a aplicação
// Ficará rodando em http://localhost:3000
app.listen(3000, () => {
    // Mensagem que aparece no console quando o servidor inicia com sucesso
    console.log('API rodando em http://localhost:3000/swagger');
});