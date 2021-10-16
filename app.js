const express = require('express');
const ejs = require('ejs');
const Post = require('./models/Post');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cleanblog-test-db');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.render('index', { posts });
});

app.get('/post/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', { post });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});
app.post('/add_new_post', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});

const port = 5858;
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} başlatıldı..`);
});
