// import passport from "passport";
// import passportLocalMongoose from "passport-local-mongoose";
// const UserSchema = new mongoose.Schema({
//   username: String,
//   password: String,
// });

// // create mongoDB model + configure passport's local strategy for authentication
// UserSchema.plugin(passportLocalMongoose);
// const User = mongoose.model("User", UserSchema);
// passport.use(User.createStrategy()); // creates local login strategy
// passport.serializeUser(User.serializeUser()); // creates session cookie
// passport.deserializeUser(User.deserializeUser()); // cracks session cookie to obtain info

// module.exports = User;

// get all reservations of this user
// get user info
