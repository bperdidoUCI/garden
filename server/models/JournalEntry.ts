import { Schema, model, Types } from 'mongoose';

const journalEntrySchema = new Schema({
  savedPlantId: {
    type: Types.ObjectId,
    ref: 'SavedPlant',
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: String,
  notes: String,
  image: String,
}, { timestamps: true });

export default model('JournalEntry', journalEntrySchema);