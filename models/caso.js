const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

class Caso extends Model {}

Caso.init({
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,

    },
    monto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        defaultValue: 'Sin descripción',
        allowNull: false
    },
    estado: { // 0: 'En Registro' | 1: 'En Curso' | 2: 'Finalizado'
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: "casos"
});

module.exports = Caso;

