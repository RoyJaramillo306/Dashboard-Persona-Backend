const express = require('express');
const cors = require('cors');

require('dotenv').config({ path: 'variables.env' });

const app = express();

require('./config/sincronizacion');
require('./config/asociaciones');

app.use(cors());

app.use(express.json({ extended: true }));

const PORT = process.env.PORT || 5000;

app.use('/api/auth', require('./routes/authRouter'));
app.use('/api/usuarios', require('./routes/usuarioRouter'));
app.use('/api/personas', require('./routes/personaRouter'));
app.use('/api/casos', require('./routes/casoRouter'));
app.use('/api/contactos', require('./routes/contactoRouter'));

app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
    console.log('DB conectada');
})