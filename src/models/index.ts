import { model } from "mongoose";
import { ICustomer, customerSchema } from "../schemas/customer";

export const Customers = model<ICustomer>(
  "customers",
  customerSchema,
  "customers",
);
export const CustomersAnonymised = model<ICustomer>(
  "customers_anonymised",
  customerSchema,
  "customers_anonymised",
);
