import { Parser } from "json2csv"
import Expense from "../models/Expense.js";
import Income from "../models/Income.js";
import mongoose from "mongoose";

export const exportData = async (req, res)=>{
   try {
     const { type } = req.query;
    if(!["expense", "income"].includes(type)){
        return res.status(400).json({message: "invalid type"});
    }

    const match = { userId: new mongoose.Types.ObjectId(req.user.id)};

    const data = type === "expense" ? await Expense.find(match).lean() : await Income.find(match).lean();

    if(!data.length) return res.status(404).json({message: "no data found"});

    const fields = type === "expense" ? 
    [
      { label: "Amount", value: "amount" },
          { label: "Category", value: "category" },
          { label: "Description", value: "description" },
          { label: "Date", value: (row) => new Date(row.date).toISOString().split("T")[0] }] 
    : 
    [
       { label: "Amount", value: "amount" },
          { label: "Source", value: "source" },
          { label: "Description", value: "description" },
          { label: "Date", value: (row) => new Date(row.date).toISOString().split("T")[0] }];

    const parser = new Parser({ fields });
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment(`${type}-data.csv`);
    return res.send(csv);
   } catch (error) {
    return res.status(500).json({ message: "error exporting data"})
   }
}