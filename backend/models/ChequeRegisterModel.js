// const mongoose = require('mongoose');
// const { city, branch, state } = useParams();
// const userSchema = new mongoose.Schema({
//   chequeNumber: { type: String, unique: true, required: true },
//   issueDate: { type: Date, required: true }, // Date type instead of String
//   payeeName: { type: String, required: true },
//   amount: { type: Number, required: true }, // Number type instead of String
//   purpose: { type: String, required: true },
//   status: { type: String, required: true },
// });

// module.exports = mongoose.model("ChequeRegister", userSchema);
const mongoose = require('mongoose');

const chequeSchema = new mongoose.Schema({
  branch: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  chequeNumber: { type: String, required: true },
  issueDate: { type: Date, required: true },
  payeeName: { type: String, required: true },
  amount: { type: Number, required: true },
  purpose: { type: String },
  status: {
    type: String,
    enum: ["Pending", "Cleared", "Bounced", "Cancelled"],
    default: "Pending",
  },
}, { timestamps: true });

function getChequeModel(city, branch, state) {
  const tableName = `chequesregister_${state}_${city}_${branch}`.toLowerCase().replace(/\s+/g, "_");

  if (mongoose.models[tableName]) {
    return mongoose.models[tableName];
  }

  return mongoose.model(tableName, chequeSchema, tableName);
}

module.exports = { getChequeModel };

