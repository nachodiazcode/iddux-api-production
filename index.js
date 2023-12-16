const app = require('./app.js');
const express = require('express');
const log = require('./utils/logger');
const config = require('./config/index');

const router = express.Router(); // Crear un enrutador

const port = config.puerto || 3000; // Usar config.puerto si está definido, de lo contrario, el puerto 3000

// Iniciar el servidor
router.listen(port, () => {
  log.info(`Escuchando en el puerto ${port}`);
});