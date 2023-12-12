
import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  fullName: string;
  bio: string;
  profileImage: string;
  friends: string[];
  friendRequestsSent: string[];
  friendRequestsReceived: string[];
  blockedUsers: string[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  bio: { type: String },
  profileImage: { type: String },
  friends: [{ type: String, ref: 'User' }],
  friendRequestsSent: [{ type: String, ref: 'User' }],
  friendRequestsReceived: [{ type: String, ref: 'User' }],
  blockedUsers: [{ type: String, ref: 'User' }],
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
