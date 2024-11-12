import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    orders: [{
        fname: {type: String},
        address: {type: String},
        postal: {type: String},
        items: [{
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
            quantity: { type: Number, default: 1 },
            price: {type: Number}
        }],
        totalPrice: {type: Number, default: 0},
        orderDate: { type: Date, default: new Date() },
    }]
});

const orderModel = mongoose.model("orders", orderSchema);

const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: { 
    type: Date, 
    required: true, 
    index: true,
    default: new Date().toISOString()
  },
  attendanceRecords: [
    {
      studentId: { type: String, required: true },
      timeStamp: { type: Date, default: Date.now }, 
      // locationVerified: { type: Boolean, default: false } 
    }
  ]
});

const attendanceModel = mongoose.model('attendance', attendanceSchema);

export default attendanceModel;
