import { Schema, model, Document } from 'mongoose';

export interface IFavorite extends Document {
  user: Schema.Types.ObjectId;
  trefleId: number;
  common_name: string;
  scientific_name: string;
  image_url: string;
}

const favoriteSchema = new Schema<IFavorite>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  trefleId: { type: Number, required: true },
  common_name: String,
  scientific_name: String,
  image_url: String,
}, { timestamps: true });

export default model<IFavorite>('Favorite', favoriteSchema);
