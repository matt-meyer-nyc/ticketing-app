import mongoose from 'mongoose';

// an interface that describes the properties that are required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// interface that describes the properties that a User Model has
// tells TS that there is going to be a build function avialable for model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  // note this is all tied to Mongoose (i.e. NOT related to TS)
  email: {
    // with mongoose type is capitalized b/c referring to an actual constructor method
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// this allows adding .build custom function to User model w/ TS check included (as way to optimize instead of using buildUser function referenced below and having to export it)
// add build function to schema using statics
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};
// .........................angle bracket syntax is the generic syntax inside of TS
// .........................essentially, functions or types
// .........................here are like arguments to function of Model
// .........................us a type being provided to a function as an argument
// .........................if hold command and click model can see details
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// so can implement TS checking via UserAttrs function
// THIS FUNCTION WILL BE USED SO NOT DIRECTLY CREATING USER WITH 'new User()' document
// const buildUser = (attrs: UserAttrs) => {
//   return new User(attrs);
// };

export { User };
