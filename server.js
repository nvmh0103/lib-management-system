// app.js
const express = require('express');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');


const app = express();
const port = 3000;

const User = require('./models/user');
const Book = require('./models/book');

require('./repository/db');

app.engine('handlebars', engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.get('/', (req, res) => {
  const username = req.cookies.username;
  res.render('page/landingPage', {title: 'Express Handlebars', layout: false, username });
})

app.get('/login', (req, res) => {
  res.render('page/login', {title: 'Express Handlebars', layout: false });
})

app.get('/logout', (req, res) => {
  res.clearCookie('username');
  res.redirect('/');
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password)
  const user = await User.findOne({where: { username }});
  if (!user || user.password !== password || user.role !== 'admin') {
    return res.render('page/login', { title: 'Express Handlebars', layout: false, error: 'Invalid username or password' });
  }

  // Set a cookie named 'username' with the value of the username
  res.cookie('username', username, { httpOnly: true, maxAge: 900000 }); // Options are optional

  res.redirect('/')
})

app.get('/user', async (req, res) => {
  const userInstances = await User.findAll({where: { role: 'user' }});
  const users = userInstances.map(user => user.get({ plain: true }));
  const username = req.cookies.username;
  console.log(users)
  res.render('page/user', { title: 'Express Handlebars', layout: false, users, username });
})

app.get('/book', async (req, res) => {
  const bookInstances = await Book.findAll();
  const books = bookInstances.map(book => book.get({ plain: true }));
  const username = req.cookies.username;
  res.render('page/book', { title: 'Express Handlebars', layout: false, books, username });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});