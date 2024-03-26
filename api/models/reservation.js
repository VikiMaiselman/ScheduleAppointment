import mongoose, { Schema } from "mongoose";
import { Workday } from "./workday.js";
import { Procedure } from "./procedure.js";

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
    procedureId: procedureId,
    workdayId: workdayId,
    startTime: startTime,
  });

  // insert to the workday reservations
  try {
    workday = await Workday.findByIdAndUpdate(workdayId, { $push: { reservations: newReservation } }, { new: true }); // push the reservation to the reservations []
    // update the workday available slots

    const procedure = await Procedure.findById(procedureId);
    const workdayStartTime = workday.startTime.getTime();
    const reservationStartTime = startTime.getTime();
    const slotsNumber = Math.floor(
      (reservationStartTime.getTime() - workdayStartTime.getTime()) / (1000 * 60 * +process.env.TIME_SLOT_IN_MINUTES)
    );

    for (let i = 0; i < procedure.takesSlots; ++i) {
      workday.availableSlots[slotsNumber] = 0;
    }
    await workday.save();
    // those 2 ops should be in one session!
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
