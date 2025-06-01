const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  // Personal Information
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
  dob: { type: Date },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  maritalStatus: { type: String, enum: ["Single", "Married", "Divorced"] },
  nationality: { type: String },
  profilePicture: { type: String },
  member_city:{type: String},
  member_state:{type: String},

  // Contact Information
  email: { type: String, unique: true },
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },

  // Identification
  aadhaar: { type: String },
  passport: { type: String },
  drivingLicense: { type: String },
  pan: { type: String },
  aadhaarFile: { type: String },
  drivingLicenseFile: { type: String },

  // Group Information
  groupId: { type: String },
  groupName: { type: String },
  groupFee: { type: String },
  groupAddress: { type: String },
  referencePerson: { type: String },

  // Financial Information
  occupation: { type: String },
  employer: { type: String },
  income: { type: String },
  incomeSource: { type: String },
  taxId: { type: String },

  // Emergency Contact
  contactName: { type: String },
  relationship: { type: String },
  
  email_another: { type: String },
  phone_another:{type:String},

  // Additional Information
  nomineeName: { type: String },
  nomineeRelationship: { type: String },
  contactInfo: { type: String },
  specialNeeds: { type: String },
  notes: { type: String },
  referralSource: { type: String },

  // Membership
  status: { type: String, default: "active" },
  membershipTier: { type: String },
  memberID: { type: String },
  date: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

// module.exports = mongoose.model("NewMember", customerSchema);
function getNewMemberModel(city, branch, state) {
  const tableName = `NewMember_${state}_${city}_${branch}`.toLowerCase().replace(/\s+/g, "_");

  if (mongoose.models[tableName]) {
    return mongoose.models[tableName];
  }

  return mongoose.model(tableName,customerSchema , tableName);
}



module.exports = { getNewMemberModel };


