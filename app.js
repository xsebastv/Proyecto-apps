require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnectionMongo } = require('./database/MongoConnection');
const routes = require('./routes/index');

const app = express();

// Conexión a la base de datos
dbConnectionMongo();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});