import { Document } from "mongoose";

export interface IDoctor extends Document {
  name: string;
  degree: string;
  specialization: string;
  location: string;
  phone: string;
  email: string;
  experience: string;
  photoUrl?: string;
  availableDays?: string[];
  ratings?: number;
  createdAt?: Date;
  updatedAt?: Date;
}