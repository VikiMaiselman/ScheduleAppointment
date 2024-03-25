import mongoose from "mongoose";

const ProcedureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  slotsTakes: {
    type: Number,
    required: true,
  },
});

const Procedure = mongoose.model("Procedure", ProcedureSchema);

// functionality for admin

// create procedure
async function createNewProcedure(name, price, slotsTakes) {
  const newProcedure = new Procedure({
    name,
    price,
    slotsTakes,
  });

  try {
    await newProcedure.save();
  } catch (error) {
    throw error;
  }
}
// edit procedure
async function editProcedure(procedureId, editedProcedure) {
  try {
    await Procedure.findByIdAndUpdate(procedureId, {
      ...editProcedure,
    }); // not sure this is the right way of updating
  } catch (error) {
    throw error;
  }
}
// delete procedure
async function deleteProcedure(procedureId) {
  try {
    await Procedure.findByIdAndDelete(procedureId); // not sure this is the right way of updating
  } catch (error) {
    throw error;
  }
}

// for everybody
async function getAllProcedures() {
  try {
    return await Procedure.find();
  } catch (error) {
    throw new Error("Could not get procedures info.");
  }
}
// get available procedures (for admin with the ability to edit/delete)

export { Procedure, getAllProcedures, createNewProcedure, editProcedure, deleteProcedure };
// module.exports = Procedure;
// module.exports = getAllProcedures;
// module.exports = createNewProcedure;
// module.exports = editProcedure;
// module.exports = deleteProcedure;
