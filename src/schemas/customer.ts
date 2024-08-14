import { Types, Schema } from "mongoose";

export interface ICustomer {
  _id: Types.ObjectId;
  firstName: String;
  lastName: String;
  email: String;
  address: {
    line1: String;
    line2: String;
    postcode: String;
    city: String;
    state: String;
    country: String;
  };
  createdAt: Date;
}

const addressSchema: Schema = new Schema(
  {
    line1: { type: String, required: true },
    line2: { type: String, required: true },
    postcode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false, versionKey: false },
);

export const customerSchema = new Schema<ICustomer>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: addressSchema, required: true },
    createdAt: { type: Date, required: true },
  },
  { versionKey: false },
);
