// Importa o framework Express
const express = require('express');

// Importa o Swagger UI para documentação
const swaggerUi = require('swagger-ui-express');

// Cria a aplicação Express
const app = express();

// Permite receber JSON no corpo das requisições
app.use(express.json());

// ==========================
// "Banco de dados" em memória
// ==========================
let produtos = [];

// ==========================
// GET - Listar todos produtos
// ==========================
app.get('/api/produtos', (req, res) => {
    res.json(produtos);
});

// ==========================
// GET - Buscar produto por ID
// ==========================
app.get('/api/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return res.status(404).send('Produto não encontrado');
    }

    res.json(produto);
});

// ==========================
// POST - Criar produto
// ==========================
app.post('/api/produtos', (req, res) => {
    const produto = req.body;
    produtos.push(produto);
    res.status(201).json(produto);
});

// ==========================
// PUT - Atualizar produto
// ==========================
app.put('/api/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).send('Produto não encontrado');
    }

    produtos[index] = req.body;
    res.sendStatus(204);
});

// ==========================
// DELETE - Remover produto
// ==========================
app.delete('/api/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    produtos = produtos.filter(p => p.id !== id);
    res.sendStatus(204);
});

// ==========================
// Swagger
// ==========================
const swaggerDocument = require('./swagger.json');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Inicia o servidor
app.listen(3000, () => {
    console.log('API rodando em http://localhost:3000/swagger');
});