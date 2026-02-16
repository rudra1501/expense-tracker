// function IncomeForm ({ form, setForm, onSubmit, editId}){
//     return (
//      <form onSubmit={onSubmit}>
//             <input 
//             type="number" 
//             placeholder="Amount"
//             value={form.amount}
//             onChange={(e)=> 
//                 setForm({...form, amount: e.target.value})
//             }
//             required
//             />
//             <input 
//             type="text"
//             placeholder="Source"
//             value={form.source}
//             onChange={(e)=>
//                 setForm({...form, source: e.target.value})
//             }
//             required
//             />
//             <input 
//             type="text"
//             placeholder="Description"
//             value={form.description}
//             onChange={(e)=> 
//                 setForm({...form, description: e.target.value})
//             }
//             />
//             <input
//             type="date"
//             value={form.date}
//             onChange={(e)=>
//                 setForm({...form, date: e.target.value})
//             }
//             required
//             />
//             <button type="submit">{editId ? "Update" : "Add"}</button>
//         </form>
//     )
// }

// export default IncomeForm;
function IncomeForm({ form, setForm, onSubmit, editId }) {
  return (
    <form
      onSubmit={onSubmit}
      style={{
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "#f9f9f9",
        marginBottom: "20px",
        display: "grid",
        gap: "10px",
        maxWidth: "400px"
      }}
    >
      <h3>{editId ? "Update Income" : "Add Income"}</h3>

      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        required
        style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
      />

      <input
        type="text"
        placeholder="Source"
        value={form.source}
        onChange={(e) => setForm({ ...form, source: e.target.value })}
        required
        style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
      />

      <input
        type="text"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
      />

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
        style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
      />

      <button
        type="submit"
        style={{
          padding: "10px",
          background: editId ? "#28a745" : "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        {editId ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default IncomeForm;
