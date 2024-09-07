require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const validate = require("validator")

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});


const URLDB = {};

app.post("/api/shorturl", (req, res) => {
  const url = req.body.url;

  const options = {
    protocols: ['http', 'https', 'ftp'],  // Autoriser les protocoles http, https et ftp
    require_protocol: true,               // Le protocole est requis
    require_tld: false,                  // Autoriser les TLD non standard
    allow_trailing_dot: false,           // Ne pas autoriser un point final
    allow_underscores: true,             // Autoriser les underscores dans le domaine
    min_domain_segments: 1,              // Autoriser au moins 1 segment de domaine (pour localhost)
    max_domain_segments: 3               // Autoriser jusqu'à 3 segments de domaine
};

  if (!validate.isURL(url, options)) {
    console.log("bad: ", url);
    res.json({ error: "Invalid URL" });
  }
  else {
    console.log("good: ", url);
    if (URLDB[url] === undefined) {
      const id = Object.entries(URLDB).length + 1
      URLDB[url] = id;

      res.json({
        original_url: url,
        short_url: id
      })
    }
    else {
      res.json({
        original_url: url,
        short_url: URLDB[url]
      })
    }
  }
})

app.get("/api/shorturl/:id", (req, res) => {
  let id = req.params.id;
  const tableURL = Object.entries(URLDB);

  if(!(id = Number.parseInt(id))){
    res.json({error: "Wrong format"})
    return;
  }

  if(id > tableURL.length){
    res.json({error: "No short URL found for the given input"});
    return;
  }

  res.redirect(tableURL[id - 1][0]);
})