import type { Request } from 'express';
import type { Document, InferSchemaType } from 'mongoose';
import type { IUser } from '../models/User';
import type { ISubmission } from '../models/Submission';

export type AuthRequest = Request & {
  user?: {
    id: string;
    email: string;
    username: string;
  };
};

export type UserSafe = {
  id: string;
  username: string;
  email: string;
};

export type UserDocument = Document & InferSchemaType<typeof import('../models/User').userSchema>;

export type SubmissionDocument = Document & InferSchemaType<typeof import('../models/Submission').submissionSchema>;

export type UserPayload = {
  id: string;
  email: string;
  username: string;
};

export type CourseDoc = {
  code: string;
  title: string;
  units: number;
  semester: string;
};

export type SubmissionPayload = ISubmission;
