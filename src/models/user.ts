import mongoose from "mongoose";

interface User {
  username: string,
  password: string,
  characters: string[],
}

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
  characters: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character',
  } ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.password;
  },
});

const User = mongoose.model<User>('User', userSchema);

export { User };
