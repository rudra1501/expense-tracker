// function IncomeList ({ income, onEdit, onDelete}){
//     return (
//         <ul>
//             {income.length > 0 ? (
//                 income.map((inc)=>(
//                 <li key={inc._id}>
//                     {inc.amount} || {inc.source} || {inc.description} | {" "}
//                     {new Date(inc.date).toLocaleDateString()}{" "}
//                     <button onClick={()=> onEdit(inc)}>Edit</button>
//                     <button onClick={()=> onDelete(inc._id)}>Delete</button>
//                 </li>
//             ))
//             ) : (
//                 <p>no income found</p>
//             )}
//         </ul>
//     )
// }

// export default IncomeList;
function IncomeList({ income, onEdit, onDelete }) {
  if (!income.length) {
    return <p className="text-gray-500">No income found.</p>;
  }

  return (
    <div className="overflow-x-auto shadow rounded-lg mt-4">
      <table className="w-full border border-gray-200 text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Source</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {income.map((inc) => (
            <tr key={inc._id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2 font-medium">₹{inc.amount}</td>
              <td className="px-4 py-2">{inc.source}</td>
              <td className="px-4 py-2">{inc.description}</td>
              <td className="px-4 py-2">
                {new Date(inc.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 flex gap-2 justify-center">
                <button
                  onClick={() => onEdit(inc)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(inc._id)}
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

export default IncomeList;