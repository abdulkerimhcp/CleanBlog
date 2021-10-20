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

//Routes
const postController = require('./controllers/postController');
app.get('/', postController.getAllPost);
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.createPost);
app.post('/posts/edit/:id', postController.updatePost);
app.get('/posts/delete/:id', postController.deletePost);


const pageController = require('./controllers/pageController');
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/posts/edit/:id', pageController.getEditPage);

const port = 5858;
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} başlatıldı..`);
});
