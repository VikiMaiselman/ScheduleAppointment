import express from "express";
import { getAllProcedures, createNewProcedure, editProcedure, deleteProcedure } from "../models/procedure.js";
import { createWorkday } from "../models/workday.js";

const router = express.Router();

router.get("/procedures", (req, res) => {
  try {
    const allProcedures = getAllProcedures();
  } catch (error) {
    throw error;
  }
});

router.post("/procedure", (req, res) => {
  const { name, price, slotsTakes } = req.body;
  try {
    createNewProcedure(name, price, slotsTakes);
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
