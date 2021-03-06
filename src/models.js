import { Sequelize, Model, DataTypes } from 'sequelize';
import SQLite from 'sqlite3'

export default async function models(sequelize, sync) {
  const Cliente = sequelize.define('Cliente', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    codigo: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    },
    created_at: {
      allowNull: false,
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      allowNull: false,
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
  }, {
    tableName: 'clientes',
    createdAt: false,
    updatedAt: false,
  })
  
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    codigo: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    },
    created_at: {
      allowNull: false,
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      allowNull: false,
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
  }, {
    tableName: 'usuarios',
    createdAt: false,
    updatedAt: false,
  })
  
  const Pedido = sequelize.define('Pedido', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tipo: {
      type: Sequelize.ENUM('factura', 'remision'),
      allowNull: false,
      unique: false,
    },
    codigo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    estatus: {
      type: Sequelize.ENUM("nuevo", "surtido", "enviado"),
      defaultValue: "nuevo",
      allowNull: false,
      unique: false,
    },
    created_at: {
      allowNull: false,
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      allowNull: false,
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
  }, {
    tableName: 'pedidos',
    createdAt: false,
    updatedAt: false,
    indexes: [
      {unique: true, fields: ['id_cliente', 'codigo']}
    ]
  })
  
  const LineaPedido = sequelize.define('LineaPedido', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cantidad_solicitada: {
      type: Sequelize.SMALLINT,
      allowNull: false,
      unique: false,
    },
    cantidad_surtida: {
      type: Sequelize.SMALLINT,
      allowNull: false,
      defaultValue: 0,
      unique: false,
    },
    created_at: {
      allowNull: false,
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      allowNull: false,
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
  }, {
    tableName: 'linea_pedidos',
    createdAt: false,
    updatedAt: false,
  })
  
  const Producto = sequelize.define('Producto', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    codigo: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    },
    codigo_laboratorio: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    },
    nombre_laboratorio: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    },
    precio_medico: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      unique: false,
    },
    precio_publico: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      unique: false,
    },
    ieps: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      unique: false,
    },
    iva: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      unique: false,
    },
    created_at: {
      allowNull: false,
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      allowNull: false,
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
  }, {
    tableName: 'productos',
    createdAt: false,
    updatedAt: false,
  })
  
  const Proveedor = sequelize.define('Proveedor', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    telefonos: {
      type: Sequelize.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('telefonos').split(',')
      },
      set(val) {
        this.setDataValue('telefonos', val.join(','))
      }
    },
    created_at: {
      allowNull: false,
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      allowNull: false,
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
  }, {
    tableName: 'proveedores',
    createdAt: false,
    updatedAt: false,
  })
  
  Cliente.belongsTo(Usuario, {
    foreignKey: {
      name: 'id_usuario',
    },
  })
  Usuario.hasMany(Cliente, {as: 'clientes', foreignKey: 'id_usuario'})
  
  Pedido.belongsTo(Cliente, {
    foreignKey: {
      name: 'id_cliente',
      allowNull: false
    },
  })
  Cliente.hasMany(Pedido, {as: 'pedidos', foreignKey: 'id_cliente'})
  
  
  LineaPedido.belongsTo(Pedido, {
    foreignKey: {
      name: 'id_pedido',
      allowNull: false
    }
  })
  Pedido.hasMany(LineaPedido, {as: 'lineas', foreignKey: 'id_pedido'})
  
  LineaPedido.belongsTo(Producto, {
    foreignKey: {
      name: 'id_producto',
      allowNull: false
    },
  })

  if (sync) {
    await sequelize.sync({alter: true})
  }

  return {
    Cliente,
    Usuario,
    Pedido,
    LineaPedido,
    Producto
  }
}
