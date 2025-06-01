
const { getSavingAccountModel } = require("../models/SavingAccountFormModel");

const registerSavingAccount=async(req,res)=>{
    const {city,branch,state}=req.body;
    if (!city || !branch ||!state){
        return res.status(400).json({message:"Missing required fields"});
    }
    try{
        const SavingAccount=getSavingAccountModel(city,branch,state);
        const newSavingAccount=new SavingAccount(req.body);
        await newSavingAccount.save();
        res.status(201).json({message:"Saving Account saved",SavingAccount:newSavingAccount});
    }
    catch(err){
        res.status(400).json({message:"Error saving Saving Account",error:err.message});
    }
};

const getSavingAccountByBranch=async(req,res)=>{
    const {city,branch,state}=req.params;
    try{
        const SavingAccount=getSavingAccountModel(city,branch,state);
        const SavingAccounts=await SavingAccount.find();
        res.status(200).json(SavingAccounts);
    }
    catch(err){
        res.status(500).json({message:"Error fetching Saving Account",error:err.message});
    }
};

const editSavingAccount = async (req, res) => {
  try {
    const { accountNumber, city, branch, state } = req.params;
    const updateData = req.body;

    const cheque = getSavingAccountModel(city, branch, state);
    const updatedMember = await cheque.findOneAndUpdate(
      { AccountNumber :accountNumber}, // Query using custom field
      updateData,
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json(updatedMember);
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({ message: "Error updating member", error: error.message });
  }
};

module.exports={
    registerSavingAccount,
    getSavingAccountByBranch,editSavingAccount
};