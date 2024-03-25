import mongoose from "mongoose";
import { ReservationSchema } from "./reservation.js";

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

const Workday = mongoose.model("Workday", WorkdaySchema);

async function createWorkday(date, startTime, endTime) {
  const newWorkday = new Workday({
    date,
    startTime,
    endTime,
  });

  try {
    await newWorkday.save();
    console.log(newWorkday);
  } catch (err) {
    throw err;
  }
}

// delete-workday

// get-workday-info (returns startTime and endTime)

// id vs date ?
async function getAvailableSlots(workdayId, procedure) {
  // get workday
  // get procedure.slotsTakes
  // loop through slots and find all available
  // const availableTimeSlots = workday.availableSlots.map((timeRepr, idx) => {
  //    for (let i = 0; i < procedure.slotsTakes; ++i) {
  //          if (!timeRepr) return;
  //      }
  //      return new Date(workday.startTime + idx * 15 min);
  //   })
  // return availableTimeSlot
}

// module.exports = Workday;
export { Workday, createWorkday };
