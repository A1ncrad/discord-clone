import express, { json } from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import bcryptjs from 'bcryptjs';
const nodemailer = require('nodemailer');

const app = express();
const URI = 'mongodb://localhost:27017';
const client = new MongoClient(URI);

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: { user: '90b976ef45cfe3', pass: '748b30acf54086' },
});

app.use(cors());
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
  console.log(req.body);

  authenticateUser(req.body)
    .then((bool) => {
      res.status(bool ? 200 : 400);
      res.send();
    })
    .catch(console.log);
});

app.post('/register', (req, res) => {
  console.log(req.body);

  registerUser(req.body).then((bool) => {
    res.status(bool ? 200 : 400);
    res.send();
  });
});

app.listen(3000);

async function registerUser(user) {
  if ((await findUser(user.mail)) || (await findUser(user.name))) {
    return false;
  }

  await client.connect();
  const database = client.db('discord-clone');
  const users = database.collection('users');

  user.password = await bcryptjs.hash(user.password, 10);

  await users.insertOne(user);
  await client.close();

  return true;
}

async function authenticateUser({ mail, password: recievedPassword }) {
  const user = await findUser(mail);
  const actualPassword = user?.password;

  return await bcryptjs.compare(recievedPassword, actualPassword);
}

async function findUser(mail) {
  await client.connect();
  const database = client.db('discord-clone');
  const users = database.collection('users');

  const user = users.findOne({ mail });

  return user;
}
