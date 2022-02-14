const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

class Persona extends Model {}

Persona.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    ciudad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pais: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        defaultValue: 'sin número'
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    foto: {
        type: DataTypes.STRING,
        defaultValue: 'sin foto'
    },
    nota: {
        type: DataTypes.STRING,
        defaultValue: 'Sin nota'
    },
    codigo_postal: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 0 // 0: 'Registrado' | 1: 'Pendiente' | 2: 'Con Contrato' | 3: 'Sin Caso'
    }
}, {
    sequelize,
    modelName: "personas"
});

module.exports = Persona;

