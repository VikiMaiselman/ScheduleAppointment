import mongoose from "mongoose";
import { Workday } from "./workday";

const ReservationSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  workdayId: {
    type: Schema.Types.ObjectId,
    ref: "Workday",
  },
  procedureId: {
    type: Schema.Types.ObjectId,
    ref: "Procedure",
  },
  startTime: {
    type: Date,
  },
});

const Reservation = mongoose.model("Reservation", ReservationSchema);

async function createReservation(workdayId, procedureId, startTime) {
  // find the workday
  let workday;

  // create new reservation
  const newReservation = new Reservation({
    user: req.user,
    procedure: procedureId,
    workdayId: workdayId,
    startTime: startTime,
  });

  // insert to the workday reservations
  try {
    workday = await Workday.findOneAndUpdate({ _id: workdayId }); // push the reservation to the reservations []
    // update the workday available slots
  } catch (error) {
    throw error;
  }
}

// delete reservation
async function deleteReservation(reservationId) {
  let workdayId, workday;
  try {
    workdayId = await Reservation.findById(reservationId).workday._id;
  } catch (error) {
    throw error;
  }

  try {
    workday = await Workday.findOneAndUpdate({ _id: workdayId }); // remove the reservation to the reservations []
    // update the workday available slots
  } catch (error) {
    throw error;
  }
}
// module.exports = ReservationSchema;
// module.exports = Reservation;
export { ReservationSchema, Reservation, createReservation, deleteReservation };
