import express, { json } from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import https from 'https';
import fs from 'fs';

const app = express();
const URI = 'mongodb://localhost:27017';
const client = new MongoClient(URI);

const credentials = {
  key: fs.readFileSync(process.env.SERVER_KEY),
  cert: fs.readFileSync(process.env.SERVER_CRT),
};

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: { user: process.env.GMAIL_USER_NAME, pass: process.env.GMAIL_PASSWORD },
});

app.use(cors({ origin: '*' }));
app.use(json());
app.use(express.urlencoded({ extended: true }));

const server = https.createServer(credentials, app);

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

app.get('/account', (req, res) => {
  console.log(req.headers);
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Bearer ')) {
    res.status(403).send({ error: 'cannot verify jwt' });
    return;
  }

  const token = auth.substring(7, auth.length);
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    res.status(403).send({ error: 'cannot verify jwt' });
    return;
  }

  const { mail, expiration, password } = decoded;

  if (expiration < new Date()) {
    res.status(403).send();
  }

  authenticateUser(mail, password);
});

server.listen(3000);

function generateToken(mail, password) {
  const date = new Date();
  date.setDate(date.getHours() + 1);

  return jwt.sign({ mail, expiration: date, password }, process.env.JWT_SECRET);
}

async function registerUser(user) {
  if ((await findUser(user.mail)) || (await findUser(user.name))) {
    return false;
  }

  await client.connect();
  const database = client.db('discord-clone');
  const users = database.collection('users');

  user.password = await bcryptjs.hash(user.password, 10);

  const token = generateToken(user.email, user.password);
  const link = `localhost:3000/account?token=${token}`;

  const mailOptions = {
    from: process.env.GMAIL_USER_NAME,
    to: user.mail,
    html: `<p>Hi ${user.name}</p> <a href="${link}">${link}</a>`,
    subject: "You've been registered",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }

    console.log(info);
  });

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
