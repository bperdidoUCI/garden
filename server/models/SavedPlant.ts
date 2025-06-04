import { Schema, model, Types } from 'mongoose';

const savedPlantSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  trefleId: {
    type: String,
    required: true,
  },
  nickname: String,
  location: String,
  imageUrl: String,
}, { timestamps: true });

export default model('SavedPlant', savedPlantSchema);
