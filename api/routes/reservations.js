import express from "express";
import { getAllProcedures } from "../models/procedure.js";
import { createReservation, deleteReservation } from "../models/reservation.js";
import { getAvailableSlots } from "../models/workday.js";

const router = express.Router();

router.get("/procedures", async (req, res) => {
  try {
    const allProcedures = await getAllProcedures();
    return res.status(201).json(allProcedures);
  } catch (error) {
    throw error;
  }
});

router.post("/create-reservation", (req, res) => {
  const { workdayId, procedureId, startTime } = req.body;
  try {
    createReservation(workdayId, procedureId, startTime);
  } catch (error) {
    throw error;
  }
});

// router.delete("/delete-reservation:", (req, res) => {
//   try {
//     deleteReservation();
//   } catch (error) {
//     throw error;
//   }
// });

// router.get("/workday", (req, res) => {});

router.get("/workday-slots/:procedureId", async (req, res) => {
  const workdayDate = new Date(+req.query.workdayDate); //chose one approach, date vs id
  //   console.log(workdayDate);
  const procedureId = req.params.procedureId;
  try {
    const availableTimeSlots = await getAvailableSlots(workdayDate, procedureId);
    return res.status(200).json(availableTimeSlots);
  } catch (error) {
    throw error;
  }
}); // ?

export { router as reservationRouter };
