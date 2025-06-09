import { Schema, model, Document } from 'mongoose';

export interface IPlant extends Document {
  trefleId: number;
  common_name: string;
  scientific_name: string;
  image_url: string;
}

const plantSchema = new Schema<IPlant>({
  trefleId: { type: Number, required: true, unique: true },
  common_name: String,
  scientific_name: String,
  image_url: String,
});

export default model<IPlant>('Plant', plantSchema);
