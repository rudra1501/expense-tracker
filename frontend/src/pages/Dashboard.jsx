// import { useEffect, useState } from "react"
// import handleDownload from "../utils/Download";
// import MonthlyChart from "../components/charts/MonthlyChart";
// import CategoryPie from "../components/charts/CategoryPie";
// import ExpenseForm from "../components/forms/ExpenseForm";
// import ExpenseList from "../components/lists/ExpenseList";
// import IncomeForm from "../components/forms/IncomeForm";
// import IncomeList from "../components/lists/IncomeList";
// import { addExpense, deleteExpense, getExpenses, updateExpense } from "../services/expenseService";
// import { addIncome, deleteIncome, getIncome, updateIncome } from "../services/incomeService";
// import { getCategoryData, getMonthlyData, getSummary } from "../services/analyticService";
// import Filters from "../components/lists/Filters";
// import API from "../api/axios";
// import Profile from "./Profile";
// import { Link } from "react-router-dom";

// // https://chatgpt.com/c/68ac01c7-e2e8-8329-8c78-52741fe0e672

// function Dashboard({onLogout}) {
//     const [summary, setSummary] = useState(null);
//     const [expenseMessage, setExpenseMessage] = useState(null);
//     const [incomeMessage, setIncomeMessage] = useState(null);
//     const [monthly, setMonthly] = useState(null);
//     const [categoryData, setCategoryData] = useState([]);
//     const [insights, setInsights] = useState([]);
    
//     const [expense, setExpense] = useState([]);
//     const [expenseForm, setExpenseForm] = useState({
//         amount: "",
//         category: "",
//         description: "",
//         date: "",
//     });
//     const [editExpenseId, setEditExpenseId] = useState(null);

//     const [income, setIncome] = useState([]);
//     const [incomeForm, setIncomeForm] = useState({
//         amount: "",
//         source: "",
//         description: "",
//         date: "",
//     });
//     const [editIncomeId, setEditIncomeId] = useState(null);

