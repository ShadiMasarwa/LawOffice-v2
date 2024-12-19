const express = require("express");
const Person = require("../Models/personSchema");
const router = express.Router();

// POST route to create a person
router.post("/", async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    const savedPerson = await newPerson.save();
    res.status(201).json(savedPerson);
  } catch (err) {
    res.status(500).json({ message: "Failed to save person", error: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch persons", error: err });
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const person = await Person.findById(id);
    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.status(200).json(person);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch person", error: err });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = { ...req.body };
  delete updateData._id;
  try {
    const updatedCustomer = await Person.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedCustomer) {
      return res.status(404).json({ error: "לקוח לא נמצא" });
    }

    res.status(200).json(updatedCustomer);
  } catch (err) {
    res.status(500).json({ error: "פעולת העדכון נכשלה" });
  }
});

module.exports = router;
