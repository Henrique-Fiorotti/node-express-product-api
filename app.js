const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const { parse } = require('path');

app.get('/produtos', (req, res) => {
  fs.readFile('produtos.json',(err, data)=>{
    if (err) {
      res.status(500).send('Erro ao ler arquivo');
      return;
    }
    try {
      const produtos = JSON.parse(data.toString());
      res.send(produtos);
    }
    catch (e) {
      res.status(500).send('Erro ao processar o arquivo JSON')
    }
  });
})

app.get('/produtos/:ID', (req, res) => {
  fs.readFile('produtos.json',(err, data)=>{
    if (err) {
      res.status(500).send('Erro ao ler arquivo');
      return;
    }
    try {
      const produtos = JSON.parse(data.toString());
      const item = produtos.find((produto) => String(produto.ID) === req.params.ID)
      if(item){
        res.send(item)
      }
      else{
        res.send(`[ERRO] Não foi possível achar o produto.`)
      }

    }
    catch (e) {
      res.status(500).send('Erro ao processar o arquivo JSON')
    }
  });
})

app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log(`Servidor aberto na porta: http://localhost:${port}`);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});