const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { allMonsters, addMonster } = require ('./custom-monsters');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.json());

app.get('/api/custom-monsters', async (_, res) => {
  const monsters = await allMonsters();
  res.json(monsters);
});

app.post('/api/custom-monsters', async (req, res) => {
  const monster = req.body;
  try {
    await addMonster(monster);
    res.status(200);
  } catch (err) {
    res.status(500);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
