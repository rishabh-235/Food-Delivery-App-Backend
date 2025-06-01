import Table from "../models/table.model.js";

const addTable = async (req, res) => {
  try {
    const { capacity, name } = req.body;
    const newTable = new Table({ capacity, name });
    await newTable.save();
    res
      .status(201)
      .json({ message: "Table added successfully", table: newTable });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding table", error: error.message });
  }
};

const getTables = async (_, res) => {
  try {
    const tables = await Table.find();
    res.status(200).json(tables);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tables", error: error.message });
  }
};

const removeTable = async (req, res) => {
  try {
    const { tableId } = req.body;
    const deletedTable = await Table.findByIdAndDelete(tableId);
    if (!deletedTable) {
      return res.status(404).json({ message: "Table not found" });
    }
    res
      .status(200)
      .json({ message: "Table removed successfully", table: deletedTable });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing table", error: error.message });
  }
};

const allocateTable = async (req, res, next) => {
  try {
    const { numberofPeople } = req.body;
    let availableTables = await Table.findOne({
      status: "available",
      capacity: { $gte: numberofPeople },
    }).sort({ capacity: 1 });

    if (!availableTables) {
      //try to find two consicutive tables (their creation time is one after other) that can accommodate the number of people if no single table is available
      const tables = await Table.find({status: "available"}).sort({ createdAt: 1 }).lean();

      // Find consecutive pairs that meet the capacity requirement
      for (let i = 0; i < tables.length - 1; i++) {
        const currentTable = tables[i];
        const nextTable = tables[i + 1];
        const totalCapacity = currentTable.capacity + nextTable.capacity;

        if (totalCapacity >= numberofPeople) {
          currentTable.status = "occupied";
          nextTable.status = "occupied";
          availableTables = [currentTable, nextTable];
        }
      }
    } else {
      availableTables = [availableTables];
      availableTables[0].status = "occupied";
    }

    req.body.allocatedTables = availableTables.map((table) => table._id);
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error allocating table", error: error.message });
  }
};

export { addTable, getTables, removeTable, allocateTable };
