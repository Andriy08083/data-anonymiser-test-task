import { ICustomer } from "../schemas/customer";
import { Types } from "mongoose";
import { faker } from "@faker-js/faker";

export const createFakeCustomer = (): ICustomer => ({
  _id: new Types.ObjectId(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  address: {
    line1: faker.location.streetAddress(),
    line2: faker.location.secondaryAddress(),
    postcode: faker.location.zipCode(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
  },
  createdAt: faker.date.anytime(),
});

export const anonymiseCustomer = (customer: ICustomer): ICustomer => ({
  _id: customer._id,
  firstName: faker.string.alphanumeric({ length: 8 }),
  lastName: faker.string.alphanumeric({ length: 8 }),
  email: `${faker.string.alphanumeric({ length: 8 })}@${customer.email.slice(customer.email.search("@") + 1)}`,
  address: {
    line1: faker.string.alphanumeric({ length: 8 }),
    line2: faker.string.alphanumeric({ length: 8 }),
    postcode: faker.string.alphanumeric({ length: 8 }),
    city: customer.address.city,
    state: customer.address.state,
    country: customer.address.country,
  },
  createdAt: customer.createdAt,
});
