const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('<h3>DB Helpers with knex</h3>');
})

server.get('/api/posts', (req, res) => {
  db.select().from('accounts').then(data => {
    res.send(data)
  })
    .catch(err => {
      res.send(err);
    })
})

server.post('/api/posts', (req, res) => {
  const post = req.body;

  db.insert(post)
    .into('accounts')
    .then(accounts => {
      res.status(201).json(accounts);
    })
    .catch(err => {
      res.status(500).json(err);
    })
})

server.post('/api/products', (req, res) => {
  const product = req.body;

  db.insert(product)
    .into('products')
    .then(products => {
      res.json(products)
    })
    .catch(err => res.json(err))
})

server.put('/api/products/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('products')
    .where('id', '=', id)
    .update(changes)
    .then(count => {
      res.status(200).json(count)
    })
    .catch(err => {
      res.status(500).json(err);
    })
})

server.put('/api/posts/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('accounts')
    .where('id', '=', id)
    .update(changes)
    .then(num => res.status(200).json(num))
    .catch(err => res.status(500).json(err))
})

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  db('accounts')
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    })
})

server.delete('/api/posts/delete/:name', (req, res) => {

  db('accounts')
    .where('name', '=', req.params.name)
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    })
})

module.exports = server;