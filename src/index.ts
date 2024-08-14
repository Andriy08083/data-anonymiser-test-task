import express, { Express } from "express";
import _ from "lodash";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Customers, CustomersAnonymised } from "./models";
import { faker } from "@faker-js/faker";
import { anonymiseCustomer, createFakeCustomer } from "./utils";
import { ICustomer } from "./schemas/customer";

dotenv.config();

const app: Express = express();

const startServer = async () => {
  app.listen(4000, () => {
    console.log("Server started");
  });

  Customers.watch().on("change", async (data) => {
    if (data.operationType === "insert") {
      await CustomersAnonymised.updateOne(
        { _id: data.fullDocument._id },
        anonymiseCustomer(data.fullDocument),
        { upsert: true },
      );
    }

    if (data.operationType === "update") {
      const fullDocument = await Customers.findOne(
        { _id: data.documentKey._id },
        null,
        { lean: true },
      );
      await CustomersAnonymised.updateOne(
        { _id: data.documentKey._id },
        {
          $set: anonymiseCustomer(
            _.merge(fullDocument, data.updateDescription.updatedFields),
          ),
          $unset: data.updateDescription.removedFields.map((key: string) => ({
            [key]: 1,
          })),
        },
        { upsert: true },
      );
    }
  });

  setInterval(async () => {
    await Customers.insertMany(
      faker.helpers.multiple<ICustomer>(createFakeCustomer, {
        count: { min: 1, max: 10 },
      }),
    );
  }, 200);
};

mongoose.connect(process.env.DB_URI!).then(startServer);
