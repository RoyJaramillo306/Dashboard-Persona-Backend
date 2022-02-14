const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

class Contacto extends Model {}

Contacto.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefono: {
        type: DataTypes.STRING,
        defaultValue: 'sin número'
    },
    observacion: {
        type: DataTypes.STRING,
        defaultValue: 'Sin observación'
    }
}, {
    sequelize,
    modelName: "contactos"
});

module.exports = Contacto;

