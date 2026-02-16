import Income from "../models/Income.js";

export const addIncome = async (req, res)=>{
    try {
        const {amount, source, description, date} = req.body;

        const income = await Income.create({
            userId: req.user.id,
            amount, 
            source,
            description,
            date
        })
        res.status(201).json(income);
    } catch (error) {
      console.log("error:", error)
        res.status(500).json({message: "error adding income"});
    }
}

export const getIncomes = async (req, res) => {
  try {
    const { source, startDate, endDate } = req.query;
    const filter = { userId: req.user.id };
    if (source) filter.source = source;
    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    const incomes = await Income.find(filter).sort({ date: -1 });
    res.json(incomes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching incomes" });
  }
};

export const updateIncome = async (req, res)=>{
    try {
        const {id} = req.params;
        let income = await Income.findOne({_id: id, userId: req.user.id});
        if(!income) return res.status(404).json({message: "income not found"});

        const updated = await Income.findByIdAndUpdate(id, req.body ,{ new: true });
        res.json(updated)
    } catch (error) {
        res.status(500).json({message: "error updating income"});
    }
}

export const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Income.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ message: "Income not found" });
    res.json({ message: "Income deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting income" });
  }
};