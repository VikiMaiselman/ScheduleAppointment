import { Reservation } from "../util/database";

async function createReservation(workdayId, procedure, startTime) {
  // find the workday

  // get all available slots for this procedure

  // create new reservation
  const newReservation = new Reservation({
    user: req.user,
    procedure: procedure,
    startTime: startTime,
  });

  // insert to the workday reservations

  // update the workday available slots
}

// delete reservation

//
