const mongoose=require('mongoose')
const groupAccountSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  groupType: { type: String, required: true },
  otherGroupType: { type: String, default: "" },

  registrationNumber: { type: String },
  dateOfFormation: { type: Date },
  groupAddress: { type: String },
  purpose: { type: String },

  authorizedSignatories: { type: String },
  groupLeader: { type: String },
  meetingFrequency: { type: String },
  affiliatedInstitution: { type: String },

  savingsPerMember: { type: Number, default: 0 },
  gpbranch: { type: String },
  gpcity: { type: String },
  gpstate: { type: String },

 
  accountType: {
    type: String,
    enum: ["Joint Savings", "Group Current"],
    default: "Joint Savings",
  },

  initialDeposit: { type: Number, default: 0 },
  memberID: { type: String },

  accountID: { type: String, unique: true, required: true },
  dateCreated: { type: Date, default: Date.now },

  members: { type: [String], default: [] },
   branch: { type: String },
  city: { type: String },
  state: { type: String },
 
});

// const GroupAccount = mongoose.model("GroupAccount", groupAccountSchema);

// export default GroupAccount;


function getNewMemberModel(city, branch, state) {
  const tableName = `GroupAccount_${state}_${city}_${branch}`.toLowerCase().replace(/\s+/g, "_");

  if (mongoose.models[tableName]) {
    return mongoose.models[tableName];
  }

  return mongoose.model(tableName,groupAccountSchema , tableName);
}



module.exports = { getNewMemberModel };
