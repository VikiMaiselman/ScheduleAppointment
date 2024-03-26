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

router.get("/workday-slots/:procedureId", (req, res) => {
  const { workdayDate, workdayId } = req.query; //chose one approach, date vs id
  const procedureId = req.params.procedureId;
  try {
    const availableTimeSlots = getAvailableSlots(workdayId, workdayDate, procedureId);
  } catch (error) {
    throw error;
  }
}); // ?

export { router as reservationRouter };
