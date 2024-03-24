import mongoose from "mongoose";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";

let Workday, Procedure, Reservation, User, db;

/* ************ C O N F I G U R E   D A T A B A S E ************ */
async function initializeDatabase() {
  try {
    db = await mongoose.connect("mongodb://localhost:27017/Appointments");
  } catch (error) {
    console.error("Connection with database could not be established", error);
  }

  const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    // email: String,
    // isAdmin: Boolean,
  });

  const WorkdaySchema = new mongoose.Schema({
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    availableSlots: {
      type: [Number],
      required: true,
      default: Array.from({ length: 48 }, () => 1), // Default value with all ones
      validate: {
        validator: function (value) {
          return value.every((slot) => slot === 0 || slot === 1);
        },
        message: "Available time slots must contain only 0s and 1s.",
      },
    },
    reservations: [ReservationSchema],
  });

  const ProcedureSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    slotsTakes: {
      type: Number,
      required: true,
    },
  });

  const ReservationSchema = new mongoose.Schema({
    user: UserSchema,
    procedure: ProcedureSchema,
    startTime: {
      type: Date,
    },
  });

  /* create mongodb models */
  Workday = mongoose.model("Workday", WorkdaySchema);
  Procedure = mongoose.model("Procedure", ProcedureSchema);
  Reservation = mongoose.model("Reservation", ReservationSchema);

  // create mongoDB user model + configure passport's local strategy for authentication
  UserSchema.plugin(passportLocalMongoose);
  User = mongoose.model("User", UserSchema);
  passport.use(User.createStrategy()); // creates local login strategy
  passport.serializeUser(User.serializeUser()); // creates session cookie
  passport.deserializeUser(User.deserializeUser()); // cracks session cookie to obtain info
}

export { Workday, Procedure, Reservation, User, db, initializeDatabase };
