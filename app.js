const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Configuración de sesión
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

mongoose.connect('mongodb+srv://ezbrayan:brayan1082@cluster0.cnjhvmf.mongodb.net/login?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,

});

const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});