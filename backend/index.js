const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const chequeRoute = require("./routes/ChequeRegisterRoutes");
const userRoute=require('./routes/RegistrationRoutes')
const newMemberRoute=require('./routes/NewMemberRoutes')
const registerGroups=require('./routes/BankGroupAccountRoutes')
const savingAccount=require('./routes/SavingAccountFormRoutes')
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/Bank")
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Database connection failed:", err));

app.use("/api/cheque", chequeRoute);
app.use('/api/users',userRoute)
app.use('/api/newmember',newMemberRoute)
app.use('/api/bank',registerGroups)
app.use('/api/savingaccount',savingAccount)


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
