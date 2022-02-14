const Caso = require("../models/caso");
const Persona = require("../models/persona");
const Contacto = require("../models/contacto");

Persona.hasMany(Caso, { as: "cliente", foreignKey: "cliente_id" });
Caso.belongsTo(Persona, { as: "cliente", foreignKey: "cliente_id" });

Persona.hasMany(Caso, { as: "abogado", foreignKey: "encargado_id" });
Caso.belongsTo(Persona, { as: "abogado", foreignKey: "encargado_id" });

Persona.hasMany(Contacto, { as: "persona", foreignKey: "persona_id", onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Contacto.belongsTo(Persona, { as: "persona", foreignKey: "persona_id", onDelete: 'CASCADE', onUpdate: 'CASCADE' });