import mongoose from "mongoose"
import Expense from "../models/Expense.js"
import Income from "../models/Income.js";

export const getInsights = async(req, res)=>{
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id);
        const now = new Date();
        const monthName = now.toLocaleString("default", {month: "long"});
        const year = now.getFullYear();
        const yearStart = new Date(now.getFullYear(), 0, 1);
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        let insights = [];

        const categoryAgg = await Expense.aggregate([
            {$match : {userId}},
            {$group: {_id: "$category", total: {$sum: "$amount"}}},
            {$sort: {total: - 1}}
        ]);

        if(categoryAgg.length > 0 ){
            const total = categoryAgg.reduce((sum, c)=> sum + c.total, 0);
            const top = categoryAgg[0];
            const percent = ((top.total / total) * 100).toFixed(1);

            insights.push(`Your top expenses category so far in this ${year} is ${top._id} (${percent}% of the total expenses).`)
        }

        
        const incomeAgg = await Income.aggregate([
            {$match: {userId , date: {$gte: monthStart}}},
            {$group: {_id: null, total: {$sum: "$amount"}}}
        ]);
        const expenseAgg = await Expense.aggregate([
            {$match: {userId, date: {$gte: monthStart}}},
            {$group: {_id: null, total: {$sum: "$amount"}}}
        ]);

        const totalIncome = incomeAgg[0]?.total || 0;
        const totalExpense = expenseAgg[0]?.total || 0;

        if(totalExpense > totalIncome){
            insights.push(`In ${monthName} ${year},your expenses (${totalExpense}) exceeded income (${totalIncome}).`)
        }

        const monthlyAgg = await Expense.aggregate([
            {$match: {userId, date: {$gte: yearStart}}},
            {
                $group:{
                    _id: {$month: "$date"},
                    total: {$sum: "$amount"}
                }
            }
        ])
        const thisMonth = monthlyAgg.find((m) => m._id === now.getMonth() + 1);
        const pastMonths = monthlyAgg.filter((m) => m._id !== now.getMonth() + 1);

        if(thisMonth && pastMonths.length > 0){
            const avgPast = pastMonths.reduce((sum, m)=> sum + m.total, 0)/ pastMonths.length;
            if(thisMonth.total > 2*avgPast){
                insights.push(`Your spending in ${monthName} ${year} (${thisMonth.total}) is more than double your average (${avgPast.toFixed(2)}).`
                );
            }
        }
        
        if(totalIncome > 0 ){
            const savingRate = ((totalIncome - totalExpense)/totalIncome) * 100;
            if(savingRate < 20)(
                insights.push(`Your saving rate in ${monthName} ${year} is only ${savingRate.toFixed(1)}%. Try to keep at least 20%`)
            );

        }

        const categoryThisMonth = await Expense.aggregate([
            {$match: {userId, date: {$gte: monthStart}}},
            {$group: {_id: "category", total: {$sum: "$amount"}}},
        ]);

        for(const cat of categoryThisMonth){
            const pastCat = await Expense.aggregate([
                {
                    $match: {
                        userId,
                        date: {$gte: yearStart, $lt: monthStart},
                        category: cat._id,
                    },
                },
                {$group: {_id: null, avg: {$avg: "$amount"}}}
            ]);

            const avgPast = pastCat[0]?.avg || 0;
            if(avgPast > 0 && cat.total > 3 * avgPast){
                insights.push(`Your spending on ${cat._id} in ${monthName} ${year} (${cat.total}) is unusually high compared to your average ${avgPast.toFixed(2)}`);
            }
        }

        res.json({ insights });
    } 
    catch (error) {
        console.error("error in generating insights", error);
        res.status(500).json({message: "error generating insights"})
    }
}