import express from "express";
import { getAllProcedures, createNewProcedure, editProcedure, deleteProcedure } from "../models/procedure.js";
import { createWorkday } from "../models/workday.js";

const router = express.Router();

router.get("/procedures", (req, res) => {
  try {
    const allProcedures = getAllProcedures();
    return res.status(200).json(allProcedures);
  } catch (error) {
    throw error;
  }
});

router.post("/procedures", (req, res) => {
  console.log(req.body);
  const { name, price, slotsTakes } = req.body;
  try {
    createNewProcedure(name, price, slotsTakes);
    return res.status(200).json("Successfully created new procedure!");
  } catch (error) {
    throw error;
  }
});

router.patch("/procedure/:procedureId", (req, res) => {
  const procedureId = req.params.procedureId;
  const editedProcedure = req.body;
  try {
    editProcedure(procedureId, editedProcedure);
  } catch (error) {
    throw error;
  }
});

router.delete("/procedure/:procedureId", (req, res) => {
  const procedureId = req.params.procedureId;
  try {
    deleteProcedure(procedureId);
  } catch (error) {
    throw error;
  }
});

// router.get("/workday", (req, res) => {});

router.post("/workday", (req, res) => {
  try {
    createWorkday();
  } catch (error) {
    throw error;
  }
});

// router.patch("/workday/:workdayId", (req, res) => {});

// router.delete("/workday/:workdayId", (req, res) => {});

export { router as adminRouter };
