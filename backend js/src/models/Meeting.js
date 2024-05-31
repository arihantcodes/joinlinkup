
import mongoose, { Schema } from 'mongoose';

const MeetingSchema = new Schema({
  user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  paymentId: {
      type: String,
      required: true,
      unique: true
  },
  paymentStatus: {
      type: String,
      enum: ['pending', 'captured', 'failed'],
      default: 'pending'
  },
  meetLink: {
      type: String,
      default: ''
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
MeetingSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

export const Meeting = mongoose.model('Meeting', MeetingSchema);
