
const { getChequeModel } = require("../models/ChequeRegisterModel");

const registerCheque = async (req, res) => {
  const { city, branch, state } = req.body;

  if (!city || !branch || !state || !req.body.chequeNumber) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const Cheque = getChequeModel(city, branch, state);
    const newCheque = new Cheque(req.body);
    await newCheque.save();
    res.status(201).json({ message: "Cheque saved", cheque: newCheque });
  } catch (err) {
    res.status(400).json({ message: "Error saving cheque", error: err.message });
  }
};

const getChequesByBranch = async (req, res) => {
  const { city, branch, state } = req.params;

  try {
    const Cheque = getChequeModel(city, branch, state);
    const cheques = await Cheque.find();
    res.status(200).json(cheques);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cheques", error: err.message });
  }
};

const editcheque = async (req, res) => {
  try {
    const { chequeNumber, city, branch, state } = req.params;
    const updateData = req.body;

    const cheque = getChequeModel(city, branch, state);
    const updatedMember = await cheque.findOneAndUpdate(
      { chequeNumber }, // Query using custom field
      updateData,
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: "checque not found" });
    }

    res.json(updatedMember);
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({ message: "Error updating member", error: error.message });
  }
};


module.exports = { registerCheque, getChequesByBranch,editcheque };
