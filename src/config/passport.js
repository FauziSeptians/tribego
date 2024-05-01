// import passport from "passport";
// import { Strategy } from "passport-local";
// import { UserModel } from "../model/users-model.js";
// import { ResponseError } from "../error/errors.js";

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const findUser = await User.findById(id);
//     if (!findUser) throw new Error("User Not Found");
//     done(null, findUser);
//   } catch (err) {
//     done(err, null);
//   }
// });

// export default passport.use(
//   // {
//   //   usernameField: "email",
//   //   passwordField: "password",
//   // },
//   new Strategy(async (username, password, done) => {
//     console.log(email, password);
//     // try {
//     const findUser = await UserModel.findOne({ name: username });
//     if (!findUser) throw new ResponseError(404, "User not found");
//     //   done(null, findUser);
//     // } catch (err) {
//     //   done(err, null);
//     // }
//   })
// );