//     useEffect(()=>{
//         fetchSummary();
//         fetchExpense();
//         fetchIncome();
//         fetchMonthly();
//         fetchCategoryData();
//         fetchInsights();
//     },[])

    // const fetchSummary = async()=>{
    //     try {
    //         const { data } = await getSummary();
    //         setSummary(data);
    //     } catch (error) {
    //         console.error("error in fetching summary", error);
    //     }
    // };

    // const fetchExpense = async()=>{
    //     try {
    //         const { data } = await getExpenses();
    //         setExpense(data);
    //     } catch (error) {
    //         console.error("error in fetching expenses", error);
    //     }
    // };

    // const fetchIncome = async()=>{
    //     try {
    //         const { data } = await getIncome();
    //         setIncome(data);
    //     } catch (error) {
    //         console.error("error in fetching income", error);
    //     }
    // };

    // const fetchMonthly = async()=>{
    //     try{
    //         const {data} = await getMonthlyData();
    //         setMonthly(data);
    //     }
    //     catch (error){
    //         console.error("error in fetching monthly data", error);
    //     }
    // };

    // const fetchCategoryData = async()=>{
    //     try {
    //         const { data } = await getCategoryData();
    //         setCategoryData(data);
    //     } catch (error) {
    //         console.error("error in fetching category data", error)
    //     }
    // }

    // const fetchInsights = async()=>{
    //     try {
    //         const { data } = await API.get("/insights");
    //         setInsights(data.insights);
    //     } catch (error) {
    //         console.error("error in fetching insights", error);
    //     }
    // }

    // const handleExpenseSubmit = async(e)=>{
    //     e.preventDefault();
    //     if(expenseForm.amount <= 0){
    //         alert("amount must be greater than 0");
    //         return;
    //     }

    //     if(!expenseForm.category.trim()){
    //         alert("category cannot be empty");
    //         return;
    //     }

    //     if(new Date(expenseForm.date) > new Date()){
    //         alert("date cannot be in the future");
    //         return;
    //     }
    //     try {
    //         if(editExpenseId){
    //             await updateExpense(editExpenseId, expenseForm);
    //             setExpenseMessage({ type: "success", text: "expense updated"});
    //         }
    //         else{
    //             await addExpense(expenseForm);
    //             setExpenseMessage({ type: "success", text: "expense added"});
    //         }
    //         setExpenseForm({ amount: "", category: "", customCategory: "", description: "", date: "",});
    //         setEditExpenseId(null);
    //         fetchSummary();
    //         fetchExpense();
    //     } catch (error) {
    //         console.error("error in saving expense:", error);
    //         setExpenseMessage({ type: "error", text: error.response?.data?.message || "error in saving expense"});
    //     }

    //     setTimeout(()=> setExpenseMessage(null), 3000);
    // };

    // const handleEditExpense = (exp)=>{
    //     setExpenseForm({
    //         amount: exp.amount,
    //         category: exp.category === exp.customCategory ? "Other" : exp.category,
    //         customCategory: exp.customCategory || "",
    //         description: exp.description,
    //         date: exp.date.split("T")[0],
    //     })
    //     setEditExpenseId(exp._id)
    // };

    // const handleDeleteExpense = async (id)=>{
    //     if(!window.confirm("delete the expense?")) return;
    //     try {
    //         await deleteExpense(id);
    //         setExpense(expense.filter((e)=> e._id !== id));
    //         fetchSummary();
    //     } catch (error) {
    //          console.error("error in deleting expense", error);
    //     }
    // }

    // const handleIncomeSubmit = async(e)=>{
    //     e.preventDefault();
    //     if(incomeForm.amount <= 0){
    //         alert("amount cannot be less than 0");
    //         return;
    //     }

    //     if(!incomeForm.source.trim()){
    //         alert("source of income cannot be empty");
    //         return;
    //     }

    //     if(new Date(incomeForm.date) > new Date()){
    //         alert("date cannot be in the future");
    //         return;
    //     }
    //     try {
    //         if(editIncomeId){
    //             await updateIncome( editIncomeId, incomeForm);
    //             setIncomeMessage({ type: "success", text: "income updated"})
    //         }
    //         else{
    //             await addIncome(incomeForm);
    //             setIncomeMessage({ type: "success", text: "income added"})
    //         }
    //         setIncomeForm({amount: "", source: "", description: "", date: ""});
    //         setEditIncomeId(null);
    //         fetchIncome();
    //         fetchSummary();
    //     } catch (error) {
    //         console.error("error in saving income", error);
    //         setIncomeMessage({ type: "error", text: error.response?.data?.message || "error in saving income"});
    //     }
    //     setTimeout(()=> setIncomeMessage(null), 3000);
    // }

    // const handleEditIncome = (inc)=>{
    //     setIncomeForm({
    //         amount: inc.amount,
    //         source: inc.source,
    //         description: inc.description,
    //         date: inc.date.split("T")[0]
    //     })
    //     setEditIncomeId(inc._id);
    // }

    // const handleDeleteIncome = async(id)=>{
    //     if(!window.confirm("Delete this income?")) return;
    //     try {
    //         await deleteIncome(id);
    //         setIncome(income.filter((i)=> i._id !== id));
    //         fetchSummary();
    //     } catch (error) {
    //         console.error("error in deleting income", error);
    //     }
    // }

    // const applyFilters = async (filters)=>{
    //     try {
    //         const {type, category, startDate, endDate} = filters;
    //         const query = new URLSearchParams({
    //             category,
    //             startDate,
    //             endDate
    //         }).toString();

    //         if(type === "expense"){
    //             const { data } = await API.get(`/expenses?${query}`);
    //             setExpense(data);
    //             // if(data.length === 0) alert("no expenses found for this filter");
    //         }
    //         else{
    //             const { data } = await API.get(`/income?${query}`);
    //             setIncome(data);
    //             // if(data.length === 0) alert("no income found for this filter");
    //         }
    //     } catch (error) {
    //         console.error("error applying filters", error);
    //     }
    // }

    // const getInsightsTypes = (msg)=>{
    //     if(
    //         msg.includes("exceeded") ||
    //         msg.includes("double") ||
    //         msg.includes("unusually") ||
    //         msg.includes("only")
    //     ){
    //         return "warning";
    //     }
    //     return "positive";
    // }

