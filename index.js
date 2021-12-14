const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const comandaRoutes = require('./routes/comanda');
const estoqueRoutes = require('./routes/estoque');
const produtoRoutes = require('./routes/produto');
const faturamento = require('./routes/faturamento');
const app = express();

app.use(cors());
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(comandaRoutes);
app.use(estoqueRoutes);
app.use(produtoRoutes);
app.use(faturamento);

app.listen(3000);