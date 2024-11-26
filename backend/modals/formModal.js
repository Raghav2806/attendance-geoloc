import mongoose from "mongoose";
import moment from "moment-timezone"
import exportToGoogleSheet from "../utils/googleSheets.js";

const formSchema = new mongoose.Schema({
  formId: String,
  date: { 
    type: Date, 
    default: () => moment().tz("Asia/Kolkata").toDate() 
  },
  longitude: Number,
  latitude: Number,
  students: [
    {
      bitsId: String,
    },
  ],
});

formSchema.post("save", async function () {
  await exportToGoogleSheet();
});

// Or if you want to run it after every update:
formSchema.post("update", async function () {
  await exportToGoogleSheet();
});

const formModal = mongoose.model("forms", formSchema);

export default formModal;
