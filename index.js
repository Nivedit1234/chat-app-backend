const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

require('dotenv').config();
const PORT = process.env.PORT || 3001;

app.post('/authenticate', async (req, res) => {
  const { username } = req.body;
  // Get or create user on Chat Engine!
  try {
    const r = await axios.put(
      'https://api.chatengine.io/users/',
      { username: username, secret: username, first_name: username },
      { headers: { 'Private-Key': 'bd807ac4-fd95-46d4-914f-b2fa4436be4e' } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.status).json(e.data);
  }
});

app.listen(`${PORT}`);
