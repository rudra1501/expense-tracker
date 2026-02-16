import Expense from "../models/Expense.js";

export const addExpense = async(req, res)=>{
    try {
        let {amount, category, customCategory, description, date} = req.body;

        const expense = await Expense.create({
            userId: req.user.id,
            amount, 
            category,
            customCategory,
            description, 
            date,
        });
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({message: "error adding expense"});
        console.log("error ::" , error) 
    }
}

export const getExpenses = async(req, res)=>{
    try {

        const {category, startDate, endDate} = req.query;
        const filter = {userId: req.user.id};

        if(category) filter.category = category;
        if(startDate && endDate){
            filter.date = {
                $gte : new Date(startDate),
                $lte : new Date(endDate)
            }
        }

        const expenses = await Expense.find(filter).sort({date: -1});
        res.json(expenses);
    } catch (error) {
        res.status(500).json({message: "error fetching expenses"});
    }
}

export const updateExpesnse = async(req, res)=>{
    try {
        const {id} = req.params;
        let expense = await Expense.findOne({_id: id, userId: req.user.id});
        if(!expense) return res.status(404).json({message: "expense not found"});

        expense = await Expense.findByIdAndUpdate(id, req.body, {new: true})
        res.json(expense);
    } catch (error) {
        res.status(500).json({message: "error updating expense"});
    }
}

export const deleteExpense = async (req, res)=>{
    try {
        const {id} = req.params;

        const expense = await Expense.findOneAndDelete({_id: id, userId: req.user.id});
        if(!expense) return res.status(404).json({message: "expense not found"});

        res.json({message: "expense deleted"});
    } catch (error) {
        res.status(500).json({message: "error deleting expense"});
    }
}