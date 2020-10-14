const express = require('express');
const app = express();
const data = require('./data/data');

const cors = require('cors');



app.get('/api', (req, res) => {
   
    res.setHeader('Content-Type','application/json')
    res.send(JSON.stringify(data));
    
});



const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});