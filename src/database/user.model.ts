import { compare, hash } from 'bcrypt';
import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';
import { from, Observable } from 'rxjs';
import { RoleType } from '../shared/enum/role-type.enum';
interface User extends Document {
  comparePassword(password: string): Observable<boolean>;
  readonly username: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone?: string;
  readonly company?: string;
  readonly email: string;
  readonly password: string;
  readonly roles?: RoleType[];
}

type UserModel = Model<User>;

const UserSchema = new Schema<User>(
  {
    username: SchemaTypes.String,
    firstName: SchemaTypes.String,
    lastName: SchemaTypes.String,

    phone: { type: SchemaTypes.String, required: false },
    company: { type: SchemaTypes.String, required: false },
    email: SchemaTypes.String,
    password: SchemaTypes.String,
    roles: [
      { type: SchemaTypes.String, enum: ['ADMIN', 'USER'], required: false },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// see: https://wanago.io/2020/05/25/api-nestjs-authenticating-users-bcrypt-passport-jwt-cookies/
// and https://stackoverflow.com/questions/48023018/nodejs-bcrypt-async-mongoose-login
async function preSaveHook(next) {
  // Only run this function if password was modified
  if (!this.isModified('password')) return next();

  // Hash the password
  const password = await hash(this.password, 12);
  this.set('password', password);

  next();
}

UserSchema.pre<User>('save', preSaveHook);

function comparePasswordMethod(password: string): Observable<boolean> {
  return from(compare(password, this.password));
}

UserSchema.methods.comparePassword = comparePasswordMethod;

UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'createdBy',
});

const createUserModel: (conn: Connection) => UserModel = (conn: Connection) =>
  conn.model<User>('User', UserSchema, 'users');

export {
  User,
  UserModel,
  createUserModel,
  UserSchema,
  preSaveHook,
  // nameGetHook,
  comparePasswordMethod,
};
