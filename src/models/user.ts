import { Schema, model, Types } from "mongoose";

interface User {
  username: string,
  password: string,
  _id: Types.ObjectId,
  characters: Types.ObjectId[],
}

const userSchema = new Schema<User>({
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

const User = model<User>('User', userSchema);

export { User };
