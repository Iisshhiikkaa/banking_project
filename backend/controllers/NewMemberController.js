
const { getNewMemberModel } = require("../models/NewMemberModel");

const registerNewMember = async (req, res) => {
  const { city, branch, state } = req.body;

  if (!city || !branch || !state ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const Member = getNewMemberModel(city, branch, state);
    const newMember = new Member(req.body);
    await newMember.save();
    res.status(201).json({ message: "Cheque saved", cheque: newMember });
  } catch (err) {
    res.status(400).json({ message: "Error saving cheque", error: err.message });
  }
};

const getMemberByBranch = async (req, res) => {
  const { city, branch, state } = req.params;

  try { 
    const Member = getNewMemberModel(city, branch, state);
    const Members = await Member.find();
    res.status(200).json(Members);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cheques", error: err.message });
  }
};


const editMember = async (req, res) => {
  try {
    const { memberID, city, branch, state } = req.params;
    const updateData = req.body;

    const Member = getNewMemberModel(city, branch, state);
    const updatedMember = await Member.findOneAndUpdate(
      { memberID }, // Query using custom field
      updateData,
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json(updatedMember);
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({ message: "Error updating member", error: error.message });
  }
};


const transferMember=async (req, res) => {
  const { city, branch, state } = req.params;

  if (!city || !branch || !state ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const Member = getNewMemberModel(city, branch, state);
    const newMember = new Member(req.body);
    await newMember.save();
    res.status(201).json({ message: "Cheque saved", cheque: newMember });
  } catch (err) {
    res.status(400).json({ message: "Error saving cheque", error: err.message });
  }
};

module.exports = { registerNewMember, getMemberByBranch ,transferMember,editMember};
