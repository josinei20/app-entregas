const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  deliveryNumber: {
    type: String,
    required: true,
    trim: true
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true
  },
  driverName: {
    type: String,
    required: true
  },
  vehiclePlate: {
    type: String,
    trim: true
  },
  observations: {
    type: String,
    trim: true
  },
  deliveryDate: {
    type: Date,
    default: Date.now
  },
  documents: {
    canhotNF: {
      filename: String,
      path: String,
      size: Number,
      uploadedAt: Date
    },
    canhotCTE: {
      filename: String,
      path: String,
      size: Number,
      uploadedAt: Date
    },
    diarioBordo: {
      filename: String,
      path: String,
      size: Number,
      uploadedAt: Date
    },
    devolucaoVazio: {
      filename: String,
      path: String,
      size: Number,
      uploadedAt: Date
    },
    retiradaCheio: {
      filename: String,
      path: String,
      size: Number,
      uploadedAt: Date
    }
  },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'completed'],
    default: 'draft'
  },
  submittedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for better query performance
deliverySchema.index({ driverId: 1, deliveryDate: -1 });
deliverySchema.index({ deliveryNumber: 1 });
deliverySchema.index({ submittedAt: -1 });

module.exports = mongoose.model('Delivery', deliverySchema);