//     if(!summary) return <p>Loading...</p>


//     return (
//     <div style={{ padding: "20px" }}>
//         <h2>Dashboard</h2>
//         <p>Total Income: {summary.totalIncome}</p>
//         <p>Total Expense: {summary.totalExpense}</p>
//         <p>Balance: {summary.balance}</p>

//         {" "}
//         <button onClick={onLogout}>Logout</button>
//         <Link to="/profile">Profile</Link>

//         <hr />

//         <h2>Monthly Analytics</h2>

//         {monthly ? (
//           <MonthlyChart data={ monthly.monthlyData }/>
//         ) : (
//           <p>Loading chart...</p>
//         )}
        
//         <hr />

//         <h2>Category-wise Breakdown</h2>
//         {categoryData.length > 0 ? (
//           <CategoryPie data={categoryData}/>
//         ) : (
//           <p>No expenses yet.</p>
//         )}

//         <hr />

//         <h4>Insights</h4>
//         {insights.length > 0 ? (
//           <ul style={{ listStyle: "none", padding: 0 }}>
//             {insights.map((msg, idx) => {
//               const type = getInsightsTypes(msg);
//               return (
//                 <li
//                   key={idx}
//                   style={{
//                     marginBottom: "8px",
//                     color: type === "warning" ? "red" : "green",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "6px"
//                   }}
//                 >
//                   <span>{type === "warning" ? "⚠️" : "✅"}</span>
//                   <span>{msg}</span>
//                 </li>
//               );
//             })}
//           </ul>
//         ) : (
//           <p>No insights yet. Add more data to see trends.</p>
//         )}

//         <h4>Filters</h4>
//         <Filters onFilter={applyFilters} />
        
//         <h2>Manage Expenses</h2>
//         <ExpenseForm form={expenseForm} setForm={setExpenseForm} onSubmit={handleExpenseSubmit} editId={editExpenseId}/>

//         {expenseMessage && (
//             <p style={{ color: expenseMessage.type === "error" ? "red" : "green" }}>{expenseMessage.text}</p>
//         )}

//         <ExpenseList expenses={expense} onEdit={handleEditExpense} onDelete={handleDeleteExpense}/>

//         <hr />

//         <h2>Income section</h2>
//         <IncomeForm form={incomeForm} setForm={setIncomeForm} onSubmit={handleIncomeSubmit} editId={editIncomeId}/>
//         {incomeMessage && (
//             <p style={{ color: incomeMessage.text === "error" ? "red" : "green" }}>{incomeMessage.text}</p>
//         )}
//         <IncomeList income={income} onEdit={handleEditIncome} onDelete={handleDeleteIncome}/>
//     </div>
//   )
// }

