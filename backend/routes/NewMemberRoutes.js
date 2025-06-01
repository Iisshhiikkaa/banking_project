const express = require("express");
const { registerNewMember, transferMember,getMemberByBranch,editMember } = require("../controllers/NewMemberController");
const router = express.Router();





router.post("/registerNewMember", registerNewMember);
router.get("/:state/:city/:branch", getMemberByBranch);
// router.get()
// PUT /api/newmember/:memberID
router.put('/:state/:city/:branch/:memberID',editMember);

router.post('/transferMember/:state/:city/:branch',transferMember)

module.exports = router;
