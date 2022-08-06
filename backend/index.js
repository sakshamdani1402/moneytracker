
const connnectToMongo = require('./db');
const cors = require('cors');
const express = require('express')

const app = express();
connnectToMongo();
const port = 5000

app.use(express.json());
app.use(cors());
//Available routes
app.use('/auth',require('./routes/auth'));
app.use('/transactions',require('./routes/transactions'));
app.use('/saved', require('./routes/saved'));
app.listen(port, () => {
    console.log(`iNotebook  backend listening at http://localhost:${port}`)
})