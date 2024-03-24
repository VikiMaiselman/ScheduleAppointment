import { Workday } from "../util/database.js";

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
