import mongoose from "mongoose";

export interface Class {
  name: string,
  subclass: string,
  level: number,
}

export interface Character {
  name?: string
  race?: string,
  classes?: Class[],
  level?: number,
  sex?: string,
  size?: string,
  age?: number,
  height?: string,
  weight?: number,
  alignment?: string,
  languages?: string[],
  initiative?: number,
  initiativeMods?: number,
  speed?: number,
  maxHP?: number,
  currentHP?: number,
  tempHP?: number,
  hitDiceRemaining?: number,
  hitDiceType?: string,
  hitDiceTotal?: number,
  strength?: number,
  dexterity?: number,
  constitution?: number,
  intelligence?: number,
  wisdom?: number,
  charisma?: number,
  savingThrowProficiencies?: string[],
  skillProficiencies?: string[],
  skillExpertise?: string[]
}

interface User {
  username: string,
  password: string,
  characters: Character[]
}

const characterSchema = new mongoose.Schema<Character>({
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
}, {timestamps: true});

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  characters: [characterSchema],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.password;
  },
});

module.exports = mongoose.model<User>('User', userSchema);
