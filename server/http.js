const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { allMonsters, addMonster } = require('./custom-monsters');
const { addUser, getOwnershipToken } = require('./user');
const fetch = require('node-fetch');
const { OAuth2Client } = require('google-auth-library');

const googleClientId = '378922647851-5q3eso0k4i4qbfkhtd4ob13rdep0og1p.apps.googleusercontent.com'
const client = new OAuth2Client(googleClientId);

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.json());

app.get('/api/custom-monsters', async (_, res) => {
  const monsters = await allMonsters();
  res.json(monsters);
});

app.post('/api/custom-monsters', async (req, res) => {
  try {
    const token = req.body.token;

    const auth = await client.verifyIdToken({
      idToken: token,
      audience: googleClientId,
    });

    const authBody = await auth.getPayload();
    const emailAddress = authBody.email;

    let ownershipToken = await getOwnershipToken(emailAddress);
    if (!ownershipToken) {
      const user = await addUser(emailAddress);
      ownershipToken = user.ownershipToken;
    }

    const monster = req.body.monster;
    await addMonster(ownershipToken, monster);
    res.status(200).end();
  } catch (err) {
    res.status(500).send(err.toString()).end();
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(path.join(__dirname, '../build', 'index.html')));
});

app.listen(port, () => console.error(`Example app listening on port ${port}!`));
