import mongoose from "mongoose";
import exportToGoogleSheet from "../utils/googleSheets.js";

const formSchema = new mongoose.Schema({
  formId: String,
  date: { 
    type: Date, 
    default: () => {
      const now = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
      return new Date(now.getTime() + istOffset);
    }
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
