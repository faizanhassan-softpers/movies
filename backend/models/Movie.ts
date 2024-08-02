import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IMovie extends Document {
  owner: mongoose.Types.ObjectId;
  title: string;
  publishingYear: number;
  imageUrl: string;
}

// Create the MovieSchema with type safety
const MovieSchema: Schema<IMovie> = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  publishingYear: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Create the Movie model
const Movie: Model<IMovie> = mongoose.models.Movie || mongoose.model<IMovie>('Movie', MovieSchema);

export default Movie;