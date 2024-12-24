const moment = require("moment");
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Person = require("../Models/clientSchema.js");
const { User } = require("../Models/OfficeSchema.js");

const router = express.Router();

// POST route to create a client
router.post("/newclient", async (req, res) => {
  const { client, office_id, user_id, accessToken } = req.body;

  try {
    // Verify access token
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const dbName = `office_${office_id}`;
    const dbConnection = mongoose.connection.useDb(dbName);

    const ClientModel = dbConnection.model("Client", Person.schema);

    const currentDate = new Date();
    const newClient = new ClientModel({
      ...client,
      addedBy: user_id,
      addDate: currentDate,
    });

    await newClient.save();

    res.status(201).json({ message: "Client added successfully", newClient });
  } catch (error) {
    console.error("Error saving client:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// POST route to fetch all clients
router.post("/", async (req, res) => {
  const { officeId } = req.body;

  if (!officeId) {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing officeId",
    });
  }

  try {
    const dbName = `office_${officeId}`;
    const connection = mongoose.connection.useDb(dbName);

    const Client = connection.model(
      "Client",
      new mongoose.Schema({}, { strict: false })
    );

    const clients = await Client.find().lean();

    const updatedClients = await Promise.all(
      clients.map(async (client) => {
        const userDb = mongoose.connection.useDb("offices");
        const UserCol = userDb.model("User", User.schema);

        const addingUser = await UserCol.findById(client.addedBy).select(
          "fname lname"
        );
        if (addingUser) {
          client.addedBy = `${addingUser.fname} ${addingUser.lname}`;
        }

        if (client.updateBy) {
          const updatingUser = await UserCol.findById(client.updateBy).select(
            "fname lname"
          );
          if (updatingUser) {
            client.updateBy = `${updatingUser.fname} ${updatingUser.lname}`;
          }
        }

        if (client.addDate) {
          client.addDate = moment(client.addDate).format("DD/MM/YYYY, HH:mm");
        }
        if (client.updateDate) {
          client.updateDate = moment(client.updateDate).format(
            "DD/MM/YYYY, HH:mm"
          );
        }

        return client;
      })
    );
    res.status(200).json({ success: true, clients: updatedClients });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.put("/updateclient/:id", async (req, res) => {
  try {
    const { id } = req.params; // Client ID from params
    const { formData, userDetails, officeDetails } = req.body; // Data from body

    // Use the correct database dynamically
    const dbName = `office_${officeDetails._id}`;
    const db = mongoose.connection.useDb(dbName); // Use the correct database

    // Bind the model to the database
    const Clients = db.model("Person", Person.schema, "clients");

    // Update client document
    const updatedClient = await Clients.findByIdAndUpdate(
      id,
      {
        ...formData, // Spread formData into update
        updateBy: userDetails._id, // Add `updateBy` field
        updateDate: new Date(), // Add `updateDate` field
      },
      { new: true, omitUndefined: true } // Return the updated document
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res
      .status(200)
      .json({ message: "Client updated successfully", data: updatedClient });
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

module.exports = router;
module.exports = router;
