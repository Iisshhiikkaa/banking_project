const express = require("express");
const { registerCheque, getChequesByBranch,editcheque } = require("../controllers/ChequeRegisterController");
const router = express.Router();



router.post("/chequeregister", registerCheque);
router.get("/:state/:city/:branch", getChequesByBranch);

router.put('/:state/:city/:branch/:chequeNumber',editcheque);

module.exports = router;
