const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1', //localhost
      port: 5432,
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
  });

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

db.select('*')
    .from('users')
    .then(data => { //no need JSON
    //console.log(data);
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

//ROOT
app.get('/', (req, res) => {
    res.send("Success")
})

app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res, db) => { profile.handleProfileGet(req, res, db) });
app.put('/image', (req, res, db) => { image.handleImage(req, res, db) });

app.listen(3000, () => {
    console.log('app is running on port 3000');
})

/*
/--> res = this is working
/signin --> POST = res success or fail (password over HTTPS body)
/register --> POST add to database/variable with new user = new user
/profile/:userId --> GET = user
/image --> PUT (update count on user profile) --> user
*/