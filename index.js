const express = require('express');
const path = require('path')
const gameRoutes = require('./routes/game');
const app = express();

port = process.env.PORT || 3000;
app.listen(port, () => {
    // console.log('Serwer działa na : http://localhost:3000/');
});


app.use(express.static(
    path.join(__dirname, 'public'),
));

gameRoutes(app)