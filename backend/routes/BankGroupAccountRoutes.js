const express = require("express");
const { registerGroupAccount,getGroupByBranch } = require("../controllers/BankGroupAccountController");
const router = express.Router();



router.post('/GroupAccountRegister',registerGroupAccount)
router.get("/:state/:city/:branch", getGroupByBranch);

// router.post("/registerGroup", registerGroup);
// router.get("/:state/:city/:branch", getMemberByBranch);
// router.get()
// // PUT /api/newmember/:memberID
// router.put('/:state/:city/:branch/:memberID',editMember);

// router.post('/transferMember/:state/:city/:branch',transferMember)

module.exports = router;
