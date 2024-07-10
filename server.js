// app.js
const express = require('express');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');


const app = express();
const port = 3000;

const User = require('./models/user');
const Book = require('./models/book');
const BorrowHistory = require('./models/borrowHistory');

require('./repository/db');
require('./models/association');

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

app.get('/book/search', async (req, res) => {
  const { isbn } = req.query;
  const bookInstances = await Book.findAll({ where: { isbn } });
  const books = bookInstances.map(book => book.get({ plain: true }));
  const username = req.cookies.username;
  res.render('page/book', { title: 'Express Handlebars', layout: false, books, username });
})

app.post('/borrow' , async (req, res) => {
  console.log(req.body)
  const { isbn, email } = req.body;
  const book = await Book.findOne({ where: { isbn } });
  if (!book) {
    return res.status(404).send('Book not found');
  }
  const user = await User.findOne({ where: { email } });
  const borrowHistory = await BorrowHistory.create({ userId: user.id, bookId: book.id, borrowDate: new Date() });
  borrowHistory.save();
  await book.update({ is_borrowed: true });
  res.redirect('/book');
})

app.get('/borrow/:isbn' , async (req, res) => {
  const { isbn } = req.params;
  const username = req.cookies.username;
  res.render('page/borrowBook', { title: 'Express Handlebars', layout: false, isbn, username });
})

app.get('/borrow_history', async (req, res) => {
  const borrowHistories = await BorrowHistory.findAll({ include: [User, Book] });
  const histories = borrowHistories.map(history => history.get({ plain: true }));
  const username = req.cookies.username;
  res.render('page/borrowHistory', { title: 'Express Handlebars', layout: false, histories, username });
})

app.get('/return/:isbn', async (req, res) => {
  const { isbn } = req.params;
  const book = await Book.findOne({ where: { isbn } });
  const borrowHistory = await BorrowHistory.findOne({ where: { bookId: book.id, returnDate: null } });
  if (!borrowHistory) {
    return res.status(404).send('Book is not borrowed');
  }
  await borrowHistory.update({ returnDate: new Date() });
  await book.update({ is_borrowed: false });
  res.redirect('/borrow_history');
})

app.get('/searchBorrowHistory', async (req, res) => {
  const { email } = req.query;
  const borrowHistories = await BorrowHistory.findAll({ include: [User, Book], where: { '$User.email$': email } });
  const histories = borrowHistories.map(history => history.get({ plain: true }));
  const username = req.cookies.username;
  res.render('page/borrowHistory', { title: 'Express Handlebars', layout: false, histories, username });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});