const app = require('./index');

app.get("/api/whoami", (req, res) =>{
    const result = {
        ipaddress: req.ip,
        language: req.rawHeaders[req.rawHeaders.length - 3],
        software: req.headers["user-agent"],
        // test: 
    }
    
    res.json(result);
  });
  