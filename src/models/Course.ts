import { Schema, model, type Document } from 'mongoose';

export interface ICourse extends Document {
  code: string;
  title: string;
  units: number;
  semester: string;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      match: [/^[A-Z0-9]+$/, 'Course code must contain only letters and numbers.'],
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    units: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
    },
    semester: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Course = model<ICourse>('Course', courseSchema);
export { courseSchema };
