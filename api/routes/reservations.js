import express from "express";
import { getAllProcedures } from "../models/procedure.js";
import { createReservation, deleteReservation } from "../models/reservation.js";

const router = express.Router();

router.get("/procedures", (req, res) => {
  try {
    getAllProcedures();
  } catch (error) {
    throw error;
  }
});

router.post("/create-reservation", (req, res) => {
  try {
    createReservation();
  } catch (error) {
    throw error;
  }
});

router.delete("/delete-reservation:", (req, res) => {
  try {
    deleteReservation();
  } catch (error) {
    throw error;
  }
});

router.get("/workday", (req, res) => {});

router.get("/workday-slots", (req, res) => {}); // ?
