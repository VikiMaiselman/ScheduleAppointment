import express from "express";
import { createNewProcedure, editProcedure, deleteProcedure } from "../models/procedure.js";
import { createWorkday } from "../models/workday.js";

const router = express.Router();

router.post("/procedure", (req, res) => {
  try {
    createNewProcedure();
  } catch (error) {
    throw error;
  }
});

router.patch("/procedure", (req, res) => {
  try {
    editProcedure();
  } catch (error) {
    throw error;
  }
});

router.delete("/procedure/:id", (req, res) => {
  try {
    deleteProcedure();
  } catch (error) {
    throw error;
  }
});

router.get("/workday", (req, res) => {});

router.post("/workday", (req, res) => {
  try {
    createWorkday();
  } catch (error) {
    throw error;
  }
});

// router.patch("/workday/:workdayId", (req, res) => {});

// router.delete("/workday/:workdayId", (req, res) => {});