// export default Dashboard

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MonthlyChart from "../components/charts/MonthlyChart";
import CategoryPie from "../components/charts/CategoryPie";
import ExpenseForm from "../components/forms/ExpenseForm";
import ExpenseList from "../components/lists/ExpenseList";
import IncomeForm from "../components/forms/IncomeForm";
import IncomeList from "../components/lists/IncomeList";
import Filters from "../components/lists/Filters";
import API from "../api/axios";
import {
  addExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "../services/expenseService";
import { addIncome, deleteIncome, getIncome, updateIncome } from "../services/incomeService";
import { getCategoryData, getMonthlyData, getSummary } from "../services/analyticService";

function Dashboard({ onLogout }) {
  const [summary, setSummary] = useState(null);
  const [expenseMessage, setExpenseMessage] = useState(null);
  const [incomeMessage, setIncomeMessage] = useState(null);
  const [monthly, setMonthly] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [insights, setInsights] = useState([]);
  const [expense, setExpense] = useState([]);
  const [expenseForm, setExpenseForm] = useState({ amount: "", category: "", description: "", date: "" });
  const [editExpenseId, setEditExpenseId] = useState(null);
  const [income, setIncome] = useState([]);
  const [incomeForm, setIncomeForm] = useState({ amount: "", source: "", description: "", date: "" });
  const [editIncomeId, setEditIncomeId] = useState(null);

  useEffect(() => {
    fetchSummary();
    fetchExpense();
    fetchIncome();
    fetchMonthly();
    fetchCategoryData();
    fetchInsights();
  }, []);

      const fetchSummary = async()=>{
        try {
            const { data } = await getSummary();
            setSummary(data);
        } catch (error) {
            console.error("error in fetching summary", error);
        }
    };

    const fetchExpense = async()=>{
        try {
            const { data } = await getExpenses();
            setExpense(data);
        } catch (error) {
            console.error("error in fetching expenses", error);
        }
    };

    const fetchIncome = async()=>{
        try {
            const { data } = await getIncome();
            setIncome(data);
        } catch (error) {
            console.error("error in fetching income", error);
        }
    };

    const fetchMonthly = async()=>{
        try{
            const {data} = await getMonthlyData();
            setMonthly(data);
        }
        catch (error){
            console.error("error in fetching monthly data", error);
        }
    };

    const fetchCategoryData = async()=>{
        try {
            const { data } = await getCategoryData();
            setCategoryData(data);
        } catch (error) {
            console.error("error in fetching category data", error)
        }
    }

    const fetchInsights = async()=>{
        try {
            const { data } = await API.get("/insights");
            setInsights(data.insights);
        } catch (error) {
            console.error("error in fetching insights", error);
        }
    }

    const handleExpenseSubmit = async(e)=>{
        e.preventDefault();
        if(expenseForm.amount <= 0){
            alert("amount must be greater than 0");
            return;
        }

        if(!expenseForm.category.trim()){
            alert("category cannot be empty");
            return;
        }

        if(new Date(expenseForm.date) > new Date()){
            alert("date cannot be in the future");
            return;
        }
        try {
            if(editExpenseId){
                await updateExpense(editExpenseId, expenseForm);
                setExpenseMessage({ type: "success", text: "expense updated"});
            }
            else{
                await addExpense(expenseForm);
                setExpenseMessage({ type: "success", text: "expense added"});
            }
            setExpenseForm({ amount: "", category: "", customCategory: "", description: "", date: "",});
            setEditExpenseId(null);
            fetchSummary();
            fetchExpense();
        } catch (error) {
            console.error("error in saving expense:", error);
            setExpenseMessage({ type: "error", text: error.response?.data?.message || "error in saving expense"});
        }

        setTimeout(()=> setExpenseMessage(null), 3000);
    };

    const handleEditExpense = (exp)=>{
        setExpenseForm({
            amount: exp.amount,
            category: exp.category === exp.customCategory ? "Other" : exp.category,
            customCategory: exp.customCategory || "",
            description: exp.description,
            date: exp.date.split("T")[0],
        })
        setEditExpenseId(exp._id)
    };

    const handleDeleteExpense = async (id)=>{
        if(!window.confirm("delete the expense?")) return;
        try {
            await deleteExpense(id);
            setExpense(expense.filter((e)=> e._id !== id));
            fetchSummary();
        } catch (error) {
             console.error("error in deleting expense", error);
        }
    }

    const handleIncomeSubmit = async(e)=>{
        e.preventDefault();
        if(incomeForm.amount <= 0){
            alert("amount cannot be less than 0");
            return;
        }

        if(!incomeForm.source.trim()){
            alert("source of income cannot be empty");
            return;
        }

        if(new Date(incomeForm.date) > new Date()){
            alert("date cannot be in the future");
            return;
        }
        try {
            if(editIncomeId){
                await updateIncome( editIncomeId, incomeForm);
                setIncomeMessage({ type: "success", text: "income updated"})
            }
            else{
                await addIncome(incomeForm);
                setIncomeMessage({ type: "success", text: "income added"})
            }
            setIncomeForm({amount: "", source: "", description: "", date: ""});
            setEditIncomeId(null);
            fetchIncome();
            fetchSummary();
        } catch (error) {
            console.error("error in saving income", error);
            setIncomeMessage({ type: "error", text: error.response?.data?.message || "error in saving income"});
        }
        setTimeout(()=> setIncomeMessage(null), 3000);
    }

    const handleEditIncome = (inc)=>{
        setIncomeForm({
            amount: inc.amount,
            source: inc.source,
            description: inc.description,
            date: inc.date.split("T")[0]
        })
        setEditIncomeId(inc._id);
    }

    const handleDeleteIncome = async(id)=>{
        if(!window.confirm("Delete this income?")) return;
        try {
            await deleteIncome(id);
            setIncome(income.filter((i)=> i._id !== id));
            fetchSummary();
        } catch (error) {
            console.error("error in deleting income", error);
        }
    }

    const applyFilters = async (filters)=>{
        try {
            const {type, category, startDate, endDate} = filters;
            const query = new URLSearchParams({
                category,
                startDate,
                endDate
            }).toString();

            if(type === "expense"){
                const { data } = await API.get(`/expenses?${query}`);
                setExpense(data);
                // if(data.length === 0) alert("no expenses found for this filter");
            }
            else{
                const { data } = await API.get(`/income?${query}`);
                setIncome(data);
                // if(data.length === 0) alert("no income found for this filter");
            }
        } catch (error) {
            console.error("error applying filters", error);
        }
    }

    const getInsightsTypes = (msg)=>{
        if(
            msg.includes("exceeded") ||
            msg.includes("double") ||
            msg.includes("unusually") ||
            msg.includes("only")
        ){
            return "warning";
        }
        return "positive";
    }

  if (!summary) return <p className="text-center mt-10">Loading...</p>;

    return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <div className="flex gap-4">
          <Link
            to="/profile"
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Profile
          </Link>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Income</h3>
          <p className="text-2xl font-bold text-green-600">
            ₹{summary.totalIncome}
          </p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Expense</h3>
          <p className="text-2xl font-bold text-red-600">
            ₹{summary.totalExpense}
          </p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Balance</h3>
          <p className="text-2xl font-bold text-blue-600">₹{summary.balance}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Monthly Analytics</h2>
          {monthly ? (
            <MonthlyChart data={monthly.monthlyData} />
          ) : (
            <p>Loading chart...</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Category Breakdown</h2>
          {categoryData.length > 0 ? (
            <CategoryPie data={categoryData} />
          ) : (
            <p>No expenses yet.</p>
          )}
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h4 className="text-lg font-bold mb-4">Insights</h4>
        {insights.length > 0 ? (
          <ul className="space-y-2">
            {insights.map((msg, idx) => {
              const type = getInsightsTypes(msg);
              return (
                <li
                  key={idx}
                  className={`flex items-center gap-2 ${
                    type === "warning" ? "text-red-500" : "text-green-600"
                  }`}
                >
                  <span>{type === "warning" ? "⚠️" : "✅"}</span>
                  <span>{msg}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No insights yet. Add more data to see trends.</p>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h4 className="text-lg font-bold mb-4">Filters</h4>
        <Filters onFilter={applyFilters} />
      </div>

      {/* Manage Expenses */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Manage Expenses</h2>
        <ExpenseForm
          form={expenseForm}
          setForm={setExpenseForm}
          onSubmit={handleExpenseSubmit}
          editId={editExpenseId}
        />
        {expenseMessage && (
          <p
            className={`mt-2 ${
              expenseMessage.type === "error" ? "text-red-500" : "text-green-600"
            }`}
          >
            {expenseMessage.text}
          </p>
        )}
        <div className="max-h-80 overflow-y-auto mt-4">
        <ExpenseList
          expenses={expense}
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
        />
        </div>
      </div>

      {/* Manage Income */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Income Section</h2>
        <IncomeForm
          form={incomeForm}
          setForm={setIncomeForm}
          onSubmit={handleIncomeSubmit}
          editId={editIncomeId}
        />
        {incomeMessage && (
          <p
            className={`mt-2 ${
              incomeMessage.type === "error" ? "text-red-500" : "text-green-600"
            }`}
          >
            {incomeMessage.text}
          </p>
        )}
        <div className="max-h-80 overflow-y-auto mt-4"></div>
        <IncomeList
          income={income}
          onEdit={handleEditIncome}
          onDelete={handleDeleteIncome}
        />
      </div>
    </div>
  );
}

export default Dashboard;
