import mongoose from "mongoose";
import { ReservationSchema } from "./reservation.js";
import { Procedure } from "./procedure.js";

const WorkdaySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  totalWorkingHours: {
    type: Number,
    // default: 8,
    required: true,
  },
  availableSlots: {
    type: [Number],
    required: true,
    default: function () {
      Array.from({ length: +process.env.TIME_SLOT_IN_MINUTES * this.totalWorkingHours }, () => 1);
    }, // Default value with all ones
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
  const totalHours = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60));

  const newWorkday = new Workday({
    date,
    startTime,
    endTime,
    totalWorkingHours: totalHours,
  });

  try {
    await newWorkday.save();
    console.log(newWorkday);
  } catch (error) {
    throw error;
  }
}

// delete-workday

// get-workday-info (returns startTime and endTime)

// id vs date ?
async function getAvailableSlots(workdayId, workdayDate, procedureId) {
  // get workday (by id vs by date as is unique)
  let workday, procedureSlots;
  try {
    workday = Workday.findById(workdayId);
    // workday = Workday.findOne({ date: workdayDate });
  } catch (error) {
    throw error;
  }

  try {
    // get procedure.slotsTakes
    procedureSlots = Procedure.findById(procedureId, "slotsTakes");
  } catch (error) {
    throw error;
  }

  // loop through slots and find all available
  const availableTimeSlots = workday.availableSlots.map((timeRepr, idx, slots) => {
    for (let i = 0; i < procedureSlots && idx + i < slots.length; ++i) {
      if (!slots[i + idx]) return;
    }
    return new Date(workday.startTime + idx * +process.env.TIME_SLOT_IN_MINUTES * +process.env.MILLISECONDS_IN_MINUTE);
  });
  return availableTimeSlots;
}

// module.exports = Workday;
export { Workday, createWorkday, getAvailableSlots };
