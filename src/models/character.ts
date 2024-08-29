import { Schema, Types, model } from "mongoose";

interface Class {
  name: string,
  subclass: string,
  level: number,
}

export interface Character {
  creator: Types.ObjectId
  name?: string
  race?: string
  classes?: Class[]
  level?: number
  sex?: string
  size?: string
  age?: number
  height?: string
  weight?: number
  alignment?: string
  languages?: string[]
  initiative?: number
  initiativeMods?: number
  speed?: number
  maxHP?: number
  currentHP?: number
  tempHP?: number
  hitDiceRemaining?: number
  hitDiceType?: string
  hitDiceTotal?: number
  strength?: number
  dexterity?: number
  constitution?: number
  intelligence?: number
  wisdom?: number
  charisma?: number
  savingThrowProficiencies?: string[]
  skillProficiencies?: string[]
  skillExpertise?: string[]
  abilities?: Types.ObjectId[]
  items?: Types.ObjectId[]
}

const characterSchema = new Schema({
  creator: String,
  name: String,
  race: String,
  classes: [{name: String, subclass: String, level: Number}],
  level: {
    type: Number,
    max: 20,
  },
  sex: String,
  size: String,
  age: Number,
  height: String,
  weight: Number,
  alignment: String,
  languages: [String],
  initiative: Number,
  initiativeMods: Number,
  speed: Number,
  maxHP: Number,
  currentHP: Number,
  tempHP: Number,
  hitDiceRemaining: Number,
  hitDiceType: String,
  hitDiceTotal: Number,
  strength: Number,
  dexterity: Number,
  constitution: Number,
  intelligence: Number,
  wisdom: Number,
  charisma: Number,
  savingThrowProficiencies: [String],
  skillProficiencies: [String],
  skillExpertise: [String],
  abilities: [{type: Schema.Types.ObjectId, ref: 'Ability'}],
  items: [{type: Schema.Types.ObjectId, ref: 'Item'}],
}, {timestamps: true});

const Character = model<Character>('Character', characterSchema);

export { Character };
