import { Sequelize, Model, DataTypes } from 'sequelize';
import SQLite from 'sqlite3';

const sequelize = new Sequelize('gugovet', 'app', 'password', {
  dialect: 'sqlite',
  storage: './gugovet.sqlite',
  dialectOptions: {
    mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
  }
});

import models from './models.js'
const { Producto, Usuario, Cliente, Pedido, LineaPedido } = await models(sequelize, true)

import express from 'express'
import cors from 'cors'
import { crud } from 'express-crud-router'
import sequelizeCrud from 'express-crud-router-sequelize-v6-connector'

const port = 4000
const app = express()

app.use(cors())
app.use(crud('/clientes', sequelizeCrud.default(Cliente)))
app.use(crud('/usuarios', sequelizeCrud.default(Usuario)))
app.use(crud('/productos', sequelizeCrud.default(Producto)))
app.use(crud('/pedidos', sequelizeCrud.default(Pedido)))
app.use(crud('/lineapedidos', sequelizeCrud.default(LineaPedido)))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
