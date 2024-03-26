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
      return Array.from({ length: +process.env.TIME_SLOT_IN_MINUTES * this.totalWorkingHours }, () => 1);
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
async function getAvailableSlots(workdayDate, procedureId) {
  // get workday (by id vs by date as is unique)
  let workday, procedureSlots, allTimeSlots, defaultStart;
  try {
    // workday = Workday.findById(workdayId);
    workday = await Workday.findOne({ date: workdayDate });
    if (!workday) {
      allTimeSlots = Array.from(
        { length: (60 / process.env.TIME_SLOT_IN_MINUTES) * process.env.DEFAULT_HOURS_IN_WORKDAY },
        () => 1
      );
      console.log(workdayDate);
      defaultStart = new Date(workdayDate.setHours(9));
      console.log(defaultStart);
    } else {
      allTimeSlots = workday.availableSlots;
      defaultStart = workday.startTime;
    }
    // console.log(workday.startTime, workday.availableSlots);
  } catch (error) {
    throw error;
  }

  try {
    // get procedure.slotsTakes
    const procedure = await Procedure.findById(procedureId, "slotsTakes -_id");
    procedureSlots = procedure.slotsTakes;
  } catch (error) {
    throw error;
  }

  // loop through slots and find all available
  const availableTimeSlots = allTimeSlots.map((timeRepr, idx, slots) => {
    for (let i = 0; i < procedureSlots; ++i) {
      if (!slots[i + idx]) return null;
    }
    return new Date(
      defaultStart.getTime() + idx * +process.env.TIME_SLOT_IN_MINUTES * +process.env.MILLISECONDS_IN_MINUTE
    );
  });
  //   console.log(availableTimeSlots);
  return availableTimeSlots;
}

// module.exports = Workday;
export { Workday, createWorkday, getAvailableSlots };
