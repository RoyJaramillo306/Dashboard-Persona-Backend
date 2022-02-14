const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Persona = require('./persona');

class Usuario extends Model {}

Usuario.init({
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1, // 0: inactivo, 1: activo, 2: suspendido etc..
        allowNull: true
    },
    perfil: { // 1: 'Super Admin' | 2: 'Administrador' | 3: 'Abogado' | 4: 'Recepcionista' | 5: 'Asistente'
        type: DataTypes.INTEGER,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        references: {
            model: Persona,
            key: "email"
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    sequelize,
    modelName: "usuarios"
});

module.exports = Usuario;

