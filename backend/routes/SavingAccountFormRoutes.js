const express = require("express");
const router = express.Router();
const {registerSavingAccount, getSavingAccountByBranch,editSavingAccount}=require("../controllers/SavingAccountFormController");

router.post("/registerSavingAccount", registerSavingAccount);
router.get("/:state/:city/:branch", getSavingAccountByBranch); // ✅ New update route
router.put("/:state/:city/:branch/:accountNumber",editSavingAccount);

module.exports = router;