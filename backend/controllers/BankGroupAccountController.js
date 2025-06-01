const { getNewMemberModel } = require("../models/BankGroupAccountModel");
const registerGroupAccount = async (req, res) => {
  const { city, branch, state } = req.body;

  if (!city || !branch || !state ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const GroupAccount = getNewMemberModel(city, branch, state);
    const newGroupAccount = new GroupAccount(req.body);
    await newGroupAccount.save();
    res.status(201).json({ message: "Cheque saved", cheque: newGroupAccount });
  } catch (err) {
    res.status(400).json({ message: "Error saving cheque", error: err.message });
  }
};

const getGroupByBranch = async (req, res) => {
  const { city, branch, state } = req.params;

  try { 
    const GroupAccount = getNewMemberModel(city, branch, state);
    const GroupAccounts = await GroupAccount.find();
    res.status(200).json(GroupAccounts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cheques", error: err.message });
  }
};


module.exports = { registerGroupAccount, getGroupByBranch };
