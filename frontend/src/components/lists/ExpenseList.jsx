// function ExpenseList ({expenses, onEdit, onDelete}){
//     return (
//         <ul>{expenses.length > 0 ? (
//             expenses.map((exp)=>(
//                 <li key={exp._id}>
//                     {exp.amount} || 
//                     {exp.category === "Other" ? exp.customCategory: exp.category} || 
//                     {exp.description} | {" "}
//                     {new Date(exp.date).toLocaleDateString()}{" "}
//                     <button onClick={()=> onEdit(exp)}>Edit</button>
//                     <button onClick={()=> onDelete(exp._id)}>Delete</button>
//                 </li>
//             ))

//         ) : (
//             <p>No expenses found.</p>
//         )}
            
//         </ul>
//     )
// }

// export default ExpenseList;
function ExpenseList({ expenses, onEdit, onDelete }) {
  if (!expenses.length) {
    return <p className="text-gray-500">No expenses found.</p>;
  }

  return (
    <div className="overflow-x-auto shadow rounded-lg mt-4">
      <table className="w-full border border-gray-200 text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp._id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2 font-medium">₹{exp.amount}</td>
              <td className="px-4 py-2">
                {exp.category === "Other" ? exp.customCategory : exp.category}
              </td>
              <td className="px-4 py-2">{exp.description}</td>
              <td className="px-4 py-2">
                {new Date(exp.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 flex gap-2 justify-center">
                <button
                  onClick={() => onEdit(exp)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(exp._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
