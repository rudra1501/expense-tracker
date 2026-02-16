import Expense from "../models/Expense.js";
import Income from "../models/Income.js";
import mongoose from "mongoose";


const parseRange = (startDate, endDate)=>{
    if(!startDate || !endDate) return undefined;
    return { $gte: new Date(startDate), $lte: new Date(endDate)};
}

export const getSummary = async (req, res)=>{
    try {
        const {startDate, endDate} = req.query;
        const dateRange = parseRange(startDate, endDate);

        const matchBase = {userId: new mongoose.Types.ObjectId(req.user.id)};
        if(dateRange){
            matchBase.date = dateRange;
        };

        const [expenseAgg] = await Expense.aggregate([
            { $match: matchBase },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const [incomeAgg] = await Income.aggregate([
            { $match: matchBase },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const totalExpense = expenseAgg?.total || 0;
        const totalIncome = incomeAgg?.total || 0;

        // console.log("total expense", totalExpense);
        // console.log("total income", incomeAgg);

        res.json({
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense
        });

    } catch (error) {
        // console.log("error: ", error)
        res.status(500).json({message: "error computing summary"})
    }
}

export const getCategory = async(req, res)=>{
    try {
        const {startDate, endDate} = req.query;
        const dateRange = parseRange(startDate, endDate);

        const match = {userId: new mongoose.Types.ObjectId(req.user.id)};
        if(dateRange){
            match.date = dateRange;
        }

        const byCategory = await Expense.aggregate([
            {$match: match},
            {$group: {_id: "$category", total: { $sum: "$amount"}}},
            // {$project: {_id: 0, category: "$_id", total: 1, count: 1}},
            {$sort: {total: -1}}
        ]);

        const formatted = byCategory.map((b)=>({
            category: b._id,
            total: b.total
        }))
        res.json(formatted);
    } catch (error) {
        res.status(500).json({message: "error grouping by category"});
    }
}

export const getMonthlyTotals = async(req, res)=>{
    try {
        const year = parseInt(req.query.year, 10) || new Date().getFullYear();
        const start = new Date(`${year}-01-01T00:00:00.000Z`);
        const end = new Date(`${year}-12-31T23:59:59.999Z`);

        const matchBase = { userId: new mongoose.Types.ObjectId(req.user.id), date: { $gte: start, $lte: end}};

        const expenseAgg = await Expense.aggregate([
            { $match: matchBase},
            { $group: { _id: { $month: "$date"}, total: { $sum: "$amount"}}}
        ]);

        const incomeAgg = await Income.aggregate([
            { $match: matchBase},
            { $group: { _id: { $month: "$date"}, total: { $sum: "$amount"}}}
        ]);

        const expenseMap = new Map(expenseAgg.map((x)=> [x._id, x.total]));
        const incomeMap = new Map(incomeAgg.map((x)=> [x._id, x.total]));

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const monthlyData = months.map((label, i)=>{
            const monthNum = i + 1;
            return{
                month: label,
                expense: expenseMap.get(monthNum) || 0,
                income: incomeMap.get(monthNum) || 0,
            }
        })
        
        res.json({
            year,
            monthlyData
        })
    } catch (error) {
        res.status(500).json({message: "error in computing monthly totals"});
    }
}