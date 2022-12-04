const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const db = knex({ 
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    host: process.env.DATABASE_HOST,
    port: 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_DB
  }
});

//Controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
app.use(bodyParser.json());
app.use(cors());

//ROOT
app.get('/', (req, res) => { res.send("Success") })

//SIGNIN (post, pw over HTTP body)
app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) });

//REGISTER (post, add to database)
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

//PROFILE (get user)
app.get('/profile/:id', (req, res, db) => { profile.handleProfileGet(req, res, db) });

//IMAGE (put, update count on user profile)
app.put('/image', (req, res) => { image.handleImage(req, res, db) });

//IMAGEURL (post, handle Face Recognition API from backend)
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})

