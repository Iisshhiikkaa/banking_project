const mongoose = require('mongoose');

const savingsAccountSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  maritalStatus: { type: String, enum: ['Single', 'Married'], required: true },
  fatherName: { type: String },
  nationality: { type: String },
  occupation: { type: String },
  mobile: { type: String, required: true },
  email: { type: String },
  permanentAddress: { type: String },
  currentAddress: { type: String },
  accountHolderCity: { type: String },
  accountHolderState: { type: String },

  idProofType: {
    type: String,
    enum: ['Aadhaar', 'Passport', 'Voter ID', 'Driving License'],
    required: true
  },
  idProofNumber: { type: String, required: true },
  panNumber: { type: String },

  accountType: {
    type: String,
    enum: ['Regular', 'Salary', 'Senior Citizen', 'Premium'],
    default: 'Regular',
  },
  initialDeposit: { type: Number, required: true },
  nomineeName: { type: String },
  nomineeRelation: { type: String },
  modeOfOperation: {
    type: String,
    enum: ['Single', 'Joint', 'Either or Survivor'],
    default: 'Single',
  },

  debitCard: { type: Boolean, default: false },
  netBanking: { type: Boolean, default: false },
  smsAlerts: { type: Boolean, default: true },

  status: { type: Number, default: 1 },

  AccountNumber: { type: String, unique: true, required: true },

  State: { type: String, required: true },
  City: { type: String, required: true },
  Branch: { type: String, required: true },

}, {
  timestamps: true
});

// const SavingsAccount = mongoose.model('SavingsAccount', savingsAccountSchema);

// export default SavingsAccount;

function getSavingAccountModel(city, branch, state) {
  const tableName = `SavingsAccount_${state}_${city}_${branch}`.toLowerCase().replace(/\s+/g, "_");

  if (mongoose.models[tableName]) {
    return mongoose.models[tableName];
  }

  return mongoose.model(tableName, savingsAccountSchema, tableName);
}

module.exports = { getSavingAccountModel };