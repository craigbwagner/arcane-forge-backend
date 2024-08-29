import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  characters: [
  {
    type: Schema.Types.ObjectId,
    ref: 'Character',
  } ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.password;
  },
});

const User = model('User', userSchema);

export { User };
