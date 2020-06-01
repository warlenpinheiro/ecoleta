import express from 'express';

const app = express();

app.get('/users', (request, response) => {
  response.json([
    'Teste1',
    'Teste2',
    'Teste3'
  ]);
});

app.listen(3333);