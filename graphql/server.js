const app = require('./app');
const express = require('express');

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.GRAPHQL_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor GraphQL rodando na porta ${PORT}`);
});
