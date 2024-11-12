import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    formId: String,
    date: {type: Date, default: new Date().toISOString()},
    longitude: Number,
    latitude: Number
});

const formModal = mongoose.model("forms", formSchema);

export default formModal;