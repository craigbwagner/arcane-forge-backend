import { Schema, Types, model } from "mongoose";

const monsterSchema = new Schema({
  name: String,
  size: String,
  type: String,
  alignment: String,
  armorClass: Number,
  speed: [String],
  strength: Number,
  dexterity: Number,
  constitution: Number,
  intelligence: Number,
  wisdom: Number,
  charisma: Number,
  maxHP: Number,
  currentHP: Number,
  tempHP: Number,
  senses: [String],
  abilities: [String],
  actions: [String],
  bonusActions: [String]
}, {timestamps: true});

const Monster = model('Monster', monsterSchema);

export { Monster };
